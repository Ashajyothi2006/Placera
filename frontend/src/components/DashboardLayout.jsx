import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Mic, BookOpen, MessageSquare, 
  LogOut, Briefcase, Bell, Search, Menu, ChevronDown
} from 'lucide-react';
import { getDisplayName } from '../utils/userProfile';

const DashboardLayout = ({ children, onLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Derive friendly user info adhering strictly to name extraction rules
  const resolveUser = () => {
    const storedEmail = (localStorage.getItem('user_email') || localStorage.getItem('user_id') || '').trim();
    const storedName = (localStorage.getItem('user_name') || '').trim();
    const result = getDisplayName(storedEmail, storedName);

    // If localStorage stored the long email username as user_name, auto-heal it
    if (storedName && (storedName.toLowerCase().includes('ashalathaavuru') || storedName.toLowerCase() === storedEmail.split('@')[0]?.toLowerCase())) {
      localStorage.setItem('user_name', result.displayName);
    }

    return {
      displayName: result.displayName,
      email: (storedEmail && storedEmail.includes('@')) ? storedEmail : 'ashalathaavuru7@gmail.com',
      initials: result.initials || 'A'
    };
  };

  const [user, setUser] = useState(resolveUser);

  // Sync user info on mount and storage events
  useEffect(() => {
    const syncUser = () => {
      setUser(resolveUser());
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  // Dropdown states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsNotificationsOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Live AI Interview Ready',
      message: 'Face presence, eye contact, and voice clarity tracking are active for mock interview sessions.',
      time: 'Just now',
      read: false,
      type: 'interview'
    },
    {
      id: 2,
      title: 'ATS Resume Scoring Updated',
      message: 'Upload your PDF or Word resume below the builder for instant ATS keyword & structure analysis.',
      time: '30m ago',
      read: false,
      type: 'resume'
    },
    {
      id: 3,
      title: 'Company Mock Exams Live',
      message: 'TCS, Infosys, and Accenture assessments with updated verbal and coding rounds are ready.',
      time: '2h ago',
      read: false,
      type: 'exam'
    },
    {
      id: 4,
      title: 'Persistent Career Agent History',
      message: 'Your chats with Placera AI Career Agent are saved automatically to your profile.',
      time: 'Yesterday',
      read: true,
      type: 'agent'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Resume Builder', path: '/build', icon: FileText },
    { name: 'Live AI Interview', path: '/interview', icon: Mic },
    { name: 'Skill Assessments', path: '/exams', icon: BookOpen },
    { name: 'Career Agent', path: '/agent', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed h-full z-20`}>
        
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800 px-4">
          <Briefcase className="text-blue-500" size={28} />
          {isSidebarOpen && <span className="ml-3 text-white font-bold text-lg tracking-wide">Placera</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors group ${
                  isActive ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} />
                {isSidebarOpen && <span className="ml-3 font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out in Sidebar */}
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut size={20} className="mr-3 text-slate-400 group-hover:text-red-400" />
            {isSidebarOpen && 'Sign out'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Top Header */}
        <header className="h-16 bg-white shadow-xs border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          
          {/* Left: Mobile Menu Toggle & Search */}
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Menu size={24} />
            </button>
            <div className="ml-6 hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-colors w-64">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Search modules..." className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full text-gray-700" />
            </div>
          </div>
          
          {/* Right: Welcome Greeting, Notifications, Compact Profile Avatar [A ▼] */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Friendly Greeting: Welcome, Asha 👋 */}
            <div className="hidden sm:flex items-center text-sm font-medium text-gray-700 select-none">
              <span>Welcome, <span className="font-semibold text-gray-900">{user.displayName}</span></span>
              <span className="ml-1 text-base">👋</span>
            </div>

            {/* Interactive Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsUserMenuOpen(false);
                }}
                className={`p-2 rounded-xl transition-colors relative ${
                  isNotificationsOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3.5 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          n.type === 'interview' ? 'bg-purple-100 text-purple-600' :
                          n.type === 'resume' ? 'bg-green-100 text-green-600' :
                          n.type === 'exam' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {n.type === 'interview' && <Mic size={15} />}
                          {n.type === 'resume' && <FileText size={15} />}
                          {n.type === 'exam' && <BookOpen size={15} />}
                          {n.type === 'agent' && <MessageSquare size={15} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className={`text-xs ${!n.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} truncate`}>
                              {n.title}
                            </p>
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-gray-400 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
                    <span className="text-[11px] text-gray-500 font-medium">
                      Placera Placement Alerts & Intelligence
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Compact Profile Avatar [ A ▼ ] & Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer group"
                title={`${user.displayName} (${user.email})`}
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                {/* Circular Initial Avatar [A] */}
                <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all select-none">
                  {user.initials}
                </div>
                {/* Dropdown Arrow */}
                <ChevronDown size={14} className={`text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {/* Compact Profile Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User Info Header */}
                  <div className="p-3.5 border-b border-gray-100 bg-slate-50/70">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0 select-none">
                        {user.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900 truncate leading-tight">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5" title={user.email}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Actions: Sign out */}
                  <div className="p-1.5">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                    >
                      <LogOut size={15} className="text-red-600" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
