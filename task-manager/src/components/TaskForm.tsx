import React, { useState, useEffect } from 'react';
import { Task, Status, Priority } from '../types';
import { X } from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

interface TaskFormProps {
  task?: Task | null;
  onSave: (task: Omit<Task, 'id'> | Task) => void;
  onClose: () => void;
}

export function TaskForm({ task, onSave, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<Status>(task?.status || 'Todo');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      status,
      priority,
      ...(task?.id ? { id: task.id } : {}),
    };

    onSave(taskData as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200/60"
      >
        <div className="flex justify-between items-center px-10 py-8 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {task ? 'Edit Task' : 'Create Task'}
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
              {task ? `Task ID: #${task.id}` : 'Add to your workflow'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-200/50 rounded-2xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Task Title</label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg font-medium"
              placeholder="e.g. Design new landing page"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[120px] text-lg"
              placeholder="Add more context about this task..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-2 bg-slate-900 text-white py-4 px-8 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
