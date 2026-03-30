import { useParams, useNavigate, Link } from 'react-router-dom';
import { Task } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, Tag, AlertCircle, Edit3, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TaskDetailPageProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export function TaskDetail({ tasks, onDelete }: TaskDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-rose-50 p-8 rounded-[2.5rem] text-rose-600 mb-8">
          <AlertCircle size={64} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Task Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">The task you're looking for doesn't exist or has been moved to another project.</p>
        <Link 
          to="/tasks"
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
        >
          Back to Tasks
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    // Using a simple confirm for now, but in a real app we'd use a custom modal
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      navigate('/tasks');
    }
  };

  const priorityColors = {
    Low: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    High: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-10"
    >
      <header className="flex items-center justify-between">
        <Link 
          to="/tasks" 
          className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-200/60 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-bold">Back to Tasks</span>
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-transparent hover:border-rose-100"
            title="Delete Task"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-2xl shadow-indigo-500/5 overflow-hidden">
        <div className="p-10 sm:p-16 space-y-12">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl border uppercase tracking-widest ${priorityColors[task.priority]}`}>
                {task.priority} Priority
              </span>
              <span className="text-[10px] font-black px-4 py-1.5 rounded-xl border bg-slate-50 text-slate-500 border-slate-200 uppercase tracking-widest">
                {task.status}
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {task.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-y border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Created At</p>
                <p className="text-lg font-bold text-slate-700">March 27, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Tag size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Task Identifier</p>
                <p className="text-lg font-bold text-slate-700">#{task.id}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-600 rounded-full" />
              Description
            </h2>
            <div className="text-lg text-slate-500 leading-relaxed max-w-3xl">
              {task.description || 'No detailed description provided for this task. Please update the task details to include more context.'}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50/80 px-10 py-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 border-4 border-white flex items-center justify-center font-black text-white text-xl shadow-xl shadow-indigo-200">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{user?.name || 'Current User'}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned Owner</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/tasks')}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
            >
              Complete Task
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
