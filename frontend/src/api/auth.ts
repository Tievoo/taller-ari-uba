import { apiClient } from './client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export const authApi = {
  login: (data: LoginData) => 
    apiClient.post('/auth/login', data),
  
  register: (data: RegisterData) => 
    apiClient.post('/auth/register', data),
  
  logout: () => 
    apiClient.post('/auth/logout'),
  
  me: () => 
    apiClient.get<User>('/auth/me'),
};
