import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode | ((user: any, profile: any) => ReactNode);
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Redirecionar para login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && profile?.role !== 'admin') {
    // Redirecionar para dashboard se não for admin
    return <Navigate to="/dashboard" replace />;
  }

  // Check if children is a function and call it with user and profile
  if (typeof children === 'function') {
    return <>{children(user, profile)}</>;
  }

  // Otherwise, just render the children as normal
  return <>{children}</>;
};

export default ProtectedRoute;
