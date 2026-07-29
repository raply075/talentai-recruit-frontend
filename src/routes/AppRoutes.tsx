import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FullPageLoader } from '../components/common/Loading';
import ProtectedRoute from './ProtectedRoute';
import RootRoute from './RootRoute';
import { ROUTES } from '../utils/constants';

// Route-level code splitting: each page ships in its own chunk and is
// only fetched when the user navigates to it, instead of bloating the
// initial bundle with every screen in the app.
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Resume = lazy(() => import('../pages/Resume'));
const UploadResume = lazy(() => import('../pages/UploadResume'));
const CoverLetterPage = lazy(() => import('../pages/CoverLetter'));
const InterviewPage = lazy(() => import('../pages/Interview'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/:id"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.UPLOAD}
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.COVER_LETTER}
          element={
            <ProtectedRoute>
              <CoverLetterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.INTERVIEW}
          element={
            <ProtectedRoute>
              <InterviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
