import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Layout, 
  FileText,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu
} from 'lucide-react';
import AtsResumeAnalysis from './AtsResumeAnalysis';

const ResumeBuilder = () => {
  const resumeRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  // Template definitions with high-res thumbnails
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      category: 'Tech & Startups',
      badge: 'Popular',
      color: 'border-blue-500 bg-blue-50 text-blue-700',
      activeColor: 'ring-2 ring-blue-600 border-blue-600',
      img: '/modern_resume.jpg',
      desc: 'Clean blue accents with centered typography. ATS-optimized for tech roles.'
    },
    {
      id: 'executive',
      name: 'Executive',
      category: 'Leadership & Mgmt',
      badge: 'Formal',
      color: 'border-slate-800 bg-slate-50 text-slate-800',
      activeColor: 'ring-2 ring-slate-900 border-slate-900',
      img: '/executive_resume.jpg',
      desc: 'Sophisticated dark header block. Built for senior and executive roles.'
    },
    {
      id: 'creative',
      name: 'Creative',
      category: 'Design & Media',
      badge: 'Vibrant',
      color: 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700',
      activeColor: 'ring-2 ring-fuchsia-600 border-fuchsia-600',
      img: '/creative_resume.jpg',
      desc: 'Pink & purple gradient styling with high-impact modern headers.'
    },
    {
      id: 'classic',
      name: 'Classic',
      category: 'Finance & Corporate',
      badge: 'Traditional',
      color: 'border-gray-700 bg-gray-50 text-gray-700',
      activeColor: 'ring-2 ring-gray-900 border-gray-900',
      img: '/classic_resume.jpg',
      desc: 'Formal serif typography with structured dividing lines.'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      category: 'Compact & Clean',
      badge: '2-Column',
      color: 'border-teal-500 bg-teal-50 text-teal-700',
      activeColor: 'ring-2 ring-teal-600 border-teal-600',
      img: '/minimal_resume.jpg',
      desc: 'Sleek two-column layout highlighting skills and maximizing space.'
    }
  ];

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState(location.state?.template || 'modern');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Resume data state
  const sampleData = {
    personal: {
      name: 'Alex Morgan',
      role: 'Senior Full Stack Engineer',
      email: 'alex.morgan@enterprise.io',
      phone: '+1 (555) 234-5678',
      linkedin: 'linkedin.com/in/alexmorgan-dev'
    },
    experience: 'Senior Software Engineer | TechCorp Inc. (2022 - Present)\n• Architected cloud-native microservices processing 12M+ daily requests with 99.99% reliability\n• Spearheaded React & TypeScript frontend revamp, decreasing bundle load times by 38%\n• Mentored 8 software engineers and standardized code review practices\n\nFull Stack Developer | InnovateLabs (2019 - 2022)\n• Built responsive web applications using React, Tailwind CSS, Node.js, and PostgreSQL\n• Automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS',
    education: 'Master of Science in Computer Science | Stanford University (2017 - 2019)\nBachelor of Science in Information Technology | University of California (2013 - 2017)',
    projects: 'Enterprise AI Placement Prep Platform\n• Engineered multi-modal placement suite featuring Gemini 3.8 live voice interviews and automated ATS resume scoring.\n\nHigh-Performance Distributed Cache\n• Built an in-memory key-value cache engine supporting Raft consensus and sub-millisecond query latency.',
    skills: 'Languages: JavaScript, TypeScript, Python, SQL, Go\nFrontend: React, Next.js, Tailwind CSS, Redux Toolkit, WebRTC\nBackend & Cloud: Node.js, Express, PostgreSQL, Redis, Docker, AWS (S3, ECS, Lambda)'
  };

  const emptyData = {
    personal: { name: '', email: '', phone: '', linkedin: '', role: '' },
    education: '',
    experience: '',
    skills: '',
    projects: ''
  };

  const [resumeData, setResumeData] = useState(sampleData);

  const handleChange = (section, field, value) => {
    if (section === 'personal') {
      setResumeData(prev => ({
        ...prev,
        personal: { ...prev.personal, [field]: value }
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.4,
      filename: `${resumeData.personal.name ? resumeData.personal.name.replace(/\s+/g, '_') : 'My'}_Resume_${selectedTemplate.toUpperCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();

    // Asynchronously record resume creation in backend for authenticated user stats
    try {
      const userId = localStorage.getItem('user_id') || localStorage.getItem('user_email') || 'ashalathaavuru7@gmail.com';
      const resumeTitle = `${resumeData.personal.name ? resumeData.personal.name.trim() : 'Executive'} Resume`;
      fetch('http://localhost:5000/api/resumes/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify({
          userId,
          title: resumeTitle,
          templateId: selectedTemplate,
          resumeData
        })
      }).catch(err => console.warn('Could not record resume:', err));
    } catch (e) {}
  };

  // ----------------------------------------------------
  // TEMPLATE RENDERERS
  // ----------------------------------------------------
  
  // 1. Modern
  const renderModernTemplate = () => (
    <div className="font-sans text-gray-900 p-8">
      <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{resumeData.personal.name || 'Your Full Name'}</h1>
        <p className="text-lg text-blue-600 font-semibold mt-1">{resumeData.personal.role || 'Target Role / Professional Title'}</p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 mt-3">
          <span>{resumeData.personal.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{resumeData.personal.phone || '+1 555-000-0000'}</span>
          <span>•</span>
          <span>{resumeData.personal.linkedin || 'linkedin.com/in/profile'}</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-100 pb-1 flex items-center gap-2">
          <Briefcase size={16} /> Professional Experience
        </h3>
        <p className="whitespace-pre-wrap text-gray-700 text-xs leading-relaxed">{resumeData.experience || 'Your experience details...'}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-100 pb-1 flex items-center gap-2">
          <FolderGit2 size={16} /> Key Projects
        </h3>
        <p className="whitespace-pre-wrap text-gray-700 text-xs leading-relaxed">{resumeData.projects || 'Your project details...'}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-100 pb-1 flex items-center gap-2">
          <GraduationCap size={16} /> Education
        </h3>
        <p className="whitespace-pre-wrap text-gray-700 text-xs leading-relaxed">{resumeData.education || 'Your education credentials...'}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-100 pb-1 flex items-center gap-2">
          <Cpu size={16} /> Skills & Technologies
        </h3>
        <p className="whitespace-pre-wrap text-gray-700 text-xs leading-relaxed">{resumeData.skills || 'Your skills list...'}</p>
      </div>
    </div>
  );

  // 2. Executive
  const renderExecutiveTemplate = () => (
    <div className="font-sans text-gray-900">
      <div className="bg-slate-900 text-white p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-light uppercase tracking-[0.25em] mb-1">{resumeData.personal.name || 'YOUR FULL NAME'}</h1>
        <p className="text-sm text-slate-300 tracking-widest font-semibold">{resumeData.personal.role || 'EXECUTIVE ROLE / LEADERSHIP'}</p>
        <div className="flex flex-wrap justify-center gap-4 text-[11px] mt-4 opacity-80 uppercase tracking-wider">
          <span>{resumeData.personal.email || 'email@example.com'}</span>
          <span>|</span>
          <span>{resumeData.personal.phone || '+1 555-000-0000'}</span>
          <span>|</span>
          <span>{resumeData.personal.linkedin || 'linkedin.com/in/profile'}</span>
        </div>
      </div>
      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-3">
            Executive Experience
          </h3>
          <p className="whitespace-pre-wrap text-slate-700 text-xs leading-relaxed">{resumeData.experience || 'Your executive experience...'}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-3">
            Key Initiatives & Projects
          </h3>
          <p className="whitespace-pre-wrap text-slate-700 text-xs leading-relaxed">{resumeData.projects || 'Your project initiatives...'}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-3">
              Education & Credentials
            </h3>
            <p className="whitespace-pre-wrap text-slate-700 text-xs leading-relaxed">{resumeData.education || 'Your degrees...'}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 mb-3">
              Core Competencies
            </h3>
            <p className="whitespace-pre-wrap text-slate-700 text-xs leading-relaxed">{resumeData.skills || 'Your competencies...'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 3. Creative
  const renderCreativeTemplate = () => (
    <div className="font-sans text-gray-800 flex flex-col min-h-full">
      <div className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 text-white p-8 rounded-br-[80px] shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-1 tracking-tight drop-shadow-sm">{resumeData.personal.name || 'Your Full Name'}</h1>
          <p className="text-sm font-bold text-fuchsia-200 tracking-wider uppercase mb-3">{resumeData.personal.role || 'Creative Designer & Engineer'}</p>
          <div className="flex flex-wrap gap-4 text-xs font-medium opacity-95">
            <span>{resumeData.personal.email || 'email@example.com'}</span>
            <span>•</span>
            <span>{resumeData.personal.phone || '+1 555-000-0000'}</span>
            <span>•</span>
            <span>{resumeData.personal.linkedin || 'portfolio.io'}</span>
          </div>
        </div>
      </div>
      
      <div className="p-8 flex-1 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-black text-fuchsia-600 mb-2 flex items-center gap-2">
              <span className="w-6 h-1 bg-pink-500 block rounded-full"></span> Experience
            </h3>
            <p className="whitespace-pre-wrap text-gray-700 text-xs leading-relaxed">{resumeData.experience || 'Your work experience...'}</p>
          </div>
          <div>
            <h3 className="text-lg font-black text-fuchsia-600 mb-2 flex items-center gap-2">
              <span className="w-6 h-1 bg-pink-500 block rounded-full"></span> Projects
            </h3>
            <p className="whitespace-pre-wrap text-gray-700 text-xs leading-relaxed">{resumeData.projects || 'Your creative projects...'}</p>
          </div>
        </div>
        
        <div className="col-span-1 bg-fuchsia-50/50 p-5 rounded-2xl border border-fuchsia-100 space-y-6 h-fit">
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2 border-b border-fuchsia-200 pb-1">Skills & Tools</h3>
            <p className="whitespace-pre-wrap text-gray-600 text-xs leading-relaxed">{resumeData.skills || 'Your skills...'}</p>
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2 border-b border-fuchsia-200 pb-1">Education</h3>
            <p className="whitespace-pre-wrap text-gray-600 text-xs leading-relaxed">{resumeData.education || 'Your education...'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Classic
  const renderClassicTemplate = () => (
    <div className="font-serif text-black p-8">
      <div className="text-center border-b-2 border-black pb-4 mb-5">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{resumeData.personal.name || 'YOUR FULL NAME'}</h1>
        <p className="text-sm font-sans font-medium text-gray-700 mt-1">{resumeData.personal.role || 'Candidate Title'}</p>
        <div className="flex flex-wrap justify-center gap-x-4 text-xs mt-2 font-sans text-gray-600">
          <span>{resumeData.personal.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{resumeData.personal.phone || '+1 555-000-0000'}</span>
          <span>•</span>
          <span>{resumeData.personal.linkedin || 'linkedin.com/in/profile'}</span>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Professional Experience</h3>
        <p className="whitespace-pre-wrap text-xs leading-relaxed font-sans text-gray-800">{resumeData.experience || 'Your experience...'}</p>
      </div>
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Key Projects</h3>
        <p className="whitespace-pre-wrap text-xs leading-relaxed font-sans text-gray-800">{resumeData.projects || 'Your projects...'}</p>
      </div>
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Education</h3>
        <p className="whitespace-pre-wrap text-xs leading-relaxed font-sans text-gray-800">{resumeData.education || 'Your education...'}</p>
      </div>
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase border-b border-gray-400 mb-2 pb-1 tracking-widest">Skills & Competencies</h3>
        <p className="whitespace-pre-wrap text-xs leading-relaxed font-sans text-gray-800">{resumeData.skills || 'Your skills...'}</p>
      </div>
    </div>
  );

  // 5. Minimal
  const renderMinimalTemplate = () => (
    <div className="font-sans flex gap-6 text-gray-800 p-8">
      <div className="w-1/3 border-r border-gray-200 pr-6 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">{resumeData.personal.name || 'Your Name'}</h1>
          <p className="text-xs text-teal-600 font-bold uppercase tracking-wider mt-1">{resumeData.personal.role || 'Target Role'}</p>
        </div>
        
        <div className="space-y-1.5 text-xs text-gray-600 break-words">
          <p className="font-semibold text-gray-800 text-[11px] uppercase tracking-wider">Contact</p>
          <p>{resumeData.personal.email || 'email@example.com'}</p>
          <p>{resumeData.personal.phone || '+1 555-000-0000'}</p>
          <p>{resumeData.personal.linkedin || 'linkedin.com'}</p>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-100 pb-1">Skills</h3>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-gray-600">{resumeData.skills || 'Your skills...'}</p>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-100 pb-1">Education</h3>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-gray-600">{resumeData.education || 'Your education...'}</p>
        </div>
      </div>
      
      <div className="w-2/3 space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-100 pb-1">Experience</h3>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-gray-700">{resumeData.experience || 'Your experience...'}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-100 pb-1">Projects</h3>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-gray-700">{resumeData.projects || 'Your projects...'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* ============================================================== */}
      {/* 1. TOP SECTION: TEMPLATE SELECTION GALLERY IN RESUME BUILDER   */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Layout className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Choose Resume Template</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Select any design below. Your data will instantly reformat and preview in real time!
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setResumeData(sampleData)}
              className="text-xs font-semibold px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Auto-fill with sample professional details"
            >
              <Sparkles size={14} /> Fill Sample Data
            </button>
            <button
              onClick={() => setResumeData(emptyData)}
              className="text-xs font-semibold px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Clear all fields"
            >
              <RotateCcw size={14} /> Clear Form
            </button>
            <button 
              onClick={() => setIsPreviewMode(true)} 
              className="text-xs font-semibold px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
            >
              <Eye size={14} /> Fullscreen Preview
            </button>
            <button 
              onClick={handleDownloadPDF} 
              className="text-xs font-bold px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

        {/* Templates Visual Cards Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 group bg-gray-50 flex flex-col ${
                  isSelected 
                    ? `${tpl.activeColor} shadow-md scale-[1.02] bg-white` 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="h-32 w-full relative overflow-hidden bg-gray-100">
                  <img 
                    src={tpl.img} 
                    alt={tpl.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" 
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-gray-900">{tpl.name}</h4>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tpl.color}`}>
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{tpl.category}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-blue-600 font-bold' : 'text-gray-400 group-hover:text-gray-600'}>
                      {isSelected ? '✓ Selected' : 'Click to Apply'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN SECTION: FORM EDITOR (LEFT) + REAL-TIME PREVIEW (RIGHT) */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Candidate Information</h3>
              <p className="text-xs text-gray-500">Edit details below to generate your custom resume</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wider">
              {selectedTemplate} layout
            </span>
          </div>

          {/* Personal Details */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User size={14} className="text-blue-600" /> Personal & Contact Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={resumeData.personal.name} 
                  placeholder="e.g. Alex Morgan" 
                  className="w-full text-sm border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  onChange={(e) => handleChange('personal', 'name', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Target Professional Role</label>
                <input 
                  type="text" 
                  value={resumeData.personal.role} 
                  placeholder="e.g. Senior Software Engineer" 
                  className="w-full text-sm border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  onChange={(e) => handleChange('personal', 'role', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={resumeData.personal.email} 
                  placeholder="e.g. alex@example.com" 
                  className="w-full text-sm border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  onChange={(e) => handleChange('personal', 'email', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={resumeData.personal.phone} 
                  placeholder="e.g. +1 (555) 000-0000" 
                  className="w-full text-sm border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  onChange={(e) => handleChange('personal', 'phone', e.target.value)} 
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn / Portfolio URL</label>
                <input 
                  type="text" 
                  value={resumeData.personal.linkedin} 
                  placeholder="e.g. linkedin.com/in/alexmorgan" 
                  className="w-full text-sm border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  onChange={(e) => handleChange('personal', 'linkedin', e.target.value)} 
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase size={14} className="text-blue-600" /> Work Experience
            </h4>
            <textarea 
              rows="5" 
              value={resumeData.experience} 
              placeholder="Role | Company (Years)&#10;• Key accomplishment 1&#10;• Key accomplishment 2..." 
              className="w-full text-xs font-mono border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed transition-all" 
              onChange={(e) => handleChange('experience', null, e.target.value)}
            />
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderGit2 size={14} className="text-blue-600" /> Key Projects & Initiatives
            </h4>
            <textarea 
              rows="4" 
              value={resumeData.projects} 
              placeholder="Project Title&#10;• Description of technology stack and measurable impact..." 
              className="w-full text-xs font-mono border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed transition-all" 
              onChange={(e) => handleChange('projects', null, e.target.value)}
            />
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap size={14} className="text-blue-600" /> Education & Certifications
            </h4>
            <textarea 
              rows="3" 
              value={resumeData.education} 
              placeholder="Degree, Major | University (Graduation Year)" 
              className="w-full text-xs font-mono border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed transition-all" 
              onChange={(e) => handleChange('education', null, e.target.value)}
            />
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu size={14} className="text-blue-600" /> Skills & Technical Stack
            </h4>
            <textarea 
              rows="3" 
              value={resumeData.skills} 
              placeholder="Languages: React, Node.js, Python, SQL, AWS..." 
              className="w-full text-xs font-mono border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed transition-all" 
              onChange={(e) => handleChange('skills', null, e.target.value)}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Live Document Preview */}
        <div className="w-full lg:w-1/2 sticky top-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            
            {/* Header bar of preview */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-green-400 inline-block"></span>
                <span className="text-xs font-semibold text-gray-500 ml-2">
                  Live Preview: <strong className="text-gray-800 capitalize">{selectedTemplate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className="text-xs font-semibold px-2.5 py-1 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                >
                  <Eye size={12} /> Expand
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="text-xs font-bold px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-1 shadow-sm"
                >
                  <Download size={12} /> PDF
                </button>
              </div>
            </div>

            {/* Document Canvas Container */}
            <div className="p-4 bg-gray-200/80 overflow-y-auto max-h-[calc(100vh-240px)] flex justify-center items-start">
              <div 
                ref={resumeRef} 
                className="bg-white w-full max-w-xl shadow-xl transition-all duration-300 rounded-sm"
                style={{ minHeight: '840px' }} 
              >
                {selectedTemplate === 'modern' && renderModernTemplate()}
                {selectedTemplate === 'classic' && renderClassicTemplate()}
                {selectedTemplate === 'minimal' && renderMinimalTemplate()}
                {selectedTemplate === 'executive' && renderExecutiveTemplate()}
                {selectedTemplate === 'creative' && renderCreativeTemplate()}
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 4. ATS RESUME ANALYSIS SECTION (BELOW RESUME BUILDER)          */}
      {/* ============================================================== */}
      <AtsResumeAnalysis defaultTargetRole={resumeData.personal?.role || ''} />

      {/* ============================================================== */}
      {/* 3. FULL SCREEN PREVIEW MODAL                                   */}
      {/* ============================================================== */}
      {isPreviewMode && (
        <div className="fixed inset-0 z-50 bg-gray-950/95 flex flex-col items-center overflow-y-auto pb-12 backdrop-blur-sm">
          {/* Top action header */}
          <div className="w-full max-w-5xl flex justify-between items-center p-4 sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-xl mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-white text-lg font-bold flex items-center gap-2">
                <Eye size={20} className="text-blue-400" /> Fullscreen Preview
              </h3>
              {/* Quick template selector in modal */}
              <div className="hidden sm:flex items-center gap-1.5 bg-gray-800 p-1 rounded-lg">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedTemplate === t.id ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleDownloadPDF} 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg text-sm flex items-center gap-1.5 shadow-md"
              >
                <Download size={16} /> Download PDF
              </button>
              <button 
                onClick={() => setIsPreviewMode(false)} 
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg text-sm border border-gray-700"
              >
                Close Preview
              </button>
            </div>
          </div>

          {/* Centered Paper Sheet */}
          <div className="bg-white shadow-2xl w-full max-w-4xl" style={{ minHeight: '1056px' }}>
            {selectedTemplate === 'modern' && renderModernTemplate()}
            {selectedTemplate === 'classic' && renderClassicTemplate()}
            {selectedTemplate === 'minimal' && renderMinimalTemplate()}
            {selectedTemplate === 'executive' && renderExecutiveTemplate()}
            {selectedTemplate === 'creative' && renderCreativeTemplate()}
          </div>
        </div>
      )}

    </div>
  );
};

export default ResumeBuilder;
