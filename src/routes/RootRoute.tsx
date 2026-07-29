import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FullPageLoader } from '../components/common/Loading';
import Landing from '../pages/Landing';
import { ROUTES } from '../utils/constants';

/**
 * Root route ("/") behavior:
 * - Logged in  -> redirect straight to the dashboard.
 * - Logged out -> show the marketing Landing page (no more forced
 *   redirect to /login).
 */
export default function RootRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullPageLoader label="Loading" />;
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return <Landing />;
}
