import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { postResource } from '../common/crud';

const AuthContext = createContext<{ loading: boolean; user: User; login: any; logout: any }>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ name: '', email: '', role: null });

  const login = (values: { email: string; passowrd: string }) => {
    //postResource('login', values)();
    setUser({ name: 'Noah', email: 'nono@nono.nono', role: 'RENTER' });
    localStorage.setItem('user', JSON.stringify({ name: 'Noah', email: 'nono@nono.nono', role: 'RENTER' }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    document.location.href = '/';
  };

  useLayoutEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    setLoading(false);
  }, []);

  return <AuthContext value={{ loading, user, login, logout }}>{children}</AuthContext>;
};
