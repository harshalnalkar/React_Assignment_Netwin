import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, AlertCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md"
      >
        <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
          <AlertCircle size={40} />
        </div>
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Home size={20} /> Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
