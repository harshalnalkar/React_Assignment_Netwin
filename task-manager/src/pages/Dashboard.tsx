import { useAuth } from '../context/AuthContext';
import { Task } from '../types';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardPageProps {
  tasks: Task[];
}

export function Dashboard({ tasks }: DashboardPageProps) {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: ListTodo,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      trend: '+12% from last week',
    },
    {
      label: 'In Progress',
      value: tasks.filter((t) => t.status === 'In Progress').length,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      trend: '4 active now',
    },
    {
      label: 'Completed',
      value: tasks.filter((t) => t.status === 'Completed').length,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      trend: '85% success rate',
    },
    {
      label: 'High Priority',
      value: tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length,
      icon: AlertCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      trend: 'Needs attention',
    },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            System Online
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 text-lg mt-1">You have {tasks.filter(t => t.status !== 'Completed').length} tasks to focus on today.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/tasks" 
            className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
          >
            Manage Tasks <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.trend}</div>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bento Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section - High Priority */}
        <section className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertCircle size={24} />
              </div>
              Critical Focus
            </h2>
            <Link to="/tasks" className="text-sm font-bold text-indigo-600 hover:underline">View all</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks
              .filter((t) => t.priority === 'High' && t.status !== 'Completed')
              .slice(0, 4)
              .map((task, idx) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (idx * 0.05) }}
                  className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 uppercase tracking-widest">
                      High
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {task.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{task.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{task.description}</p>
                </motion.div>
              ))}
            {tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length === 0 && (
              <div className="col-span-2 py-12 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium italic">No critical tasks at the moment. Great job!</p>
              </div>
            )}
          </div>
        </section>

        {/* Side Section - Activity/Completed */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              Recent Wins
            </h2>
          </div>
          
          <div className="space-y-4">
            {tasks
              .filter((t) => t.status === 'Completed')
              .slice(0, 6)
              .map((task, idx) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.05) }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate text-slate-200">{task.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Completed</p>
                  </div>
                </motion.div>
              ))}
            {tasks.filter((t) => t.status === 'Completed').length === 0 && (
              <p className="text-sm text-slate-500 italic py-12 text-center">Your completed tasks will appear here.</p>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">Productivity Score</p>
            <div className="text-4xl font-black text-indigo-400">84%</div>
            <p className="text-[10px] text-slate-500 mt-2">Keep it up! You're in the top 5%.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
