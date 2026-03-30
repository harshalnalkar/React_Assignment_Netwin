import { useState, useEffect, useCallback } from 'react';
import { Task, Status, Priority } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      
      // Map API response to our task model
      const mappedTasks: Task[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: 'No description provided.',
        status: item.completed ? 'Completed' : 'Todo',
        priority: (['Low', 'Medium', 'High'] as Priority[])[Math.floor(Math.random() * 3)],
      }));
      
      setTasks(mappedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now() };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: number, updatedFields: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, isLoading, error, addTask, updateTask, deleteTask, refreshTasks: fetchTasks };
}
