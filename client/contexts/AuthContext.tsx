import React, { createContext, useContext, useState } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  stats?: {
    rank: number;
    totalCorrect: number;
    streak: number;
    accuracy: number;
  };
}

interface AuthContextType {
  user: AuthUser;
  login: (userData: Partial<AuthUser>) => void;
  logout: () => void;
  updateStats: (stats: Partial<AuthUser['stats']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER: AuthUser = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  isLoggedIn: false
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(DEFAULT_USER);

  const login = (userData: Partial<AuthUser>) => {
    const newUser: AuthUser = {
      id: userData.id || `user-${Date.now()}`,
      name: userData.name || userData.email?.split('@')[0] || 'Người Dùng',
      email: userData.email || '',
      avatar: userData.avatar || (userData.name || userData.email?.split('@')[0] || 'ND').substring(0, 2).toUpperCase(),
      isLoggedIn: true,
      stats: userData.stats || {
        rank: Math.floor(Math.random() * 100) + 20,
        totalCorrect: Math.floor(Math.random() * 500) + 50,
        streak: Math.floor(Math.random() * 20) + 1,
        accuracy: Math.floor(Math.random() * 30) + 70
      }
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(DEFAULT_USER);
  };

  const updateStats = (newStats: Partial<AuthUser['stats']>) => {
    if (user.isLoggedIn && user.stats) {
      setUser(prev => ({
        ...prev,
        stats: { ...prev.stats!, ...newStats }
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateStats }}>
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
