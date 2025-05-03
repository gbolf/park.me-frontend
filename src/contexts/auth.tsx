import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { postResource } from '../common/crud';

const AuthContext = createContext<{ loading: boolean; user: User; login: AuthLoginFunction; logout: AuthLogoutFunction; register: AuthRegisterFunction }>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ name: '', email: '', role: null, profileImage: '' });

  const login: AuthLoginFunction = async (values) => {
    const success = (await postResource<{ message: string }>('login', values)()).message === 'Logged in successfully';
    if (success) {
      setUser({ name: 'Noah', email: 'nono@nono.nono', role: 'RENTER', profileImage: 'https://duckduckgo.com/i/a26d27a6515eead7.png' });
      localStorage.setItem('isLoggedIn', 'true');
    }
    return success;
  };

  const register: AuthRegisterFunction = async (values) => (await postResource<{ success: boolean }>('register', values)()).success;

  const logout: AuthLogoutFunction = () => {
    setUser(null);
    localStorage.removeItem('user');
    document.location.href = '/';
  };

  useLayoutEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setUser({ name: 'Noah', email: 'nono@nono.nono', role: 'RENTER', profileImage: 'https://duckduckgo.com/i/a26d27a6515eead7.png' });
    }
    setLoading(false);
  }, []);

  return <AuthContext value={{ loading, user, login, logout, register }}>{children}</AuthContext>;
};
