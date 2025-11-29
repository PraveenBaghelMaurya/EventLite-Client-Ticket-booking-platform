// D:\Custom\MCA\Project\Eventlite\FRONTEND\src\modules\auth\userAuth.ts
import { jwtDecode } from 'jwt-decode';
import type { tokenPayload } from '../../services/types/user';

// FIX: Remove Role parameter and return user data with role
export const userAuthenticate = () => {
  try {
    const token = localStorage.getItem('accessToken');
    
    // FIX: Check if token exists
    if (!token) {
      return { user: null, role: null, isAuthenticated: false };
    }
    
    const userAuth = jwtDecode<tokenPayload>(token);
    
    // FIX: Return user object with role instead of boolean
    return {
      user: userAuth,
      role: userAuth.role,
      isAuthenticated: true
    };
  } catch (error) {
    // FIX: Handle invalid token
    console.error('Token validation error:', error);
    return { user: null, role: null, isAuthenticated: false };
  }
}

// FIX: Add separate function for role checking if needed
export const checkUserRole = (requiredRole: string): boolean => {
  const { role } = userAuthenticate();
  return role === requiredRole;
}