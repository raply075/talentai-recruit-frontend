import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL, TOKEN_STORAGE_KEY, USER_STORAGE_KEY, ROUTES } from '../utils/constants';

/**
 * Every Laravel endpoint responds with this envelope.
 * `unwrap()` below pulls `data` out so the rest of the app never
 * has to think about the wrapper.
 */
export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Shape of a Laravel validation error response (422). */
interface ApiErrorBody {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Set true to skip the global error toast (e.g. login/register forms show their own message). */
    suppressErrorToast?: boolean;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

function extractMessage(body: ApiErrorBody | undefined, fallback: string): string {
  if (!body) return fallback;
  if (body.errors) {
    const firstField = Object.values(body.errors)[0];
    if (firstField?.[0]) return firstField[0];
  }
  return body.message ?? fallback;
}

function clearSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const config = error.config;
    const silent = config?.suppressErrorToast === true;
    const status = error.response?.status;
    const body = error.response?.data;

    if (status === 401) {
      const alreadyOnAuthPage =
        window.location.pathname === ROUTES.LOGIN || window.location.pathname === ROUTES.REGISTER;
      const hadSession = Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
      clearSession();
      if (!silent && hadSession && !alreadyOnAuthPage) {
        toast.error('Your session has expired. Please sign in again.');
      }
      if (!alreadyOnAuthPage) {
        window.location.href = ROUTES.LOGIN;
      }
    } else if (!silent) {
      if (status === 403) {
        toast.error(extractMessage(body, "You don't have permission to do that."));
      } else if (status === 404) {
        toast.error(extractMessage(body, 'The requested resource was not found.'));
      } else if (status === 422) {
        toast.error(extractMessage(body, 'Please check the form and try again.'));
      } else if (status && status >= 500) {
        toast.error(extractMessage(body, 'Something went wrong on our end. Please try again.'));
      } else if (!error.response) {
        toast.error('Network error. Check your connection and try again.');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
