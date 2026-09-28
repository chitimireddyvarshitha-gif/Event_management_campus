import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner label="Authenticating session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner label="Verifying student credentials..." />;
  }

  if (!currentUser || role !== 'student') {
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const FacultyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner label="Verifying faculty authorization..." />;
  }

  if (!currentUser || role !== 'faculty') {
    return <Navigate to="/faculty/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
