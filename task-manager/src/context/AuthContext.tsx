import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('taskflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0] || 'User',
      email: email,
    };
    
    setUser(mockUser);
    localStorage.setItem('taskflow_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
