import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Clock,
  FileText,
  Mic,
  Target,
  TrendingUp,
  Award,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  Edit3
} from 'lucide-react';
import { getDisplayName } from '../utils/userProfile';

const Home = () => {
  const navigate = useNavigate();

  // User identity derivation
  const resolveUser = () => {
    const storedEmail = (localStorage.getItem('user_email') || localStorage.getItem('user_id') || '').trim();
    const storedName = (localStorage.getItem('user_name') || '').trim();
    const result = getDisplayName(storedEmail, storedName);

    return {
      displayName: result.displayName,
      email: (storedEmail && storedEmail.includes('@')) ? storedEmail : 'ashalathaavuru7@gmail.com',
      initials: result.initials || 'A'
    };
  };

  const [user, setUser] = useState(resolveUser);
  const [userRole, setUserRole] = useState(() => localStorage.getItem('user_target_role') || '');
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [roleInput, setRoleInput] = useState('');

  // Dashboard Stats State
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    resumesCreated: 0,
    interviewsCompleted: 0,
    assessmentsPassed: 0,
    placementScore: null,
    placementReadiness: null
  });
  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch real statistics from database for authenticated user
  const fetchDashboardData = async () => {
    const currentUserId = (localStorage.getItem('user_id') || localStorage.getItem('user_email') || 'ashalathaavuru7@gmail.com').trim().toLowerCase();
    try {
      setLoading(true);
      const res = await api.get('/dashboard/stats', {
        headers: {
          'x-user-id': currentUserId
        }
      });

      if (res.data?.success) {
        if (res.data.stats) {
          setStats(res.data.stats);
        }
        if (Array.isArray(res.data.recentActivities)) {
          setRecentActivities(res.data.recentActivities);
        }
        if (res.data.user?.targetRole) {
          setUserRole(res.data.user.targetRole);
          localStorage.setItem('user_target_role', res.data.user.targetRole);
        }
      }
    } catch (err) {
      console.warn('Could not fetch dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(resolveUser());
    fetchDashboardData();

    const handleStorage = () => {
      setUser(resolveUser());
      const storedRole = localStorage.getItem('user_target_role');
      if (storedRole !== null) setUserRole(storedRole);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSaveRole = async (e) => {
    e.preventDefault();
    const newRole = roleInput.trim();
    setUserRole(newRole);
    localStorage.setItem('user_target_role', newRole);
    setIsEditingRole(false);

    try {
      const currentUserId = (localStorage.getItem('user_id') || localStorage.getItem('user_email') || 'ashalathaavuru7@gmail.com').trim().toLowerCase();
      await api.post('/user/profile', {
        targetRole: newRole
      }, {
        headers: {
          'x-user-id': currentUserId
        }
      });
    } catch (e) {
      console.warn('Could not update profile target role:', e);
    }
  };

  // Helper for relative time
  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffSecs = Math.floor((now - date) / 1000);
      if (diffSecs < 60) return 'Just now';
      const diffMins = Math.floor(diffSecs / 60);
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'Recent';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'resume':
        return {
          icon: FileText,
          bg: 'bg-blue-100',
          color: 'text-blue-600',
          border: 'border-blue-500'
        };
      case 'interview':
        return {
          icon: Mic,
          bg: 'bg-green-100',
          color: 'text-green-600',
          border: 'border-green-500'
        };
      case 'assessment':
        return {
          icon: Award,
          bg: 'bg-purple-100',
          color: 'text-purple-600',
          border: 'border-purple-500'
        };
      case 'agent':
      default:
        return {
          icon: Target,
          bg: 'bg-indigo-100',
          color: 'text-indigo-600',
          border: 'border-indigo-500'
        };
    }
  };

  const modules = [
    {
      title: 'Resume Builder',
      desc: 'Craft ATS-optimized resumes with 5 executive templates and instant PDF generation.',
      path: '/build',
      icon: FileText,
      color: 'bg-blue-600',
      badge: 'Updated'
    },
    {
      title: 'Live AI Interview',
      desc: 'Practice technical interviews with real-time AI voice synthesis, STT, and webcam.',
      path: '/interview',
      icon: Mic,
      color: 'bg-green-600',
      badge: 'Interactive'
    },
    {
      title: 'Skill Assessments',
      desc: 'Take company-specific placement exams and evaluate your problem-solving speed.',
      path: '/exams',
      icon: BookOpen,
      color: 'bg-purple-600',
      badge: 'MCQ & Code'
    },
    {
      title: 'AI Career Agent',
      desc: 'Chat with your dedicated AI career coach for personalized interview advice.',
      path: '/agent',
      icon: MessageSquare,
      color: 'bg-indigo-600',
      badge: '24/7 Coach'
    }
  ];

  return (
    <div className="min-h-full flex flex-col py-6 px-4 max-w-7xl mx-auto space-y-8">

      {/* 1. User Profile & Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="relative mt-8 h-24 w-24 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center shadow-md text-white font-extrabold text-3xl select-none">
            {user.initials || 'A'}
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">{user.displayName}</h2>

          {/* Target Job Role with subtle edit capability */}
          <div className="mt-1 mb-4 flex items-center justify-center">
            {isEditingRole ? (
              <form onSubmit={handleSaveRole} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  placeholder="e.g. Software Developer"
                  className="text-xs px-2.5 py-1 border border-blue-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                  autoFocus
                />
                <button type="submit" className="text-xs px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                  Save
                </button>
                <button type="button" onClick={() => setIsEditingRole(false)} className="text-xs px-1 text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </form>
            ) : (
              <div
                className="flex items-center gap-1.5 cursor-pointer group"
                onClick={() => { setRoleInput(userRole || ''); setIsEditingRole(true); }}
                title="Click to set or change your target role"
              >
                <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                  {userRole.trim() ? userRole.trim() : 'Target role not set'}
                </p>
                <Edit3 size={13} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: loading ? '0%' : (stats.placementReadiness != null ? `${stats.placementReadiness}%` : '0%') }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Placement Readiness: {loading ? '—' : (stats.placementReadiness != null ? `${stats.placementReadiness}%` : 'Not available yet')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <FileText size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Resumes Created</p>
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '—' : stats.resumesCreated}</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-green-50 text-green-600 rounded-xl">
              <Mic size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Interviews Completed</p>
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '—' : stats.interviewsCompleted}</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
              <Award size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Assessments Passed</p>
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '—' : stats.assessmentsPassed}</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Placement Score</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {loading ? '—' : (stats.placementScore != null ? `${stats.placementScore}%` : 'Not available yet')}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Platform Modules Quick Access */}
      <div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900">Placement Prep Modules</h3>
          <p className="text-sm text-gray-500">Access your preparation suite and practice with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                onClick={() => navigate(m.path)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl text-white ${m.color} shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {m.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    {m.desc}
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Launch Module <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Recent Activities Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-blue-600" /> Recent Activities
        </h3>
        {loading ? (
          <div className="py-8 text-center text-gray-400 text-sm">
            Loading activities...
          </div>
        ) : recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((act, index) => {
              const meta = getActivityIcon(act.type);
              const Icon = meta.icon;
              return (
                <div key={index} className={`flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-l-4 ${meta.border}`}>
                  <div className={`${meta.bg} p-2 rounded-full ${meta.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{act.title}</p>
                    <p className="text-xs text-gray-500">{act.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                    {formatRelativeTime(act.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex p-3 bg-gray-50 text-gray-400 rounded-full mb-3">
              <Clock size={24} />
            </div>
            <p className="text-sm font-semibold text-gray-700">No recent activities yet</p>
            <p className="text-xs text-gray-400 mt-1">Start by building a resume, taking a skill exam, or practicing a live AI interview.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
