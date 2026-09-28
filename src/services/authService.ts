import apiClient from './api';
import { User } from '../types';

/**
 * =========================================================================
 * AUTHENTICATION SERVICE (Spring Boot Ready)
 * =========================================================================
 * Corresponding Spring Boot Controllers:
 * - @RestController @RequestMapping("/api/auth")
 *   - @PostMapping("/student/login") -> AuthResponse(jwt, studentUser)
 *   - @PostMapping("/faculty/login") -> AuthResponse(jwt, facultyUser)
 *   - @PostMapping("/student/register") -> AuthResponse(jwt, studentUser)
 *   - @GetMapping("/me") -> User
 *   - @PutMapping("/profile") -> User
 * =========================================================================
 */

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface StudentRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export const authService = {
  // Student Login
  async studentLogin(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.post('/auth/student/login', credentials);
    // localStorage.setItem('cems_jwt_token', response.data.token);
    // return response.data;

    // Simulation for frontend-only mode:
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyToken = 'spring-boot-jwt-token-student-' + Date.now();
        localStorage.setItem('cems_jwt_token', dummyToken);
        resolve({
          user: {
            id: 'std_01',
            name: credentials.email.includes('varshitha') ? 'Varshitha Chitimireddy' : 'Student Scholar',
            email: credentials.email,
            role: 'student',
            phone: '+1 (555) 234-8901',
            department: 'Computer Science & Engineering',
            year: '3rd Year (Junior)',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
          },
          token: dummyToken,
        });
      }, 400);
    });
  },

  // Faculty Login
  async facultyLogin(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.post('/auth/faculty/login', credentials);
    // localStorage.setItem('cems_jwt_token', response.data.token);
    // return response.data;

    // Simulation for frontend-only mode:
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyToken = 'spring-boot-jwt-token-faculty-' + Date.now();
        localStorage.setItem('cems_jwt_token', dummyToken);
        resolve({
          user: {
            id: 'fac_01',
            name: credentials.email.includes('vance') ? 'Dr. Robert Vance' : 'Faculty Coordinator',
            email: credentials.email,
            role: 'faculty',
            phone: '+1 (555) 472-9102',
            department: 'School of Computing & Engineering',
            designation: 'Associate Dean of Student Activities & Event Coordinator',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
          },
          token: dummyToken,
        });
      }, 400);
    });
  },

  // Student Registration
  async registerStudent(payload: StudentRegisterPayload): Promise<{ user: User; token: string }> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.post('/auth/student/register', payload);
    // localStorage.setItem('cems_jwt_token', response.data.token);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyToken = 'spring-boot-jwt-token-registered-' + Date.now();
        localStorage.setItem('cems_jwt_token', dummyToken);
        resolve({
          user: {
            id: 'std_' + Math.floor(Math.random() * 1000),
            name: payload.name,
            email: payload.email,
            role: 'student',
            phone: payload.phone,
            department: 'Information Science & Engineering',
            year: '1st Year (Freshman)',
          },
          token: dummyToken,
        });
      }, 500);
    });
  },

  // Logout
  logout(): void {
    localStorage.removeItem('cems_jwt_token');
    localStorage.removeItem('cems_current_user');
  }
};
