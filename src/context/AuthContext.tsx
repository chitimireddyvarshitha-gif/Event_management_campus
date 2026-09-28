import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_STUDENT, INITIAL_FACULTY } from '../data/sampleData';
import { authService, LoginCredentials, StudentRegisterPayload } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: UserRole, credentials: LoginCredentials) => Promise<boolean>;
  registerStudent: (payload: StudentRegisterPayload) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  quickDemoLogin: (targetRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  // Load user from storage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cems_current_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading stored user', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (targetRole: UserRole, credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      let res;
      if (targetRole === 'student') {
        res = await authService.studentLogin(credentials);
      } else {
        res = await authService.facultyLogin(credentials);
      }

      setCurrentUser(res.user);
      localStorage.setItem('cems_current_user', JSON.stringify(res.user));
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Login failed. Please verify your credentials.', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerStudent = async (payload: StudentRegisterPayload): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await authService.registerStudent(payload);
      setCurrentUser(res.user);
      localStorage.setItem('cems_current_user', JSON.stringify(res.user));
      showToast(`Registration successful! Welcome, ${res.user.name}.`, 'success');
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Registration failed. Please check form fields.', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    showToast('You have been logged out successfully.', 'info');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    localStorage.setItem('cems_current_user', JSON.stringify(updated));
    showToast('Profile information updated successfully.', 'success');
  };

  const quickDemoLogin = (targetRole: UserRole) => {
    const user = targetRole === 'student' ? INITIAL_STUDENT : INITIAL_FACULTY;
    setCurrentUser(user);
    localStorage.setItem('cems_current_user', JSON.stringify(user));
    localStorage.setItem('cems_jwt_token', `demo-jwt-${targetRole}-token`);
    showToast(`Logged in as Demo ${targetRole === 'student' ? 'Student (Varshitha)' : 'Faculty Coordinator'}`, 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || null,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        registerStudent,
        logout,
        updateProfile,
        quickDemoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
