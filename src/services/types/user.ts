
export interface SignInForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'USER' | 'ADMIN' | 'ORGANIZER';
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN' | 'ORGANIZER';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isLoggedIn: boolean;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
}