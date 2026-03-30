import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ListTodo, LogOut, User as UserIcon } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'Tasks', icon: ListTodo },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-10">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                    <ListTodo size={18} />
                  </div>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">TaskFlow</span>
                </Link>
                <nav className="hidden md:flex gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 bg-slate-100/80 px-4 py-1.5 rounded-2xl border border-slate-200/50">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      <main className={`flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 ${isAuthenticated ? 'pt-24 pb-12' : 'py-0'}`}>
        {children}
      </main>
      {isAuthenticated && (
        <footer className="bg-white border-t border-slate-200/60 py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-[10px]">TF</div>
              TaskFlow Manager
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Help</a>
            </div>
            <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
          </div>
        </footer>
      )}
    </div>
  );
}
