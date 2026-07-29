import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FullPageLoader } from '../components/common/Loading';
import { ROUTES } from '../utils/constants';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullPageLoader label="Checking your session" />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return <>{children}</>;
}
