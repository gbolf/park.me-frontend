import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { getResource, postResource, postResourceFormData } from '../common/crud';
import { api } from '@common/api';
import { enqueueSnackbar } from 'notistack';

const AuthContext = createContext<{ loading: boolean; user: User; login: AuthLoginFunction; logout: AuthLogoutFunction; register: AuthRegisterFunction }>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ firstName: '', lastName: '', email: '', role: null, profileImage: '' });

  const setupUser = async () => {
    const { success, user: _user } = await getResource<{ success: boolean; user: User }>(api.me)();
    if (success) {
      setUser((old) => ({ ...old, ..._user, role: 'RENTER' }));
    } else {
      logout();
    }
  };

  const login: AuthLoginFunction = async (values) => {
    const { success } = await postResource<{ success: boolean }>(api.login, values)();
    if (success) {
      setLoading(true);
      localStorage.setItem('isLoggedIn', 'true');
      await setupUser();
    } else {
      enqueueSnackbar('Korisnik nije pronađen', { variant: 'error' });
    }
    setLoading(false);
    return success;
  };

  const register: AuthRegisterFunction = async (values) => {
    let form = new FormData();
    Object.entries(values).forEach(([k, v]) => form.append(k, v));
    const { success } = await postResourceFormData<{ success: boolean }>(api.register, form)();
    enqueueSnackbar(`Registracija ${success ? 'je' : 'nije'} uspješna`, { variant: success ? 'success' : 'error' });
    return success;
  };

  const logout: AuthLogoutFunction = async () => {
    await postResource(api.logout)();
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    document.location.href = '/';
  };

  useLayoutEffect(() => {
    (async () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        await setupUser();
      }
      setLoading(false);
    })();
  }, []);

  return <AuthContext value={{ loading, user, login, logout, register }}>{children}</AuthContext>;
};
