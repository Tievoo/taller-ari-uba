import { apiClient } from './client';

export interface CreateBookingRequest {
  court_id: string;
  booking_date: string;
  start_time: string;
}

export interface Booking {
  id: number;
  user_id: number;
  court_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  created_at: Date;
}

export const bookingsApi = {
  create: (data: CreateBookingRequest) => 
    apiClient.post<Booking>('/bookings', data),
  
  getAll: () => 
    apiClient.get<Booking[]>('/bookings'),
};
