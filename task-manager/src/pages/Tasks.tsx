import React, { useState, useMemo } from 'react';
import { Task, Status, Priority } from '../types';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { useDebounce } from '../hooks/useDebounce';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface TasksPageProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onAdd: (task: Omit<Task, 'id'>) => void;
  onUpdate: (id: number, fields: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

export function Tasks({ tasks, isLoading, error, onAdd, onUpdate, onDelete }: TasksPageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           task.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, debouncedSearch, statusFilter]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSave = (taskData: any) => {
    if (editingTask) {
      onUpdate(editingTask.id, taskData);
    } else {
      onAdd(taskData);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-rose-50 p-6 rounded-[2.5rem] text-rose-600 mb-6">
          <AlertCircle size={64} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-slate-500 text-lg mt-1">Manage and track your daily activities with precision.</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
          className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-200 group"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" /> New Task
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks, descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-3xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 lg:flex-none lg:w-64">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full pl-14 pr-10 py-4 rounded-3xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none font-bold text-slate-700"
            >
              <option value="All">All Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <SlidersHorizontal size={16} />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 h-64 animate-pulse">
              <div className="flex justify-between mb-8">
                <div className="w-20 h-8 bg-slate-100 rounded-xl"></div>
                <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
              </div>
              <div className="w-3/4 h-8 bg-slate-100 rounded-xl mb-4"></div>
              <div className="w-full h-4 bg-slate-100 rounded-lg mb-3"></div>
              <div className="w-2/3 h-4 bg-slate-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={handleEdit}
                onStatusChange={(id, status) => onUpdate(id, { status })}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isLoading && filteredTasks.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-300"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No matches found</h3>
          <p className="text-slate-500 font-medium mb-8">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => { setSearch(''); setStatusFilter('All'); }}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-600 transition-all"
          >
            Clear all filters
          </button>
        </motion.div>
      )}

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
