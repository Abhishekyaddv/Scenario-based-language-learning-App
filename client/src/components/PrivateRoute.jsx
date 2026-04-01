import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute — requires a valid token.
 * Redirects to /login if not authenticated.
 */
export function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

/**
 * OnboardedRoute — requires a valid token AND completed onboarding.
 * Redirects to /login if not authenticated.
 * Redirects to /onboarding if authenticated but onboarding not done.
 */
export function OnboardedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.isOnboarded) return <Navigate to="/onboarding" replace />;

  return children;
}
