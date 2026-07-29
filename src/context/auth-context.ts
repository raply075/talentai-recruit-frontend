import { createContext } from 'react';
import type { LoginPayload, RegisterPayload, User } from '../types/auth';

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  /** Patches the session user in place (e.g. after a profile/avatar edit). No network call. */
  updateUser: (patch: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
