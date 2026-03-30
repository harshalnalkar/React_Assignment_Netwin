/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { TaskDetail } from './pages/TaskDetail';
import { NotFound } from './pages/NotFound';
import { useTasks } from './hooks/useTasks';

function AppContent() {
  const { tasks, isLoading, error, addTask, updateTask, deleteTask } = useTasks();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard tasks={tasks} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks
                tasks={tasks}
                isLoading={isLoading}
                error={error}
                onAdd={addTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetail tasks={tasks} onDelete={deleteTask} />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
