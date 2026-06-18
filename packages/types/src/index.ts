export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  treatment: string;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  status: ReservationStatus;
  createdAt: string;
  patient?: Patient | null;
  patientId?: string | null;
}

export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  age: number | null;
  notes: string | null;
  createdAt: string;
  reservations?: Reservation[];
  treatments?: Treatment[];
}

export interface Treatment {
  id: string;
  patientId: string;
  procedureName: string;
  treatmentDate: string;
  doctorNotes: string | null;
  createdAt: string;
  patient?: Patient;
}

export interface Stats {
  totalReservations: number;
  todayReservations: number;
  pendingReservations: number;
  totalPatients: number;
  completedTreatments: number;
}

export interface Admin {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  admin: Admin;
}

export interface CreateReservationPayload {
  fullName: string;
  phone: string;
  age?: number;
  treatment: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}
