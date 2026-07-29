import { useCallback, useEffect, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { AuthContext } from './auth-context';
import { USER_STORAGE_KEY } from '../utils/constants';
import type { LoginPayload, RegisterPayload, User } from '../types/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      if (!authService.isAuthenticated()) {
        setIsLoading(false);
        return;
      }
      try {
        const current = await authService.getCurrentUser();
        if (!cancelled) setUser(current);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const loggedInUser = await authService.login(payload);
    setUser(loggedInUser);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const newUser = await authService.register(payload);
    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    toast.success('Signed out');
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: Boolean(user), login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
