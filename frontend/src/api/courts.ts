import { apiClient } from './client';

export interface Court {
  id: string;
  name: string;
  court_type_id: string;
  court_type_name?: string;
  price?: number;
  image?: string;
  created_at?: string;
}

export interface CourtType {
  id: string;
  name: string;
  price: number;
}

export const courtsApi = {
  getAll: (type?: string) => 
    apiClient.get<Court[]>('/courts', { params: type ? { type } : {} }),
  
  getById: (id: string) => 
    apiClient.get<Court>(`/courts/${id}`),
};
