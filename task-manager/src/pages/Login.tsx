import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, ListTodo } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-stretch overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24 bg-white z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-6">
              <ListTodo size={28} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-500 text-lg">Sign in to your TaskFlow account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-sm border border-rose-100 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                {error}
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              Sign In <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Demo Credentials</p>
              <p className="text-sm text-slate-600">Use any email and password to explore the dashboard.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-rose-600/10" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-600/10 blur-[120px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 p-12 text-center max-w-lg"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
            Productivity Reimagined
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Organize your work, <span className="text-indigo-400">effortlessly.</span>
          </h2>
          <p className="text-slate-400 text-xl leading-relaxed">
            The modern task manager designed for teams who value speed, clarity, and beautiful design.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 rotate-12"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10"
        />
      </div>
    </div>
  );
}
