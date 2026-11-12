import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Target,
  ShieldCheck,
  Award,
  RefreshCw,
  X,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  HelpCircle,
  FileCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

const AtsResumeAnalysis = ({ defaultTargetRole = '' }) => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState(defaultTargetRole || '');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'content' | 'keywords'

  const fileInputRef = useRef(null);

  // Sync default target role if provided and not yet modified
  useEffect(() => {
    if (defaultTargetRole && !targetRole) {
      setTargetRole(defaultTargetRole);
    }
  }, [defaultTargetRole]);

  // Load previous analyses from SQLite backend on component mount
  useEffect(() => {
    fetchLatestAnalyses();
  }, []);

  const fetchLatestAnalyses = async () => {
    try {
      const res = await api.get('/ats/latest');
      if (res.data?.success && Array.isArray(res.data.analyses)) {
        setRecentAnalyses(res.data.analyses);
      }
    } catch (err) {
      console.warn("Could not fetch recent ATS analyses:", err);
    }
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) return 'Please select a file.';
    const validExtensions = ['.pdf', '.docx'];
    const filename = selectedFile.name.toLowerCase();
    const isValid = validExtensions.some(ext => filename.endsWith(ext));
    if (!isValid) {
      return 'Unsupported format. Please upload a PDF (.pdf) or Word document (.docx).';
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      return 'File size exceeds 10MB limit.';
    }
    return null;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const validationError = validateFile(selected);
    if (validationError) {
      setError(validationError);
      setFile(null);
    } else {
      setError(null);
      setFile(selected);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;
    const validationError = validateFile(dropped);
    if (validationError) {
      setError(validationError);
      setFile(null);
    } else {
      setError(null);
      setFile(dropped);
    }
  };

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!file) {
      setError('Please choose a PDF or DOCX resume to analyze.');
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    if (targetRole.trim()) {
      formData.append('targetRole', targetRole.trim());
    }

    try {
      const currentUserId = localStorage.getItem('user_id') || localStorage.getItem('user_email') || 'ashalathaavuru7@gmail.com';
      const response = await api.post('/ats/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-user-id': currentUserId
        }
      });

      if (response.data && response.data.overall_score !== undefined) {
        setAnalysis(response.data);
        fetchLatestAnalyses();
      } else {
        throw new Error('Received unexpected response from ATS evaluation engine.');
      }
    } catch (err) {
      console.error('ATS Analysis Error:', err);
      const errMsg = err.response?.data?.error || err.message || 'Unable to complete ATS analysis. Please try again.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPrevious = (item) => {
    if (item?.analysis) {
      setAnalysis({
        filename: item.filename,
        target_role: item.target_role,
        ...item.analysis
      });
      setError(null);
      window.scrollTo({ behavior: 'smooth', top: document.getElementById('ats-results-view')?.offsetTop || 500 });
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (score >= 65) return 'text-blue-600 border-blue-500 bg-blue-50';
    if (score >= 50) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'High ATS Compatibility (Interview Ready)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (score >= 65) return { label: 'Moderate Compatibility (Competitive)', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    if (score >= 50) return { label: 'Developing Compatibility (Needs Polish)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { label: 'Low Compatibility (Needs Revision)', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8" id="ats-analysis-card">

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">ATS Resume Analysis</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Upload your resume and check how well it is optimized for Applicant Tracking Systems.
              </p>
            </div>
          </div>
        </div>

        {recentAnalyses.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <Clock size={14} className="text-gray-400" />
            <span>{recentAnalyses.length} saved in history</span>
          </div>
        )}
      </div>

      {/* 2. Upload & Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upload Drop Zone (Takes 2 columns on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Upload Resume Document (PDF or DOCX)
          </label>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${isDragging
                ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                : file
                  ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-400'
                  : 'border-gray-300 hover:border-blue-400 bg-gray-50/50 hover:bg-gray-50'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />

            {file ? (
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full">
                  <FileCheck size={32} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-3 py-1 rounded-md"
                >
                  <X size={13} /> Change file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                  <UploadCloud size={32} />
                </div>
                <p className="font-semibold text-gray-800 text-sm">
                  Drag and drop your resume here, or <span className="text-blue-600 hover:underline">browse files</span>
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: PDF (.pdf) and Microsoft Word (.docx) • Up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Target Job Role & Actions Card */}
        <div className="bg-gray-50/80 rounded-2xl border border-gray-200 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Target size={14} className="text-blue-600" /> Target Job Role <span className="text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Developer, Data Analyst"
                className="w-full text-xs font-medium p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                If provided, ATS will evaluate keyword alignment specific to this title.
              </p>
            </div>

            {/* Quick role suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Software Developer', 'Full Stack', 'Data Analyst', 'Java Developer', 'AI/ML Engineer'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRole(role)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${targetRole === role
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || isLoading}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${!file || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:scale-[1.01]'
              }`}
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Analyzing your resume...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Analyze Resume</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Error Notice */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3 text-rose-700 text-xs">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-rose-500" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">Analysis Issue</span>
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-700">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Loading Progress State */}
      {isLoading && (
        <div className="py-12 px-6 bg-blue-50/40 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <Sparkles size={24} className="text-blue-600 absolute inset-0 m-auto" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">Analyzing your resume...</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              Extracting document structure, scanning keyword density, comparing skills against industry standards, and scoring ATS compatibility.
            </p>
          </div>
        </div>
      )}

      {/* Previous Analyses Quick Carousel */}
      {!isLoading && !analysis && recentAnalyses.length > 0 && (
        <div className="border-t border-gray-100 pt-6 space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={13} /> Previous Resume Analyses
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentAnalyses.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectPrevious(item)}
                className="p-3.5 bg-gray-50 hover:bg-blue-50/50 rounded-xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-3">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.filename || 'Resume'}</p>
                  <p className="text-[11px] text-gray-500 truncate">{item.target_role || 'General Role'}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-sm font-black px-2 py-0.5 rounded-lg border ${getScoreColor(item.overall_score || 0)}`}>
                    {item.overall_score || 0}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. ATS ANALYSIS RESULTS DISPLAY                                 */}
      {/* ============================================================== */}
      {analysis && !isLoading && (
        <div id="ats-results-view" className="space-y-8 pt-4 border-t border-gray-200 animate-fadeIn">

          {/* Header Summary & Radial Score */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="space-y-2 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-white/10">
                <FileText size={13} /> {analysis.filename || file?.name || 'Resume Analyzed'}
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                ATS Optimization Scorecard
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Evaluated against <span className="font-semibold text-blue-300">{analysis.target_role || targetRole || 'General Technical Engineering'}</span> criteria. Based strictly on the text extracted from your uploaded document.
              </p>

              <div className="pt-2">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${getScoreBadge(analysis.overall_score || 0).color}`}>
                  {getScoreBadge(analysis.overall_score || 0).label}
                </span>
              </div>
            </div>

            {/* Circular / Radial Score Indicator */}
            <div className="relative flex flex-col items-center justify-center shrink-0">
              <div className="w-36 h-36 rounded-full border-8 border-slate-700/60 flex flex-col items-center justify-center bg-slate-950/80 shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent transition-all duration-1000"
                  style={{
                    borderColor: analysis.overall_score >= 80 ? '#10b981' : analysis.overall_score >= 65 ? '#3b82f6' : '#f59e0b',
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
                  }}
                ></div>
                <span className="text-4xl font-black text-white tracking-tight leading-none">
                  {analysis.overall_score || 0}
                </span>
                <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                  out of 100
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold mt-2">Overall ATS Score</span>
            </div>

          </div>

          {/* Section 1: Detailed Score Breakdown Grid (Sum strictly = 100) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Layers size={16} className="text-blue-600" /> ATS Score Breakdown (Calculated out of 100)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Keyword Relevance */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Keyword Relevance</span>
                  <span className="font-black text-blue-600">{analysis.score_breakdown?.keyword_relevance ?? 18} / 25</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${((analysis.score_breakdown?.keyword_relevance ?? 18) / 25) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-500">Alignment with target role terminology & core tech stack.</p>
              </div>

              {/* Skills Alignment */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Skills Alignment</span>
                  <span className="font-black text-emerald-600">{analysis.score_breakdown?.skills_alignment ?? 20} / 25</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${((analysis.score_breakdown?.skills_alignment ?? 20) / 25) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-500">Breadth & categorization of detected programming skills.</p>
              </div>

              {/* Resume Structure */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Resume Structure</span>
                  <span className="font-black text-indigo-600">{analysis.score_breakdown?.resume_structure ?? 17} / 20</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${((analysis.score_breakdown?.resume_structure ?? 17) / 20) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-500">Standard section hierarchy and contact info clarity.</p>
              </div>

              {/* Content Quality */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Content Quality</span>
                  <span className="font-black text-purple-600">{analysis.score_breakdown?.content_quality ?? 14} / 15</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${((analysis.score_breakdown?.content_quality ?? 14) / 15) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-500">Action verbs, quantified metrics, and phrasing depth.</p>
              </div>

              {/* Projects/Experience */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">Projects / Experience</span>
                  <span className="font-black text-amber-600">{analysis.score_breakdown?.projects_experience ?? 8} / 10</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full transition-all" style={{ width: `${((analysis.score_breakdown?.projects_experience ?? 8) / 10) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-500">Technical depth, architecture complexity, and outcomes.</p>
              </div>

              {/* ATS Formatting */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">ATS Formatting</span>
                  <span className="font-black text-teal-600">{analysis.score_breakdown?.ats_formatting ?? 5} / 5</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full transition-all" style={{ width: `${((analysis.score_breakdown?.ats_formatting ?? 5) / 5) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-500">Parsable fonts, clean text streams, and zero tables.</p>
              </div>

            </div>
          </div>

          {/* Sections 2 & 3: Strengths vs Improvements Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 2. Strengths */}
            <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" /> Resume Strengths
              </h4>
              <ul className="space-y-2.5">
                {(analysis.strengths || []).map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-emerald-950 leading-relaxed">
                    <span className="font-bold text-emerald-600 text-sm leading-none mt-0.5">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Important Improvements */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-600" /> Important Improvements
              </h4>
              <ul className="space-y-2.5">
                {(analysis.important_improvements || []).map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-amber-950 leading-relaxed">
                    <span className="font-bold text-amber-600 text-sm leading-none mt-0.5">⚠</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Section 4: Missing Keywords & Skills */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Target size={18} className="text-rose-600" /> Missing Keywords / Skills
            </h4>
            <p className="text-xs text-gray-500">
              These critical skills were not clearly detected in your uploaded resume. If you have experience with these topics, integrate them into your Skills or Projects.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {(analysis.missing_keywords || []).map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Section 5: Resume Formatting */}
          <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600" /> Resume Formatting
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(analysis.formatting_suggestions || []).map((fmt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-200/80">
                  <span className="text-blue-500 font-bold text-sm leading-none mt-0.5">•</span>
                  <span>{fmt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Specific Content Suggestions (Summary, Skills, Projects, Experience, Education, Certifications, Achievements) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" /> Section-by-Section Content Suggestions
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Summary */}
              {analysis.content_suggestions?.summary && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} /> Professional Summary
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.summary}
                  </p>
                </div>
              )}

              {/* Skills */}
              {analysis.content_suggestions?.skills && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu size={14} /> Skills Section
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.skills}
                  </p>
                </div>
              )}

              {/* Projects */}
              {analysis.content_suggestions?.projects && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderGit2 size={14} /> Projects
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.projects}
                  </p>
                </div>
              )}

              {/* Experience */}
              {analysis.content_suggestions?.experience && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase size={14} /> Internships & Experience
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.experience}
                  </p>
                </div>
              )}

              {/* Education */}
              {analysis.content_suggestions?.education && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap size={14} /> Education
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.education}
                  </p>
                </div>
              )}

              {/* Certifications */}
              {analysis.content_suggestions?.certifications && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Award size={14} /> Certifications
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.certifications}
                  </p>
                </div>
              )}

              {/* Achievements */}
              {analysis.content_suggestions?.achievements && (
                <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1.5 md:col-span-2">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Achievements & Honors
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {analysis.content_suggestions.achievements}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Section 7: Keyword Optimization */}
          <div className="bg-indigo-50/40 border border-indigo-200/80 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" /> Keyword Optimization Suggestions
            </h4>
            <div className="space-y-2">
              {(analysis.keyword_optimization || []).map((ko, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-indigo-950 bg-white p-3 rounded-xl border border-indigo-100">
                  <span className="font-black text-indigo-600">✦</span>
                  <span className="leading-relaxed">{ko}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Final Recommendations */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-lg">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Award size={20} className="text-yellow-400" /> Final Priority Recommendations
            </h4>
            <ol className="space-y-3">
              {(analysis.final_recommendations || []).map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom Action: Analyze Another Resume */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setAnalysis(null);
                setFile(null);
                window.scrollTo({ behavior: 'smooth', top: document.getElementById('ats-analysis-card')?.offsetTop || 0 });
              }}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={14} /> Analyze Another Resume
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default AtsResumeAnalysis;
