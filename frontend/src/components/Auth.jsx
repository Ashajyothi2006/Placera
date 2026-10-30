import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Briefcase } from 'lucide-react';
import { getDisplayName } from '../utils/userProfile';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set persistent session information
    localStorage.setItem('auth', 'true');
    const cleanEmail = (email || '').trim().toLowerCase();
    if (cleanEmail) {
      localStorage.setItem('user_id', cleanEmail);
      localStorage.setItem('user_email', cleanEmail);
      const friendly = getDisplayName(cleanEmail, name.trim());
      localStorage.setItem('user_name', friendly.displayName);
    } else {
      localStorage.setItem('user_id', 'candidate@placera.ai');
      localStorage.setItem('user_email', 'candidate@placera.ai');
      localStorage.setItem('user_name', 'User');
    }
    onLogin();
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Placera</h1>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-gray-500 mb-8">
            {isLogin 
              ? 'Enter your credentials to access your enterprise dashboard.' 
              : 'Join the platform to accelerate your career placement.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  placeholder="you@company.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={18} />
                </div>
                <input type="password" required className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="••••••••" />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Forgot password? </a>
                </div>
              </div>
            )}

            <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              {isLogin ? 'Sign in' : 'Create Account'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Hero / Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500 blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Enterprise-Grade <br/> Interview Preparation.
          </h2>
          <p className="text-lg text-slate-300 max-w-lg mx-auto">
            Leverage advanced AI to build perfect resumes, conduct realistic technical interviews, and assess candidate readiness with unparalleled accuracy.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-slate-800 bg-opacity-50 border border-slate-700 p-4 rounded-xl backdrop-blur-sm text-left">
              <h4 className="text-white font-semibold mb-1">AI Interviwer</h4>
              <p className="text-slate-400 text-sm">Real-time voice synthesis and contextual reasoning.</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 border border-slate-700 p-4 rounded-xl backdrop-blur-sm text-left">
              <h4 className="text-white font-semibold mb-1">ATS Resume Builder</h4>
              <p className="text-slate-400 text-sm">Templates engineered for high parsability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
