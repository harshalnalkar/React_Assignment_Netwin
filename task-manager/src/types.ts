export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Todo' | 'In Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
