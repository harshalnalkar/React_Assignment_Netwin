import React from 'react';
import { Link } from 'react-router-dom';
import { Task, Status, Priority } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock, MoreVertical, Trash2, Edit3, Eye } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: number, status: Status) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit, onStatusChange }) => {
  const priorityColors = {
    Low: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    High: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const statusIcons = {
    Todo: <Circle size={18} className="text-slate-300" />,
    'In Progress': <Clock size={18} className="text-amber-500 animate-pulse" />,
    Completed: <CheckCircle2 size={18} className="text-indigo-600" />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onStatusChange(task.id, task.status === 'Completed' ? 'Todo' : 'Completed')}
            className="hover:scale-125 transition-transform duration-200"
          >
            {statusIcons[task.status]}
          </button>
          <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <Link
            to={`/tasks/${task.id}`}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            title="Edit Task"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className={`text-lg font-bold text-slate-900 mb-2 line-clamp-1 transition-all ${task.status === 'Completed' ? 'line-through text-slate-300' : ''}`}>
        {task.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-indigo-200">
            {task.title.charAt(0).toUpperCase()}
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            ID: #{task.id}
          </span>
        </div>
        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-lg">
          {task.status}
        </div>
      </div>
    </motion.div>
  );
}
