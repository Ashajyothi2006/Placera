import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  PlayCircle, CheckCircle, CheckCircle2, XCircle, Clock, Award, 
  ArrowRight, ArrowLeft, RefreshCw, BookOpen, Code, Brain, 
  ChevronRight, BarChart2, Filter, Search, AlertCircle, Bookmark, 
  Check, ShieldCheck, Terminal, Play, Eye, Sparkles, TrendingUp, 
  AlertTriangle, Layers, Building2, HelpCircle, CheckSquare, X,
  RotateCcw, Target, Copy, Trash2, ChevronDown, ChevronUp, FileCode,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api/assessments';

const MockExams = () => {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('companies'); // 'companies' | 'aptitude' | 'history'
  const [viewMode, setViewMode] = useState('browse'); // 'browse' | 'taking_mcq' | 'taking_coding' | 'results'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Metadata from backend SQLite
  const [metadata, setMetadata] = useState({
    companies: [],
    roles: [],
    categories: [],
    subjects: [],
    topics: []
  });

  // Filter States
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all'); // 'all' | 'computer' | 'electronics' | 'electrical' | 'civil' | 'mechanical'
  const [selectedAptitudeSubject, setSelectedAptitudeSubject] = useState('all');
  const [companySearch, setCompanySearch] = useState('');
  const [aptitudeSearch, setAptitudeSearch] = useState('');

  // Active Assessment State
  const minimumQuestionsPerExam = 20;
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: optionIndex }
  const [markedForReview, setMarkedForReview] = useState({}); // { [questionId]: boolean }
  const [timeRemaining, setTimeRemaining] = useState(0); // overall remaining in seconds
  const [overallTimeRemaining, setOverallTimeRemaining] = useState(0); // in seconds
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(60); // 60s per question
  const [testStartTime, setTestStartTime] = useState(null);
  const [attemptDeadline, setAttemptDeadline] = useState(null);
  const [questionDeadlines, setQuestionDeadlines] = useState({}); // { [questionId]: deadlineTimestamp }
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittingTest, setSubmittingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Coding Assessment State
  const [codingLanguage, setCodingLanguage] = useState('python'); // 'python' | 'java' | 'c' | 'cpp'
  const [userCodes, setUserCodes] = useState({}); // { [questionId]: { [lang]: code } }
  const [customInput, setCustomInput] = useState('');
  const [customInputTabActive, setCustomInputTabActive] = useState(false);
  const [isEvaluatingCode, setIsEvaluatingCode] = useState(false);
  const [codeEvalResult, setCodeEvalResult] = useState(null);
  const [evalResultsMap, setEvalResultsMap] = useState({}); // { [questionId]: result }
  const [activeEvalTab, setActiveEvalTab] = useState(0);
  const [editorCopiedToast, setEditorCopiedToast] = useState(false);
  const [expandedResultProblem, setExpandedResultProblem] = useState(null);

  // History State
  const [historyData, setHistoryData] = useState({
    total_attempts: 0,
    avg_percentage: 0,
    best_percentage: 0,
    attempts: [],
    topic_performance: []
  });
  const [historyLoading, setHistoryLoading] = useState(false);

  // Results Review Filter
  const [solutionFilter, setSolutionFilter] = useState('all'); // 'all' | 'incorrect' | 'correct'

  // Company Test Selection Modal State
  const [selectedCompanyModal, setSelectedCompanyModal] = useState(null);
  const [companyTests, setCompanyTests] = useState([]);
  const [loadingCompanyTests, setLoadingCompanyTests] = useState(false);
  const [companyModalCategory, setCompanyModalCategory] = useState('all');
  const [companyModalDifficulty, setCompanyModalDifficulty] = useState('all'); // 'all' | 'Easy' | 'Medium' | 'Hard'

  // Authoritative Refs for timers, session, and idempotency
  const timerRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const userAnswersRef = useRef(userAnswers);
  const userCodesRef = useRef(userCodes);
  const questionDeadlinesRef = useRef(questionDeadlines);
  const activeTestRef = useRef(activeTest);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const attemptDeadlineRef = useRef(attemptDeadline);
  const activeQuestionExpiredAutoAdvancedRef = useRef({});

  useEffect(() => {
    userAnswersRef.current = userAnswers;
  }, [userAnswers]);

  useEffect(() => {
    userCodesRef.current = userCodes;
  }, [userCodes]);

  useEffect(() => {
    questionDeadlinesRef.current = questionDeadlines;
  }, [questionDeadlines]);

  useEffect(() => {
    activeTestRef.current = activeTest;
  }, [activeTest]);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    attemptDeadlineRef.current = attemptDeadline;
  }, [attemptDeadline]);

  // Session persistence helpers
  const persistSession = (updates = {}) => {
    const currentActiveTest = updates.test || activeTestRef.current;
    if (!currentActiveTest) return;
    try {
      const session = {
        testId: currentActiveTest.id,
        test: currentActiveTest,
        attemptStartedAt: updates.testStartTime || testStartTime,
        attemptDeadline: updates.attemptDeadline || attemptDeadlineRef.current,
        questionDeadlines: { ...(questionDeadlinesRef.current || {}), ...(updates.questionDeadlines || {}) },
        currentQuestionIndex: updates.currentQuestionIndex !== undefined ? updates.currentQuestionIndex : currentQuestionIndexRef.current,
        userAnswers: updates.userAnswers || userAnswersRef.current,
        userCodes: updates.userCodes || userCodesRef.current,
        markedForReview: updates.markedForReview || markedForReview,
        viewMode: updates.viewMode || viewMode,
        codingLanguage: updates.codingLanguage || codingLanguage,
        ...updates
      };
      localStorage.setItem('active_assessment_session', JSON.stringify(session));
    } catch (e) {
      console.error('Failed to persist assessment session to localStorage:', e);
    }
  };

  const clearSessionStorage = () => {
    try {
      localStorage.removeItem('active_assessment_session');
    } catch (e) {}
  };

  // Check if question deadline has fully elapsed
  const isQuestionExpired = (qId) => {
    if (!qId) return false;
    const deadline = questionDeadlinesRef.current[qId] || questionDeadlines[qId];
    if (!deadline) return false;
    return Date.now() >= deadline;
  };

  // Restore existing session on mount
  const restoreSession = async () => {
    try {
      const saved = localStorage.getItem('active_assessment_session');
      if (!saved) return;
      const session = JSON.parse(saved);
      if (!session || !session.test || !session.attemptDeadline) {
        clearSessionStorage();
        return;
      }

      const now = Date.now();
      // If exam deadline has expired while user was away, auto-submit
      if (now >= session.attemptDeadline) {
        console.warn('Saved assessment attempt has expired. Auto-submitting...');
        clearSessionStorage();
        submitExpiredSession(session);
        return;
      }

      // Reconstruct state from saved session
      setActiveTest(session.test);
      setTestStartTime(session.attemptStartedAt);
      setAttemptDeadline(session.attemptDeadline);
      setQuestionDeadlines(session.questionDeadlines || {});
      setCurrentQuestionIndex(session.currentQuestionIndex || 0);
      setUserAnswers(session.userAnswers || {});
      setUserCodes(session.userCodes || {});
      setMarkedForReview(session.markedForReview || {});
      if (session.codingLanguage) setCodingLanguage(session.codingLanguage);

      const overallLeft = Math.max(0, Math.ceil((session.attemptDeadline - now) / 1000));
      setOverallTimeRemaining(overallLeft);
      setTimeRemaining(overallLeft);

      const curQ = session.test.questions[session.currentQuestionIndex || 0];
      if (curQ) {
        const qDeadline = (session.questionDeadlines && session.questionDeadlines[curQ.id]) || (now + 60000);
        const qLeft = Math.max(0, Math.ceil((qDeadline - now) / 1000));
        setQuestionTimeRemaining(qLeft);
      }

      setViewMode(session.viewMode || (session.test.test_type === 'coding' ? 'taking_coding' : 'taking_mcq'));
    } catch (e) {
      console.error('Error restoring session from localStorage:', e);
      clearSessionStorage();
    }
  };

  const submitExpiredSession = async (session) => {
    try {
      const duration = Math.min(
        Math.round((session.attemptDeadline - session.attemptStartedAt) / 1000),
        (session.test?.questions?.length || 20) * 60
      );
      const payload = {
        answers: session.userAnswers || {},
        timeTakenSeconds: duration,
        userCodes: session.userCodes || null,
        submittedCode: session.codingCode || null
      };
      const res = await axios.post(`${API_BASE}/tests/${session.testId}/submit`, payload);
      setTestResult(res.data);
      setViewMode('results');
      fetchHistory();
    } catch (e) {
      console.error('Error auto-submitting expired session:', e);
    }
  };

  // Fetch initial metadata, history, and restore active session if present
  useEffect(() => {
    fetchMetadata();
    fetchHistory();
    restoreSession();
  }, []);

  // Dual-Timer Management: authoritative timestamps
  useEffect(() => {
    if (viewMode !== 'taking_mcq' && viewMode !== 'taking_coding') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (!attemptDeadline || !activeTest) return;

    timerRef.current = setInterval(() => {
      const now = Date.now();

      // 1. Authoritative Overall Exam Timer
      const overallLeft = Math.max(0, Math.ceil((attemptDeadline - now) / 1000));
      setOverallTimeRemaining(overallLeft);
      setTimeRemaining(overallLeft);

      if (overallLeft <= 0) {
        clearInterval(timerRef.current);
        console.warn('Overall exam timer reached 00:00 - auto-submitting assessment');
        handleSubmitTest();
        return;
      }

      // 2. Per-Question Timer (for MCQ tests)
      if (viewMode === 'taking_mcq' && activeTest.questions) {
        const cIdx = currentQuestionIndexRef.current;
        const currentQ = activeTest.questions[cIdx];
        if (!currentQ) return;

        let qDeadline = questionDeadlinesRef.current[currentQ.id];
        if (!qDeadline) {
          qDeadline = Math.min(now + 60000, attemptDeadline);
          setQuestionDeadlines(prev => {
            const next = { ...prev, [currentQ.id]: qDeadline };
            persistSession({ questionDeadlines: next });
            return next;
          });
        }

        const qLeft = Math.max(0, Math.ceil((qDeadline - now) / 1000));
        setQuestionTimeRemaining(qLeft);

        if (qLeft <= 0) {
          // Check if this active question already auto-advanced
          if (!activeQuestionExpiredAutoAdvancedRef.current[currentQ.id]) {
            activeQuestionExpiredAutoAdvancedRef.current[currentQ.id] = true;
            if (cIdx + 1 < activeTest.questions.length) {
              console.log(`Question ${cIdx + 1} timer reached 00:00. Auto-advancing to Question ${cIdx + 2}`);
              navigateToQuestion(cIdx + 1);
            } else {
              console.log('Final question timer reached 00:00. Auto-submitting assessment');
              clearInterval(timerRef.current);
              handleSubmitTest();
            }
          }
        }
      }
    }, 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewMode, attemptDeadline, activeTest]);

  // Fetch metadata from backend
  const fetchMetadata = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/meta`);
      setMetadata(res.data);
    } catch (err) {
      console.error('Error fetching assessment metadata:', err);
      setError('Could not load assessment categories. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch history from backend SQLite
  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/history`);
      setHistoryData(res.data);
    } catch (err) {
      console.error('Error fetching assessment history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Start a test by ID with strict questions validation (20 for MCQ, 5 for Coding)
  const startTestById = async (testId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/tests/${testId}`);
      const test = res.data;

      const minRequired = test.test_type === 'coding' ? 5 : 20;
      if (!test || !test.questions || test.questions.length < minRequired) {
        const qCount = test && test.questions ? test.questions.length : 0;
        const msg = `This test is not ready yet. It requires at least ${minRequired} valid questions.`;
        console.error(`Exam validation failed for test ID ${testId}: Test requires at least ${minRequired} valid questions. Found: ${qCount}`);
        setError(msg);
        setSelectedCompanyModal(null);
        return;
      }

      const now = Date.now();
      const durationSeconds = test.questions.length * 60; // 1 minute per question formula
      const deadline = now + (durationSeconds * 1000);
      const firstQId = test.questions[0].id;
      const initialDeadlines = {
        [firstQId]: Math.min(now + 60000, deadline)
      };

      activeQuestionExpiredAutoAdvancedRef.current = {};
      isSubmittingRef.current = false;

      // Initialize userCodes per question and language
      const initialCodes = {};
      for (const q of test.questions) {
        initialCodes[q.id] = {
          python: q.starter_code?.python || '# Python 3 solution\nimport sys\n\ndef solution():\n    pass\n\nif __name__ == "__main__":\n    solution()\n',
          java: q.starter_code?.java || 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}\n',
          c: q.starter_code?.c || '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n',
          cpp: q.starter_code?.cpp || '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n'
        };
      }

      setActiveTest(test);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setUserCodes(initialCodes);
      setCodingLanguage('python');
      setCodeEvalResult(null);
      setEvalResultsMap({});
      setActiveEvalTab(0);
      setCustomInputTabActive(false);
      setMarkedForReview({});
      setOverallTimeRemaining(durationSeconds);
      setTimeRemaining(durationSeconds);
      setQuestionTimeRemaining(60);
      setTestStartTime(now);
      setAttemptDeadline(deadline);
      setQuestionDeadlines(initialDeadlines);
      setSelectedCompanyModal(null);

      const initialSession = {
        testId: test.id,
        test: test,
        attemptStartedAt: now,
        attemptDeadline: deadline,
        questionDeadlines: initialDeadlines,
        currentQuestionIndex: 0,
        userAnswers: {},
        userCodes: initialCodes,
        markedForReview: {},
        viewMode: test.test_type === 'coding' ? 'taking_coding' : 'taking_mcq',
        codingLanguage: 'python'
      };
      localStorage.setItem('active_assessment_session', JSON.stringify(initialSession));

      if (test.test_type === 'coding') {
        setViewMode('taking_coding');
      } else {
        setViewMode('taking_mcq');
      }
    } catch (err) {
      console.error('Error loading test:', err);
      const msg = err.response?.data?.error || 'Failed to start the assessment. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Question Navigation keeping original question deadlines fixed
  const navigateToQuestion = (targetIndex) => {
    const test = activeTestRef.current;
    if (!test || !test.questions) return;
    if (targetIndex < 0 || targetIndex >= test.questions.length) return;

    const targetQ = test.questions[targetIndex];
    const now = Date.now();
    const curAttemptDeadline = attemptDeadlineRef.current || (now + 60000);

    let nextDeadlines = { ...questionDeadlinesRef.current };
    // If target question has never been visited before, initialize its 60s deadline:
    if (!nextDeadlines[targetQ.id]) {
      nextDeadlines[targetQ.id] = Math.min(now + 60000, curAttemptDeadline);
      setQuestionDeadlines(nextDeadlines);
    }

    const qRemaining = Math.max(0, Math.ceil((nextDeadlines[targetQ.id] - now) / 1000));
    setQuestionTimeRemaining(qRemaining);
    setCurrentQuestionIndex(targetIndex);

    // If coding mode, restore the eval result for this question if it exists
    if (test.test_type === 'coding') {
      setCodeEvalResult(evalResultsMap[targetQ.id] || null);
      setActiveEvalTab(0);
    }

    persistSession({
      currentQuestionIndex: targetIndex,
      questionDeadlines: nextDeadlines
    });
  };

  // Open Company Tests modal
  const handleOpenCompanyModal = async (company, categorySlug = null) => {
    setSelectedCompanyModal({ company, categorySlug });
    setCompanyModalCategory(categorySlug || 'all');
    setCompanyModalDifficulty('all');
    setLoadingCompanyTests(true);
    try {
      const params = { company: company.slug };
      if (categorySlug && categorySlug !== 'all') params.category = categorySlug;
      const res = await axios.get(`${API_BASE}/tests`, { params });
      setCompanyTests(res.data);
    } catch (err) {
      console.error('Error fetching company tests:', err);
      setCompanyTests([]);
    } finally {
      setLoadingCompanyTests(false);
    }
  };

  // Handle MCQ Answer selection (prevents changing if question timer expired)
  const handleSelectOption = (questionId, optionIndex) => {
    if (isQuestionExpired(questionId)) return;
    setUserAnswers(prev => {
      const next = {
        ...prev,
        [questionId]: optionIndex
      };
      persistSession({ userAnswers: next });
      return next;
    });
  };

  // Clear answer (prevents clearing if question timer expired)
  const handleClearAnswer = (questionId) => {
    if (isQuestionExpired(questionId)) return;
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      persistSession({ userAnswers: next });
      return next;
    });
  };

  // Toggle mark for review
  const handleToggleReview = (questionId) => {
    setMarkedForReview(prev => {
      const next = {
        ...prev,
        [questionId]: !prev[questionId]
      };
      persistSession({ markedForReview: next });
      return next;
    });
  };

  // Code editor interactions
  const handleCodeChange = (newCode) => {
    const curQ = activeTest?.questions?.[currentQuestionIndex];
    if (!curQ) return;
    setUserCodes(prev => {
      const next = {
        ...prev,
        [curQ.id]: {
          ...(prev[curQ.id] || {}),
          [codingLanguage]: newCode
        }
      };
      persistSession({ userCodes: next });
      return next;
    });
  };

  const handleResetCode = () => {
    const curQ = activeTest?.questions?.[currentQuestionIndex];
    if (!curQ) return;
    const starter = curQ.starter_code?.[codingLanguage] || '';
    setUserCodes(prev => {
      const next = {
        ...prev,
        [curQ.id]: {
          ...(prev[curQ.id] || {}),
          [codingLanguage]: starter
        }
      };
      persistSession({ userCodes: next });
      return next;
    });
  };

  const handleClearCode = () => {
    const curQ = activeTest?.questions?.[currentQuestionIndex];
    if (!curQ) return;
    setUserCodes(prev => {
      const next = {
        ...prev,
        [curQ.id]: {
          ...(prev[curQ.id] || {}),
          [codingLanguage]: ''
        }
      };
      persistSession({ userCodes: next });
      return next;
    });
  };

  const handleCopyCode = () => {
    const curQ = activeTest?.questions?.[currentQuestionIndex];
    if (!curQ) return;
    const curCode = userCodes[curQ.id]?.[codingLanguage] || curQ.starter_code?.[codingLanguage] || '';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(curCode);
      setEditorCopiedToast(true);
      setTimeout(() => setEditorCopiedToast(false), 2000);
    }
  };

  // Run code against sample test cases
  const handleRunCode = async () => {
    if (!activeTest || !activeTest.questions[currentQuestionIndex]) return;
    const currentQ = activeTest.questions[currentQuestionIndex];
    const codeToRun = userCodes[currentQ.id]?.[codingLanguage] || currentQ.starter_code?.[codingLanguage] || '';
    
    setIsEvaluatingCode(true);
    setCodeEvalResult(null);
    try {
      const res = await axios.post(`${API_BASE}/coding/evaluate`, {
        questionId: currentQ.id,
        code: codeToRun,
        language: codingLanguage,
        customInput: (customInputTabActive && customInput.trim()) ? customInput : null
      });
      setCodeEvalResult(res.data);
      setEvalResultsMap(prev => ({
        ...prev,
        [currentQ.id]: res.data
      }));
      setActiveEvalTab(0);
    } catch (err) {
      console.error('Code evaluation error:', err);
      const errRes = {
        allPassed: false,
        status: 'Compilation / Execution Error',
        results: [{
          testCaseIndex: 1,
          passed: false,
          error: err.response?.data?.error || err.message
        }]
      };
      setCodeEvalResult(errRes);
      setEvalResultsMap(prev => ({
        ...prev,
        [currentQ.id]: errRes
      }));
    } finally {
      setIsEvaluatingCode(false);
    }
  };

  // Submit test (MCQ or Coding) with idempotency protection
  const handleSubmitTest = async (overrideAnswers = null) => {
    if (isSubmittingRef.current) return;
    const test = activeTestRef.current || activeTest;
    if (!test) return;

    isSubmittingRef.current = true;
    setSubmittingTest(true);
    setShowSubmitModal(false);
    if (timerRef.current) clearInterval(timerRef.current);

    clearSessionStorage();

    // Guard against React synthetic event objects passed via onClick
    const isEventObject = overrideAnswers && (overrideAnswers.nativeEvent || overrideAnswers.target || overrideAnswers.preventDefault);
    const answersToSubmit = (!isEventObject && overrideAnswers && typeof overrideAnswers === 'object')
      ? overrideAnswers
      : (userAnswersRef.current || userAnswers || {});
    const maxAllowedSeconds = (test.questions ? test.questions.length : 20) * 60;
    const timeSpentSeconds = Math.max(
      1,
      Math.min(
        Math.round((Date.now() - (testStartTime || Date.now())) / 1000),
        maxAllowedSeconds
      )
    );

    try {
      // Build code submission per problem
      const currentCodes = userCodesRef.current || userCodes;
      const codesPayload = {};
      if (test.test_type === 'coding' && test.questions) {
        for (const q of test.questions) {
          const qCodes = currentCodes[q.id] || {};
          let chosenLang = codingLanguage;
          if (qCodes[codingLanguage] && qCodes[codingLanguage].trim()) {
            chosenLang = codingLanguage;
          } else {
            for (const langKey of ['python', 'java', 'cpp', 'c']) {
              if (qCodes[langKey] && qCodes[langKey].trim()) {
                chosenLang = langKey;
                break;
              }
            }
          }
          const qCode = qCodes[chosenLang] || q.starter_code?.[chosenLang] || '';
          codesPayload[q.id] = {
            code: qCode,
            language: chosenLang
          };
        }
      }

      const payload = {
        answers: answersToSubmit,
        timeTakenSeconds: timeSpentSeconds,
        userCodes: test.test_type === 'coding' ? codesPayload : null,
        submittedCode: test.test_type === 'coding' ? (codesPayload[test.questions[0]?.id]?.code || '') : null,
        testTitle: test.title,
        companySlug: test.company_slug,
        categorySlug: test.category_slug
      };

      const currentUserId = localStorage.getItem('user_id') || localStorage.getItem('user_email') || 'ashalathaavuru7@gmail.com';
      const submitHeaders = { 'x-user-id': currentUserId };

      try {
        const res = await axios.post(`${API_BASE}/tests/${test.id}/submit`, { ...payload, userId: currentUserId }, { headers: submitHeaders });
        setTestResult(res.data);
        setViewMode('results');
        fetchHistory(); // Refresh history with new attempt
        return;
      } catch (postErr) {
        // If 404, auto-recover by resolving current test ID
        if (postErr.response?.status === 404 && test.company_slug) {
          const freshRes = await axios.get(`${API_BASE}/tests?company=${test.company_slug}`);
          const matching = freshRes.data?.find(t => t.category_slug === test.category_slug || t.title === test.title);
          if (matching && matching.id !== test.id) {
            console.log(`Auto-recovered submission using test ID ${matching.id}`);
            const retryRes = await axios.post(`${API_BASE}/tests/${matching.id}/submit`, { ...payload, userId: currentUserId }, { headers: submitHeaders });
            setTestResult(retryRes.data);
            setViewMode('results');
            fetchHistory();
            return;
          }
        }
        throw postErr;
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
      alert('Error submitting test: ' + (err.response?.data?.error || err.message || 'Please try again.'));
      isSubmittingRef.current = false;
    } finally {
      setSubmittingTest(false);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Filtered topics for Aptitude
  const filteredTopics = metadata.topics.filter(t => {
    const matchesSubject = selectedAptitudeSubject === 'all' || t.subject_slug === selectedAptitudeSubject;
    const matchesSearch = t.name.toLowerCase().includes(aptitudeSearch.toLowerCase()) || 
                          (t.description && t.description.toLowerCase().includes(aptitudeSearch.toLowerCase()));
    return matchesSubject && matchesSearch && t.category_slug === 'aptitude';
  });

  // Filtered companies
  const filteredCompanies = metadata.companies.filter(c => {
    const domain = c.domain || 'computer';
    const matchesDomain = selectedDomain === 'all' || domain === selectedDomain;
    const matchesSearch = c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
                          c.tier.toLowerCase().includes(companySearch.toLowerCase()) ||
                          (c.pattern_notes && c.pattern_notes.toLowerCase().includes(companySearch.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-slate-50 text-slate-800">
      
      {/* Assessment Error Banner */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6 w-full">
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-rose-600 shrink-0" size={20} />
              <div>
                <div className="font-bold text-sm">Assessment Unavailable</div>
                <div className="text-xs text-rose-700">{error}</div>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 1. TOP SUB-HEADER & MAIN TABS (Only shown in browse mode) */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'browse' && (
        <div className="bg-white border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-1">
                  <Sparkles size={16} />
                  <span>Comprehensive Placement Preparation Engine</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Placement Skill Assessments
                </h1>
                <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                  Practice company-pattern exams, 20+ question topic-wise aptitude tests with step-by-step solutions, hands-on coding challenges, and personalized diagnostic recommendations.
                </p>
              </div>

              {/* Quick Overall Stats Badge */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Tests Completed</div>
                  <div className="text-lg font-bold text-slate-900">{historyData.total_attempts} Assessments</div>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Avg. Accuracy</div>
                  <div className={`text-lg font-bold ${historyData.avg_percentage >= 60 ? 'text-emerald-600' : 'text-blue-600'}`}>
                    {historyData.avg_percentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-8">
              <button
                onClick={() => setActiveTab('companies')}
                className={`flex items-center gap-2 pb-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'companies'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 size={18} />
                <span>Company-Specific Assessments</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{metadata.companies?.length || 20} Companies</span>
              </button>

              <button
                onClick={() => setActiveTab('aptitude')}
                className={`flex items-center gap-2 pb-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'aptitude'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Target size={18} />
                <span>Aptitude Preparation</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">20+ Questions / Test</span>
              </button>

              <button
                onClick={() => { setActiveTab('history'); fetchHistory(); }}
                className={`flex items-center gap-2 pb-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BarChart2 size={18} />
                <span>Performance History & Analytics</span>
                {historyData.total_attempts > 0 && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                    {historyData.total_attempts} Saved
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 2. TAB 1: COMPANY-SPECIFIC ASSESSMENTS */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'browse' && activeTab === 'companies' && (
        <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
          {/* Controls: Engineering Discipline / Domain Filter & Search */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Engineering Discipline / Domain
                  </label>
                  <span className="text-xs text-slate-400 font-semibold ml-3">
                    ({filteredCompanies.length} of {metadata.companies.length} Companies)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Domains', icon: '🌐' },
                    { id: 'computer', label: 'Computer & IT', icon: '💻' },
                    { id: 'electronics', label: 'Electronics (ECE)', icon: '🔌' },
                    { id: 'electrical', label: 'Electrical (EEE)', icon: '⚡' },
                    { id: 'civil', label: 'Civil Engineering', icon: '🏗️' },
                    { id: 'mechanical', label: 'Mechanical Engineering', icon: '⚙️' }
                  ].map(dom => {
                    const count = dom.id === 'all'
                      ? metadata.companies.length
                      : metadata.companies.filter(c => (c.domain || 'computer') === dom.id).length;
                    const isSelected = selectedDomain === dom.id;
                    return (
                      <button
                        key={dom.id}
                        onClick={() => setSelectedDomain(dom.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>{dom.icon}</span>
                        <span>{dom.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-w-[260px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  placeholder="Search company (TCS, TI, Siemens, L&T)..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Target Job Role Filter */}
            {metadata.roles && metadata.roles.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Target Job Role
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedRole('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedRole === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All Roles
                  </button>
                  {metadata.roles.map(r => (
                    <button
                      key={r.slug}
                      onClick={() => setSelectedRole(r.slug)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedRole === r.slug
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <div 
                key={company.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                        {company.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{company.name}</h3>
                        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                            {company.tier}
                          </span>
                          {company.domain && company.domain !== 'computer' && (
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                              company.domain === 'electronics'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : company.domain === 'electrical'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : company.domain === 'civil'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {company.domain === 'electronics' ? '🔌 ECE' : company.domain === 'electrical' ? '⚡ EEE' : company.domain === 'civil' ? '🏗️ Civil' : '⚙️ Mech'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {company.description}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-blue-600" />
                      Exam Pattern Focus
                    </div>
                    <p className="text-xs text-slate-700 font-medium line-clamp-2">
                      {company.pattern_notes || 'Quantitative aptitude, pseudocode reasoning, core CS concepts and coding.'}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Assessment Categories
                  </div>
                  {(() => {
                    const isCore = ['electronics', 'electrical', 'civil', 'mechanical'].includes(company.domain);
                    if (isCore) {
                      return (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <button
                            onClick={() => handleOpenCompanyModal(company, 'core_concepts')}
                            className="px-2 py-2 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <BookOpen size={14} className="text-purple-600" />
                            <span>Core Technical</span>
                          </button>
                          <button
                            onClick={() => handleOpenCompanyModal(company, 'aptitude')}
                            className="px-2 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Brain size={14} className="text-blue-600" />
                            <span>Aptitude</span>
                          </button>
                        </div>
                      );
                    }
                    const hasVerbal = ['tcs', 'infosys', 'wipro', 'accenture', 'cognizant', 'capgemini', 'deloitte'].includes(company.slug);
                    return hasVerbal ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4">
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'coding')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Code size={13} className="text-emerald-600" />
                          Coding
                        </button>
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'aptitude')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Brain size={13} className="text-blue-600" />
                          Aptitude
                        </button>
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'verbal')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <MessageSquare size={13} className="text-amber-600" />
                          Verbal
                        </button>
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'core_concepts')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <BookOpen size={13} className="text-purple-600" />
                          Core
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'coding')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Code size={14} className="text-emerald-600" />
                          Coding
                        </button>
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'aptitude')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Brain size={14} className="text-blue-600" />
                          Aptitude
                        </button>
                        <button
                          onClick={() => handleOpenCompanyModal(company, 'core_concepts')}
                          className="px-2 py-1.5 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-transparent rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                        >
                          <BookOpen size={14} className="text-purple-600" />
                          Core
                        </button>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => handleOpenCompanyModal(company)}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>View All {company.name} Tests</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 3. TAB 2: APTITUDE PREPARATION (20+ Questions per test) */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'browse' && activeTab === 'aptitude' && (
        <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
          {/* Aptitude Focus Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl p-6 text-white mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block bg-white/20 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Guaranteed 20+ Questions Per Test
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                Placement Aptitude Topic-Wise Mastery
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Every practice test contains at least 20 real questions with detailed step-by-step mathematical explanations, shortcuts, and formula derivations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10 text-center">
                <div className="text-2xl font-extrabold text-white">20+</div>
                <div className="text-[11px] text-blue-200 uppercase font-semibold">Qs per Test</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10 text-center">
                <div className="text-2xl font-extrabold text-emerald-300">100%</div>
                <div className="text-[11px] text-blue-200 uppercase font-semibold">Step Solutions</div>
              </div>
            </div>
          </div>

          {/* Subject Filter Pills & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedAptitudeSubject('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAptitudeSubject === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedAptitudeSubject('quantitative')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAptitudeSubject === 'quantitative'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Quantitative Aptitude
              </button>
              <button
                onClick={() => setSelectedAptitudeSubject('logical')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAptitudeSubject === 'logical'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Logical Reasoning
              </button>
              <button
                onClick={() => setSelectedAptitudeSubject('verbal')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAptitudeSubject === 'verbal'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Verbal Ability
              </button>
              <button
                onClick={() => setSelectedAptitudeSubject('data-interpretation')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAptitudeSubject === 'data-interpretation'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Data Interpretation
              </button>
            </div>

            <div className="relative min-w-[260px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={aptitudeSearch}
                onChange={(e) => setAptitudeSearch(e.target.value)}
                placeholder="Search topic (Percentages, Work, Profit)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Topic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map(topic => {
              const hasTests = topic.test_count > 0;
              return (
                <div
                  key={topic.slug}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                        {topic.subject_slug ? topic.subject_slug.replace(/-/g, ' ').toUpperCase() : 'APTITUDE'}
                      </span>
                      {hasTests ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
                          <CheckCircle2 size={12} />
                          {topic.test_count} {topic.test_count === 1 ? 'Test' : 'Tests'} (20 Qs)
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{topic.name}</h3>
                    <p className="text-xs text-slate-600 mb-6 line-clamp-2">
                      {topic.description || 'Master fundamental concepts, speed formulas, and practice 20 exam-pattern questions.'}
                    </p>
                  </div>

                  <div>
                    {hasTests ? (
                      <div className="space-y-2">
                        {/* If topic has tests, let's offer Test 1 (and Test 2 if available) */}
                        <button
                          onClick={async () => {
                            const res = await axios.get(`${API_BASE}/tests?topic=${topic.slug}`);
                            if (res.data && res.data.length > 0) {
                              startTestById(res.data[0].id);
                            }
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                        >
                          <PlayCircle size={16} />
                          <span>Start 20-Question Practice Test 1</span>
                        </button>

                        {topic.test_count > 1 && (
                          <button
                            onClick={async () => {
                              const res = await axios.get(`${API_BASE}/tests?topic=${topic.slug}`);
                              if (res.data && res.data.length > 1) {
                                startTestById(res.data[1].id);
                              }
                            }}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                          >
                            <PlayCircle size={16} />
                            <span>Start Advanced Test 2 (20 Qs)</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-slate-100 text-slate-400 py-2.5 rounded-xl font-semibold text-xs cursor-not-allowed"
                      >
                        Practice Module In Preparation
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 4. TAB 3: PERFORMANCE HISTORY & DIAGNOSTIC ANALYTICS */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'browse' && activeTab === 'history' && (
        <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
          {/* Header Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Attempts</span>
                <Award size={18} className="text-blue-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{historyData.total_attempts}</div>
              <div className="text-xs text-slate-500 mt-1">Persisted in SQLite database</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Average Score</span>
                <TrendingUp size={18} className="text-emerald-600" />
              </div>
              <div className={`text-3xl font-extrabold ${historyData.avg_percentage >= 60 ? 'text-emerald-600' : 'text-blue-600'}`}>
                {historyData.avg_percentage}%
              </div>
              <div className="text-xs text-slate-500 mt-1">Across all completed assessments</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Best Score</span>
                <Sparkles size={18} className="text-yellow-500" />
              </div>
              <div className="text-3xl font-extrabold text-yellow-600">{historyData.best_percentage}%</div>
              <div className="text-xs text-slate-500 mt-1">Peak assessment performance</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Topics Attempted</span>
                <Layers size={18} className="text-purple-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {historyData.topic_performance ? historyData.topic_performance.length : 0}
              </div>
              <div className="text-xs text-slate-500 mt-1">Diagnostic topic breakdown</div>
            </div>
          </div>

          {/* Topic Mastery Breakdown */}
          {historyData.topic_performance && historyData.topic_performance.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Topic Mastery & Diagnostic Analytics</h3>
                  <p className="text-xs text-slate-500">Real-time mastery percentage calculated from your attempt answers</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Strong (≥60%)</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Weak (&lt;60%)</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {historyData.topic_performance.map((tp, idx) => {
                  const isStrong = tp.avg_score >= 60;
                  const friendlyTopic = tp.topic_name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                  return (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800 text-sm">{friendlyTopic}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isStrong ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {isStrong ? 'Strong' : 'Needs Practice'}
                          </span>
                          <span className="text-sm font-extrabold text-slate-900">{tp.avg_score}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full transition-all ${isStrong ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(100, Math.max(5, tp.avg_score))}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>{tp.attempts_count} {tp.attempts_count === 1 ? 'Attempt' : 'Attempts'}</span>
                        <span>Best: {tp.best_score}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past Attempts Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Test Attempts</h3>
                <p className="text-xs text-slate-500">Historical performance records saved in the backend</p>
              </div>
              <button 
                onClick={fetchHistory}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>

            {historyData.attempts && historyData.attempts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <th className="py-3 px-6">Assessment Title</th>
                      <th className="py-3 px-4">Company / Topic</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Accuracy</th>
                      <th className="py-3 px-4">Time Taken</th>
                      <th className="py-3 px-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {historyData.attempts.map((att) => {
                      const isPassing = att.percentage >= 60;
                      return (
                        <tr key={att.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-semibold text-slate-900">{att.test_title}</td>
                          <td className="py-4 px-4 text-slate-600 font-medium">{att.company_name || att.topic_name || 'General'}</td>
                          <td className="py-4 px-4">
                            <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {att.category_slug}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-800">
                            {att.score} / {att.total_questions}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                              isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {isPassing ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                              {att.percentage}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-500 text-xs">
                            {formatTime(att.time_taken_seconds)}
                          </td>
                          <td className="py-4 px-6 text-slate-400 text-xs">
                            {att.completed_at ? new Date(att.completed_at).toLocaleDateString() : 'Recent'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Award size={48} className="text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-700">No Assessment Attempts Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                  Complete your first company-specific or aptitude practice test to unlock detailed accuracy metrics and performance history.
                </p>
                <button
                  onClick={() => setActiveTab('aptitude')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                >
                  Start an Aptitude Test
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 5. COMPANY TESTS SELECTION MODAL */}
      {/* ------------------------------------------------------------------- */}
      {selectedCompanyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Company Exam Pattern</span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                    {selectedCompanyModal.company.tier}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedCompanyModal.company.name} Assessments
                </h2>
              </div>
              <button 
                onClick={() => setSelectedCompanyModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-3 mb-3">
              {(() => {
                const isCoreDomain = ['electronics', 'electrical', 'civil', 'mechanical'].includes(selectedCompanyModal.company.domain);
                const companyHasVerbal = ['tcs', 'infosys', 'wipro', 'accenture', 'cognizant', 'capgemini', 'deloitte'].includes(selectedCompanyModal.company.slug);
                const tabs = isCoreDomain ? [
                  { id: 'all', label: 'All Patterns', icon: Layers },
                  { id: 'core_concepts', label: 'Core Technical', icon: BookOpen, badge: '20 Qs' },
                  { id: 'aptitude', label: 'Quantitative & Aptitude', icon: Brain, badge: '20 Qs' }
                ] : [
                  { id: 'all', label: 'All Patterns', icon: Layers },
                  { id: 'coding', label: 'Coding Tests', icon: Code, badge: 'Real Editor' },
                  { id: 'aptitude', label: 'Aptitude', icon: Brain },
                  ...(companyHasVerbal ? [{ id: 'verbal', label: 'Verbal Ability', icon: MessageSquare, badge: '20 Qs' }] : []),
                  { id: 'core_concepts', label: 'Core Concepts', icon: BookOpen }
                ];

                return tabs.map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = (companyModalCategory === cat.id) || (!companyModalCategory && cat.id === 'all');
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCompanyModalCategory(cat.id);
                        setCompanyModalDifficulty('all');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <IconComponent size={13} />
                      <span>{cat.label}</span>
                      {cat.badge && (
                        <span className={`text-[10px] px-1 py-0.2 rounded font-extrabold ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-emerald-100 text-emerald-800'}`}>
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  );
                });
              })()}
            </div>

            {/* Difficulty Level Selector for Coding Tests (Easy, Medium, Hard) */}
            {!['electronics', 'electrical', 'civil', 'mechanical'].includes(selectedCompanyModal.company.domain) && (companyModalCategory === 'coding' || selectedCompanyModal.categorySlug === 'coding') && (
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Terminal size={14} className="text-emerald-600" />
                  <span>Coding Difficulty:</span>
                  <span className="text-[11px] text-slate-400 font-normal">(Hands-on problem solving)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'Easy', label: 'Easy' },
                    { id: 'Medium', label: 'Medium (Required)' },
                    { id: 'Hard', label: 'Hard (Advanced)' }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setCompanyModalDifficulty(diff.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        companyModalDifficulty === diff.id
                          ? (diff.id === 'Hard' ? 'bg-rose-600 text-white shadow-xs' : diff.id === 'Medium' ? 'bg-amber-600 text-white shadow-xs' : diff.id === 'Easy' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-900 text-white shadow-xs')
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-y-auto flex-1 pr-1 space-y-3">
              {loadingCompanyTests ? (
                <div className="py-12 text-center text-slate-500">
                  <RefreshCw className="animate-spin mx-auto mb-2 text-blue-600" size={24} />
                  Loading {selectedCompanyModal.company.name} test patterns...
                </div>
              ) : (() => {
                const filteredTests = companyTests.filter((t) => {
                  const matchCat = companyModalCategory === 'all' || !companyModalCategory || t.category_slug === companyModalCategory;
                  const matchDiff = companyModalDifficulty === 'all' || !companyModalDifficulty || t.difficulty?.toLowerCase() === companyModalDifficulty.toLowerCase();
                  return matchCat && matchDiff;
                });

                if (filteredTests.length === 0) {
                  return (
                    <div className="p-8 text-center bg-slate-50 rounded-xl">
                      <BookOpen size={32} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-700">No test found matching this filter.</p>
                      <p className="text-xs text-slate-500 mt-1">Try switching difficulty or selecting "All Patterns".</p>
                    </div>
                  );
                }

                return filteredTests.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs uppercase font-extrabold px-2 py-0.5 rounded-md ${
                          t.test_type === 'coding' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : (t.category_slug === 'verbal' 
                                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                : 'bg-blue-100 text-blue-800')
                        }`}>
                          {t.test_type === 'coding' ? 'REAL CODING' : (t.category_slug === 'verbal' ? 'VERBAL ABILITY' : t.category_slug?.replace(/_/g, ' '))}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {t.duration_minutes} Mins • {t.question_count || t.total_questions} Questions
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
                          t.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' : t.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {t.difficulty}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{t.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t.test_type === 'coding' 
                          ? 'Live code editor challenge with multi-language testing (Python, Java, C, C++).' 
                          : (t.category_slug === 'verbal'
                              ? 'Grammar rules, sentence correction, reading comprehension, and professional vocabulary (20 Questions).'
                              : 'Multiple choice questions modeled on recent placement tests (20 Questions).')}
                      </p>
                    </div>

                    <button
                      onClick={() => startTestById(t.id)}
                      className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                        t.test_type === 'coding' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <PlayCircle size={16} />
                      <span>{t.test_type === 'coding' ? 'Start Coding Test' : 'Start Assessment'}</span>
                    </button>
                  </div>
                ));
              })()}
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4 flex justify-end">
              <button
                onClick={() => setSelectedCompanyModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 6. MCQ TEST RUNNER VIEW (20 Questions with Palette, Dual Timers) */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'taking_mcq' && activeTest && (
        <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4 md:p-6">
          {/* Top Test Header Bar */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  {activeTest.company_slug ? activeTest.company_slug.toUpperCase() : 'APTITUDE'}
                </span>
                <span className="text-xs font-semibold text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-700">
                  Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeTest.title}</h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Question Countdown Timer (60s) */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                questionTimeRemaining <= 10 
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}>
                <Clock size={16} className={questionTimeRemaining <= 10 ? 'text-rose-600' : 'text-blue-600'} />
                <span>Time Left: {formatTime(questionTimeRemaining)}</span>
              </div>

              {/* Overall Exam Hard Countdown Timer */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                overallTimeRemaining < 180 
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <Clock size={16} className={overallTimeRemaining < 180 ? 'text-rose-600' : 'text-slate-600'} />
                <span>Overall: {formatTime(overallTimeRemaining)}</span>
              </div>

              {/* Submit Test Button */}
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Test Runner Body: Split into Question Area & Question Palette */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 items-start">
            
            {/* Left 3 Columns: Active Question Area */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col justify-between min-h-[480px]">
              {(() => {
                const q = activeTest.questions[currentQuestionIndex];
                if (!q) return null;
                const isSelected = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isCurrentQuestionExpired = isQuestionExpired(q.id) && questionTimeRemaining <= 0;

                return (
                  <div>
                    {/* Question Header & Tags */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
                          {currentQuestionIndex + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Difficulty: <span className="text-blue-600">{q.difficulty || 'Medium'}</span>
                        </span>
                        {isCurrentQuestionExpired && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                            Time Expired
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleToggleReview(q.id)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                          isMarked
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Bookmark size={14} className={isMarked ? 'fill-purple-600 text-purple-600' : ''} />
                        <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                      </button>
                    </div>

                    {/* Question Statement */}
                    <div className="mb-6">
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                        {q.question_text}
                      </h3>

                      {/* Code Snippet if present */}
                      {q.code_snippet && (
                        <div className="mt-4 bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                          <pre>{q.code_snippet}</pre>
                        </div>
                      )}
                    </div>

                    {/* Locked notice if expired */}
                    {isCurrentQuestionExpired && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4">
                        <AlertCircle size={16} className="text-amber-600 shrink-0" />
                        <span>The 60-second time limit for this question has expired. Answer selection is locked.</span>
                      </div>
                    )}

                    {/* Multiple Choice Options */}
                    <div className="space-y-3 mb-8">
                      {q.options.map((opt) => {
                        const active = userAnswers[q.id] === opt.option_index;
                        const letter = String.fromCharCode(65 + opt.option_index);

                        return (
                          <div
                            key={opt.id}
                            onClick={() => !isCurrentQuestionExpired && handleSelectOption(q.id, opt.option_index)}
                            className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3.5 ${
                              isCurrentQuestionExpired ? 'cursor-not-allowed opacity-85' : 'cursor-pointer'
                            } ${
                              active
                                ? 'bg-blue-50/70 border-blue-600 text-blue-900 shadow-xs'
                                : 'bg-slate-50/40 hover:bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                              active
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}>
                              {letter}
                            </span>
                            <span className="leading-snug pt-0.5">{opt.option_text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Bottom Navigation Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>

                  {userAnswers[activeTest.questions[currentQuestionIndex]?.id] !== undefined && (
                    <button
                      disabled={isQuestionExpired(activeTest.questions[currentQuestionIndex]?.id) && questionTimeRemaining <= 0}
                      onClick={() => handleClearAnswer(activeTest.questions[currentQuestionIndex].id)}
                      className="px-3 py-2 text-rose-600 hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-colors"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {currentQuestionIndex + 1 < activeTest.questions.length ? (
                    <button
                      onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Next Question</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <CheckSquare size={16} />
                      <span>Review & Submit Test</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Question Palette (1 to 20) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Question Palette</h4>
              
              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span>Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span>Ans & Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                  <span>Unanswered</span>
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {activeTest.questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isMarked = markedForReview[q.id];

                  let colorClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isAnswered && isMarked) {
                    colorClass = 'bg-amber-500 text-white';
                  } else if (isAnswered) {
                    colorClass = 'bg-emerald-600 text-white';
                  } else if (isMarked) {
                    colorClass = 'bg-purple-600 text-white';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${colorClass} ${
                        isCurrent ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Quick Summary Counts */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Answered:</span>
                  <span className="font-bold text-slate-900">{Object.keys(userAnswers).length} / {activeTest.questions.length}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Marked for Review:</span>
                  <span className="font-bold text-purple-700">
                    {Object.values(markedForReview).filter(Boolean).length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Remaining:</span>
                  <span className="font-bold text-slate-500">
                    {activeTest.questions.length - Object.keys(userAnswers).length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 7. CODING ASSESSMENT RUNNER (Live Code Editor & Evaluation) */}
      {/* ------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------- */}
      {/* 7. REAL PROGRAMMING CODING RUNNER (Full Editor, Multi-Language, Tests) */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'taking_coding' && activeTest && (() => {
        const curQ = activeTest.questions[currentQuestionIndex] || activeTest.questions[0];
        if (!curQ) return null;

        const currentCode = userCodes[curQ.id]?.[codingLanguage] !== undefined
          ? userCodes[curQ.id][codingLanguage]
          : (curQ.starter_code?.[codingLanguage] || '');

        const codeLines = (currentCode || '').split('\n');
        const lineCount = Math.max(codeLines.length, 16);
        const evalResult = evalResultsMap[curQ.id] || codeEvalResult;

        return (
          <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4 md:p-6">
            {/* Header Bar */}
            <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-xs mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                    <Terminal size={12} />
                    <span>Hands-On Coding Assessment</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600">{activeTest.title}</span>
                  <span className="text-xs font-semibold text-slate-400">•</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    Problem {currentQuestionIndex + 1} of {activeTest.questions.length}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{curQ.code_snippet || curQ.title || `Problem ${currentQuestionIndex + 1}`}</span>
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md border ${
                    curQ.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' : curQ.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {curQ.difficulty}
                  </span>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Authoritative Dual Timers: Question Timer (60s) & Overall Timer */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/60 font-mono text-xs font-bold text-blue-900" title="Question Time Left (60s per problem)">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-[10px] uppercase font-sans text-blue-600 font-extrabold">Q:</span>
                    <span>{formatTime(questionTimeRemaining)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-800" title="Authoritative Overall Exam Duration">
                    <span className="text-[10px] uppercase font-sans text-slate-500 font-extrabold">Total:</span>
                    <span>{formatTime(overallTimeRemaining)}</span>
                  </div>
                </div>

                {/* Run Code Button */}
                <button
                  onClick={handleRunCode}
                  disabled={isEvaluatingCode}
                  className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Play size={14} className={isEvaluatingCode ? 'animate-spin' : 'text-emerald-400'} />
                  <span>{isEvaluatingCode ? 'Running Tests...' : 'Run Code'}</span>
                </button>

                {/* Submit Code Button */}
                <button
                  onClick={() => setShowSubmitModal(true)}
                  disabled={submittingTest}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <CheckSquare size={14} />
                  <span>Submit Assessment</span>
                </button>
              </div>
            </div>

            {/* Split Panes: Problem Statement (Left) vs Code Editor & Test Console (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mb-4">
              {/* Left Column: Problem Statement & Specifications */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs overflow-y-auto max-h-[720px] space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {curQ.topic_slug || 'Algorithmic Problem'}
                    </span>
                    <span className="text-xs font-bold text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-500">{curQ.difficulty} Tier</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {curQ.code_snippet || curQ.title || `Problem ${currentQuestionIndex + 1}`}
                  </h3>
                  <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {curQ.question_text}
                  </div>
                </div>

                {curQ.input_format && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Input Format</h4>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-line">
                      {curQ.input_format}
                    </div>
                  </div>
                )}

                {curQ.output_format && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Output Format</h4>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-line">
                      {curQ.output_format}
                    </div>
                  </div>
                )}

                {curQ.constraints && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Constraints</h4>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 whitespace-pre-line">
                      {curQ.constraints}
                    </div>
                  </div>
                )}

                {curQ.sample_input && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sample Input</h4>
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                      <pre>{curQ.sample_input}</pre>
                    </div>
                  </div>
                )}

                {curQ.sample_output && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sample Output</h4>
                    <div className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                      <pre>{curQ.sample_output}</pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Code Editor & Execution Console */}
              <div className="flex flex-col gap-4">
                {/* Real Code Editor with Line Numbers, Tab Indent, and Multi-Language Bar */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-lg flex flex-col overflow-hidden">
                  {/* Top Bar: Horizontal Language Bar & Editor Action Buttons */}
                  <div className="bg-slate-900 px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
                    {/* Horizontal Language Selector: Python, Java, C, C++ */}
                    <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      {[
                        { id: 'python', label: 'Python', ver: '3.12' },
                        { id: 'java', label: 'Java', ver: '17' },
                        { id: 'c', label: 'C', ver: 'C11' },
                        { id: 'cpp', label: 'C++', ver: 'C++17' }
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          type="button"
                          onClick={() => setCodingLanguage(lang.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            codingLanguage === lang.id
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <span>{lang.label}</span>
                          <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                            codingLanguage === lang.id ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {lang.ver}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Editor Action Buttons: Reset, Clear, Copy */}
                    <div className="flex items-center gap-1.5">
                      {editorCopiedToast && (
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-800">
                          Copied!
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={handleCopyCode}
                        title="Copy Code to Clipboard"
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Copy size={13} />
                        <span className="hidden sm:inline">Copy</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetCode}
                        title="Reset code to starter template"
                        className="p-1.5 text-slate-400 hover:text-amber-400 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw size={13} />
                        <span className="hidden sm:inline">Reset</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearCode}
                        title="Clear Code"
                        className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={13} />
                        <span className="hidden sm:inline">Clear</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Editor Body with Line Numbers Gutter */}
                  <div className="flex flex-1 min-h-[360px] max-h-[460px] bg-slate-950 overflow-hidden relative">
                    {/* Line numbers gutter */}
                    <div 
                      id="editor-line-numbers"
                      className="w-11 py-3 bg-slate-900/70 border-r border-slate-800/80 text-right pr-2.5 font-mono text-xs text-slate-500 select-none overflow-hidden leading-relaxed shrink-0"
                    >
                      {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i + 1} className="h-5 leading-5">{i + 1}</div>
                      ))}
                    </div>

                    {/* Real Textarea with Tab Support */}
                    <textarea
                      value={currentCode}
                      onChange={(e) => handleCodeChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Tab') {
                          e.preventDefault();
                          const start = e.target.selectionStart;
                          const end = e.target.selectionEnd;
                          const val = e.target.value;
                          const newVal = val.substring(0, start) + '    ' + val.substring(end);
                          handleCodeChange(newVal);
                          setTimeout(() => {
                            e.target.selectionStart = e.target.selectionEnd = start + 4;
                          }, 0);
                        }
                      }}
                      onScroll={(e) => {
                        const gutter = document.getElementById('editor-line-numbers');
                        if (gutter) gutter.scrollTop = e.target.scrollTop;
                      }}
                      rows={18}
                      spellCheck="false"
                      className="flex-1 bg-transparent text-slate-100 font-mono text-xs p-3 leading-5 focus:outline-none resize-none overflow-auto whitespace-pre selection:bg-blue-600/40"
                      placeholder={`// Write your ${codingLanguage.toUpperCase()} solution here...`}
                    />
                  </div>
                </div>

                {/* Test Case Execution & Diagnostics Console */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-xs flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-600">Test Case Execution</span>
                      {evalResult && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                          evalResult.allPassed 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {evalResult.status}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleRunCode}
                      disabled={isEvaluatingCode}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 disabled:opacity-50"
                    >
                      <Play size={12} className={isEvaluatingCode ? 'animate-spin' : ''} />
                      <span>{isEvaluatingCode ? 'Running...' : 'Run Code'}</span>
                    </button>
                  </div>

                  {/* Case Tabs: Sample Case 1, Sample Case 2, Custom Input */}
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                    {evalResult?.results ? (
                      evalResult.results.map((r, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveEvalTab(idx);
                            setCustomInputTabActive(false);
                          }}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                            !customInputTabActive && activeEvalTab === idx
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {r.passed ? (
                            <CheckCircle2 size={13} className="text-emerald-400" />
                          ) : (
                            <XCircle size={13} className="text-rose-400" />
                          )}
                          <span>Case {r.testCaseIndex || idx + 1}</span>
                        </button>
                      ))
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setCustomInputTabActive(false)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                            !customInputTabActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Sample Case 1
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomInputTabActive(false)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600"
                        >
                          Sample Case 2
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => setCustomInputTabActive(true)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ml-auto ${
                        customInputTabActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Custom Input
                    </button>
                  </div>

                  {/* Active Tab View */}
                  {customInputTabActive ? (
                    <div className="space-y-2 text-xs">
                      <div className="font-bold text-slate-700">Enter Custom Input (stdin):</div>
                      <textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        rows={4}
                        placeholder="Paste your custom test input here..."
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <p className="text-[11px] text-slate-400">Click "Run Code" above to execute against this input.</p>
                    </div>
                  ) : evalResult?.results?.[activeEvalTab] ? (
                    <div className="space-y-3 flex-1 overflow-y-auto">
                      {/* Compilation or Runtime Error Banner */}
                      {evalResult.results[activeEvalTab].error && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800">
                          <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-900">
                            <AlertCircle size={14} className="text-rose-600" />
                            <span>{evalResult.status || 'Execution Error'}</span>
                          </div>
                          <pre className="font-mono text-[11px] whitespace-pre-wrap text-rose-700">
                            {evalResult.results[activeEvalTab].error}
                          </pre>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Standard Input</div>
                          <div className="text-slate-800 whitespace-pre-wrap">{evalResult.results[activeEvalTab].input}</div>
                        </div>

                        {evalResult.results[activeEvalTab].expected && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expected Output</div>
                            <div className="text-emerald-700 font-bold whitespace-pre-wrap">{evalResult.results[activeEvalTab].expected}</div>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Output</span>
                          {evalResult.results[activeEvalTab].runtimeSeconds && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              Runtime: {evalResult.results[activeEvalTab].runtimeSeconds}s
                            </span>
                          )}
                        </div>
                        <div className={`whitespace-pre-wrap ${
                          evalResult.results[activeEvalTab].passed ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {evalResult.results[activeEvalTab].actual || (evalResult.results[activeEvalTab].error ? 'Execution encountered errors' : 'No stdout returned')}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center justify-center">
                      <Terminal size={24} className="text-slate-300 mb-2" />
                      <span>Click "Run Code" above to execute your solution against sample test cases.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Bar: Problem Navigation Palette & Action Buttons */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Question Navigation Palette */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1">Problems:</span>
                {activeTest.questions.map((q, idx) => {
                  const isCur = idx === currentQuestionIndex;
                  const qCodes = userCodes[q.id];
                  const hasWrittenCode = qCodes && Object.values(qCodes).some(c => c && c.trim().length > 30);
                  const isPassed = evalResultsMap[q.id]?.allPassed;

                  let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isPassed) {
                    btnStyle = 'bg-emerald-600 text-white font-extrabold';
                  } else if (hasWrittenCode) {
                    btnStyle = 'bg-blue-600 text-white font-extrabold';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-9 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${btnStyle} ${
                        isCur ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : null}
                      <span>{idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next / Submit Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                {currentQuestionIndex + 1 < activeTest.questions.length ? (
                  <button
                    type="button"
                    onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Next Problem</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <CheckSquare size={14} />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ------------------------------------------------------------------- */}
      {/* 8. SUBMIT TEST CONFIRMATION MODAL */}
      {/* ------------------------------------------------------------------- */}
      {showSubmitModal && activeTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Assessment?</h3>
            <p className="text-xs text-slate-500 mb-5">
              Review your attempt status before final submission. Your answers and score will be permanently persisted to the database.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">
                  {activeTest.test_type === 'coding' ? 'Total Coding Problems:' : 'Total Questions:'}
                </span>
                <span className="font-bold text-slate-900">{activeTest.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">
                  {activeTest.test_type === 'coding' ? 'Problems Attempted:' : 'Answered:'}
                </span>
                <span className="font-bold text-emerald-600">
                  {activeTest.test_type === 'coding'
                    ? Object.values(userCodes).filter(codes => Object.values(codes || {}).some(c => c && c.trim())).length
                    : Object.keys(userAnswers).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">
                  {activeTest.test_type === 'coding' ? 'Unattempted:' : 'Unanswered:'}
                </span>
                <span className="font-bold text-rose-600">
                  {activeTest.test_type === 'coding'
                    ? Math.max(0, activeTest.questions.length - Object.values(userCodes).filter(codes => Object.values(codes || {}).some(c => c && c.trim())).length)
                    : Math.max(0, activeTest.questions.length - Object.keys(userAnswers).length)}
                </span>
              </div>
              {activeTest.test_type !== 'coding' && (
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Marked for Review:</span>
                  <span className="font-bold text-purple-600">{Object.values(markedForReview).filter(Boolean).length}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Back to Test
              </button>
              <button
                onClick={() => handleSubmitTest()}
                disabled={submittingTest}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                {submittingTest ? 'Submitting...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 9. TEST RESULTS & DETAILED STEP-BY-STEP SOLUTIONS VIEW */}
      {/* ------------------------------------------------------------------- */}
      {viewMode === 'results' && testResult && (() => {
        const isCodingResult = testResult.test_type === 'coding' || !!testResult.coding_summary;

        return (
          <div className="max-w-5xl mx-auto px-6 py-8 w-full flex-1">
            {/* Result Score Banner */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 text-center">
              <Award size={56} className="text-yellow-500 mx-auto mb-3" />
              <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border ${
                isCodingResult 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                {isCodingResult ? 'Hands-On Coding Assessment Completed' : 'Assessment Completed'}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 mb-1">
                {testResult.test_title}
              </h2>
              <p className="text-slate-500 text-xs mb-6">
                Saved to your performance history • Attempt #{testResult.attempt_id}
              </p>

              {/* Score Ring / Card */}
              <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <div className="text-5xl font-extrabold text-blue-600 tracking-tight">
                  {isCodingResult ? (
                    <>
                      {testResult.coding_summary?.solved_count ?? testResult.score}{' '}
                      <span className="text-2xl text-slate-400 font-semibold">/ {testResult.total_questions} Solved</span>
                    </>
                  ) : (
                    <>
                      {testResult.score}{' '}
                      <span className="text-2xl text-slate-400 font-semibold">/ {testResult.total_questions}</span>
                    </>
                  )}
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500 mt-1">
                  {isCodingResult ? `Overall Assessment Score (${testResult.percentage}%)` : `Final Score (${testResult.percentage}%)`}
                </div>
              </div>

              {/* Diagnostic Metrics Grid */}
              {isCodingResult ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-6">
                  <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 text-center">
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Accepted</div>
                    <div className="text-xl font-extrabold text-emerald-700 mt-0.5">
                      {testResult.coding_summary?.solved_count ?? testResult.score} / {testResult.total_questions}
                    </div>
                  </div>
                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-100 text-center">
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Partial</div>
                    <div className="text-xl font-extrabold text-amber-700 mt-0.5">
                      {testResult.coding_summary?.partially_solved_count ?? 0}
                    </div>
                  </div>
                  <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 text-center">
                    <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">Unsolved</div>
                    <div className="text-xl font-extrabold text-rose-700 mt-0.5">
                      {testResult.coding_summary?.unsolved_count ?? 0}
                    </div>
                  </div>
                  <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 text-center">
                    <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Test Cases</div>
                    <div className="text-xl font-extrabold text-blue-700 mt-0.5">
                      {testResult.coding_summary?.total_test_cases_passed ?? 0} / {testResult.coding_summary?.total_test_cases ?? 0}
                    </div>
                  </div>
                  <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 text-center">
                    <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Accuracy</div>
                    <div className="text-xl font-extrabold text-indigo-700 mt-0.5">
                      {testResult.accuracy ?? testResult.percentage}%
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Time Taken</div>
                    <div className="text-xl font-extrabold text-slate-800 mt-0.5">
                      {formatTime(testResult.time_taken_seconds)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-6">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Score</div>
                    <div className="text-xl font-extrabold text-blue-600 mt-0.5">{testResult.score} / {testResult.total_questions}</div>
                  </div>
                  <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 text-center">
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Correct</div>
                    <div className="text-xl font-extrabold text-emerald-700 mt-0.5">{testResult.correct_count ?? testResult.score}</div>
                  </div>
                  <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 text-center">
                    <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">Incorrect</div>
                    <div className="text-xl font-extrabold text-rose-700 mt-0.5">{testResult.incorrect_count ?? 0}</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Unanswered</div>
                    <div className="text-xl font-extrabold text-slate-700 mt-0.5">{testResult.unanswered_count ?? 0}</div>
                  </div>
                  <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 text-center">
                    <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Accuracy</div>
                    <div className="text-xl font-extrabold text-indigo-700 mt-0.5">{testResult.accuracy ?? testResult.percentage}%</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Time Taken</div>
                    <div className="text-xl font-extrabold text-slate-800 mt-0.5">{formatTime(testResult.time_taken_seconds)}</div>
                  </div>
                </div>
              )}

              {/* Quick Diagnostic Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto mb-8">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                  testResult.percentage >= 60 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {testResult.percentage >= 60 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  {testResult.percentage >= 75 ? 'Placement Ready (Distinction)' : (testResult.percentage >= 60 ? 'Passing Score (Proficient)' : 'Needs Revision (< 60%)')}
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 flex items-center gap-1.5">
                  <Clock size={16} className="text-blue-600" />
                  Time: {formatTime(testResult.time_taken_seconds)}
                </span>
              </div>

              {/* Personalized Recommendations Card */}
              {testResult.recommendations && testResult.recommendations.length > 0 && (
                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 text-left max-w-2xl mx-auto mb-6">
                  <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Personalized Diagnostic Recommendations
                  </div>
                  <div className="space-y-2">
                    {testResult.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                        <span>{rec.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setViewMode('browse');
                    setActiveTest(null);
                    setTestResult(null);
                    clearSessionStorage();
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                >
                  Back to Assessments
                </button>

                <button
                  onClick={() => {
                    setViewMode('browse');
                    setActiveTab('history');
                    fetchHistory();
                    clearSessionStorage();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <BarChart2 size={16} />
                  View Analytics History
                </button>

                <Link
                  to="/agent"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Discuss with AI Career Agent</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Problem-by-Problem Review Breakdown: Coding vs MCQ */}
            {isCodingResult ? (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Terminal size={20} className="text-emerald-600" />
                      <span>Coding Problems & Test Case Evaluation</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Review submitted code, hidden test cases passed, runtime performance, and optimal algorithmic solutions.
                    </p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setSolutionFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        solutionFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      All ({testResult.detailed_results?.length || 0})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('incorrect')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        solutionFilter === 'incorrect' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Needs Work ({testResult.detailed_results?.filter(d => d.status !== 'Accepted').length || 0})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('correct')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        solutionFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Accepted ({testResult.detailed_results?.filter(d => d.status === 'Accepted').length || 0})
                    </button>
                  </div>
                </div>

                {/* Coding Problems List */}
                <div className="space-y-6">
                  {testResult.detailed_results
                    ?.filter(d => {
                      if (solutionFilter === 'incorrect') return d.status !== 'Accepted';
                      if (solutionFilter === 'correct') return d.status === 'Accepted';
                      return true;
                    })
                    .map((res, index) => {
                      const isAccepted = res.status === 'Accepted';
                      const isPartial = res.status === 'Partially Accepted';
                      const isExpanded = expandedResultProblem === res.question_id || (expandedResultProblem === null && index === 0);

                      return (
                        <div 
                          key={res.question_id || index}
                          className={`p-6 rounded-2xl border transition-all ${
                            isAccepted 
                              ? 'border-emerald-200 bg-emerald-50/20' 
                              : isPartial 
                                ? 'border-amber-200 bg-amber-50/20'
                                : 'border-rose-200 bg-rose-50/20'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center text-white ${
                                isAccepted ? 'bg-emerald-600' : isPartial ? 'bg-amber-600' : 'bg-rose-600'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="font-bold text-slate-900 text-sm md:text-base">
                                {res.title || `Problem ${index + 1}`}
                              </span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                                res.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' : res.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}>
                                {res.difficulty}
                              </span>
                              <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                {res.language || 'Python'}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 ${
                                isAccepted 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : isPartial 
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isAccepted ? <CheckCircle2 size={14} /> : isPartial ? <AlertTriangle size={14} /> : <XCircle size={14} />}
                                <span>{res.status}</span>
                                <span className="font-mono text-[11px]">({res.passed_test_cases}/{res.total_test_cases} passed)</span>
                              </span>

                              <button
                                type="button"
                                onClick={() => setExpandedResultProblem(isExpanded ? -1 : res.question_id)}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors"
                              >
                                <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </div>
                          </div>

                          {/* Problem Statement Snippet */}
                          <p className="text-xs text-slate-600 mb-4 whitespace-pre-line line-clamp-3">
                            {res.question_text}
                          </p>

                          {/* Expandable Section: Submitted Code + Test Cases + Solution */}
                          {isExpanded && (
                            <div className="space-y-4 pt-3 border-t border-slate-200/80">
                              {/* Submitted Code Block */}
                              <div>
                                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                                  <span className="flex items-center gap-1.5">
                                    <FileCode size={14} className="text-blue-600" />
                                    <span>Candidate Submitted Solution ({res.language || 'Python'}):</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (navigator?.clipboard && res.submitted_code) {
                                        navigator.clipboard.writeText(res.submitted_code);
                                      }
                                    }}
                                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                                  >
                                    <Copy size={12} />
                                    <span>Copy Code</span>
                                  </button>
                                </div>
                                <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 max-h-60">
                                  <pre>{res.submitted_code || '// No code submitted'}</pre>
                                </div>
                              </div>

                              {/* Test Cases Results */}
                              {res.test_results && res.test_results.length > 0 && (
                                <div>
                                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Terminal size={13} className="text-emerald-600" />
                                    <span>Test Case Evaluation Breakdown</span>
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {res.test_results.map((tc, tcIdx) => (
                                      <div
                                        key={tcIdx}
                                        className={`p-3 rounded-xl border text-xs font-mono ${
                                          tc.passed 
                                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' 
                                            : 'bg-rose-50/50 border-rose-200 text-rose-950'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between font-sans font-bold text-[11px] mb-1.5">
                                          <span className="flex items-center gap-1">
                                            {tc.passed ? <Check size={12} className="text-emerald-600" /> : <X size={12} className="text-rose-600" />}
                                            <span>Test Case {tc.testCaseIndex || tcIdx + 1}</span>
                                            {tc.isSample && <span className="text-[10px] px-1 py-0.2 rounded bg-slate-200 text-slate-700 font-medium">Sample</span>}
                                          </span>
                                          <span className={tc.passed ? 'text-emerald-700' : 'text-rose-700'}>
                                            {tc.passed ? 'Passed' : 'Failed'}
                                          </span>
                                        </div>
                                        <div className="space-y-1 text-[11px]">
                                          {tc.input && (
                                            <div className="text-slate-600 truncate">
                                              <span className="font-semibold text-slate-400 font-sans">Input: </span>
                                              <span className="font-mono">{tc.input}</span>
                                            </div>
                                          )}
                                          <div className="text-slate-700 truncate">
                                            <span className="font-semibold text-slate-400 font-sans">Expected: </span>
                                            <span className="font-mono text-emerald-700 font-bold">{tc.expected ?? tc.expectedOutput}</span>
                                          </div>
                                          <div className="text-slate-700 truncate">
                                            <span className="font-semibold text-slate-400 font-sans">Output: </span>
                                            <span className={`font-mono font-bold ${tc.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                                              {(tc.actual ?? tc.actualOutput) || (tc.error ? 'Error' : 'Empty')}
                                            </span>
                                          </div>
                                          {tc.error && (
                                            <div className="text-rose-600 font-sans text-[10px] bg-rose-100/60 p-1 rounded mt-1">
                                              {tc.error}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Optimal Solution Explanation */}
                              {res.explanation && (
                                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 text-xs">
                                  <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase tracking-wider mb-1.5">
                                    <Sparkles size={14} />
                                    <span>Optimal Algorithmic Solution & Complexity Analysis</span>
                                  </div>
                                  <div className="text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                                    {res.explanation}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Step-by-Step Solution Breakdown</h3>
                    <p className="text-xs text-slate-500">Review answers, formula derivations, and step-by-step mathematical reasoning.</p>
                  </div>

                  {/* Solution Filter Buttons */}
                  <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setSolutionFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        solutionFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      All ({testResult.detailed_results?.length || 0})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('incorrect')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        solutionFilter === 'incorrect' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Incorrect Only ({testResult.detailed_results?.filter(d => d.is_correct === 0).length || 0})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('correct')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        solutionFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Correct Only ({testResult.detailed_results?.filter(d => d.is_correct === 1).length || 0})
                    </button>
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                  {testResult.detailed_results
                    ?.filter(d => {
                      if (solutionFilter === 'incorrect') return d.is_correct === 0;
                      if (solutionFilter === 'correct') return d.is_correct === 1;
                      return true;
                    })
                    .map((res, index) => {
                      const isCorrect = res.is_correct === 1;

                      return (
                        <div 
                          key={res.question_id || index}
                          className={`p-6 rounded-2xl border transition-all ${
                            isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center text-white ${
                                isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}>
                                {index + 1}
                              </span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isCorrect ? 'Correct' : (res.user_selected_index === null ? 'Not Answered' : 'Incorrect')}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-sm md:text-base font-semibold text-slate-900 mb-4 whitespace-pre-line">
                            {res.question_text}
                          </h4>

                          {/* Options with Answer Highlight */}
                          {res.options && (
                            <div className="space-y-2 mb-4">
                              {res.options.map((opt) => {
                                const isUserChoice = res.user_selected_index === opt.option_index;
                                const isCorrectOpt = opt.is_correct;
                                const letter = String.fromCharCode(65 + opt.option_index);

                                let optStyle = 'border-slate-200 bg-white text-slate-700';
                                if (isCorrectOpt) {
                                  optStyle = 'border-emerald-500 bg-emerald-50 font-bold text-emerald-900';
                                } else if (isUserChoice && !isCorrectOpt) {
                                  optStyle = 'border-rose-500 bg-rose-50 font-semibold text-rose-900';
                                }

                                return (
                                  <div
                                    key={opt.option_index}
                                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className={`w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center ${
                                        isCorrectOpt ? 'bg-emerald-600 text-white' : (isUserChoice ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600')
                                      }`}>
                                        {letter}
                                      </span>
                                      <span>{opt.option_text}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                                      {isCorrectOpt && (
                                        <span className="text-emerald-700 flex items-center gap-1">
                                          <CheckCircle2 size={14} /> Correct Answer
                                        </span>
                                      )}
                                      {isUserChoice && !isCorrectOpt && (
                                        <span className="text-rose-700 flex items-center gap-1">
                                          <XCircle size={14} /> Your Choice
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Step-by-Step Explanation Box */}
                          {res.explanation && (
                            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 text-xs">
                              <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase tracking-wider mb-2">
                                <Sparkles size={14} />
                                <span>Step-by-Step Mathematical & Logical Solution</span>
                              </div>
                              <div className="text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                                {res.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        );
      })()}

    </div>
  );
};

export default MockExams;
