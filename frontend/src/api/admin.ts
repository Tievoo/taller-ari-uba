import { apiClient } from "./client";

export type TableType = "users" | "courts" | "bookings" | "court-types";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  google_id: string | null;
  created_at: string;
  role: string;
}

export interface Court {
  id: string;
  name: string;
  court_type_id: string;
  image: string | null;
  created_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  court_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface CourtType {
  id: string;
  name: string;
  price: number;
}

const getEndpoint = (tableType: TableType) => {
  const endpoints: Record<TableType, string> = {
    users: "users",
    courts: "courts",
    bookings: "bookings",
    "court-types": "court-types",
  };
  return `/admin/${endpoints[tableType]}`;
};

export const adminApi = {
  getTable: (tableType: TableType) =>
    apiClient.get<any[]>(getEndpoint(tableType)),
  createTable: (tableType: TableType, data: any) =>
    apiClient.post(getEndpoint(tableType), data),
  updateTable: (tableType: TableType, id: string | number, data: any) =>
    apiClient.put(`${getEndpoint(tableType)}/${id}`, data),
  deleteTable: (tableType: TableType, id: string | number) =>
    apiClient.delete(`${getEndpoint(tableType)}/${id}`),
};
