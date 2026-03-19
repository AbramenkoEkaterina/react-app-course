import { useState, type ReactNode } from 'react';
import type { AuthContextType } from '../types/auth';
import { AuthContext } from '../auth/AuthProvider';
import { AUTH_STORAGE } from '../constants';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const stored = localStorage.getItem(AUTH_STORAGE);
  const isLogin = stored ? JSON.parse(stored) : false;
  const [isAuth, setIsAuth] = useState(isLogin);

  const value: AuthContextType = {
    isAuth,
    setIsAuth,
  };
  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};
