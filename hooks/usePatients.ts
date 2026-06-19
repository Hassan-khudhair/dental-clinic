import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Patient } from '@/types';

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data } = await api.get<Patient[]>('/patients');
      return data;
    },
  });
}

export function usePatient(id: string) {
  return useQuery<Patient>({
    queryKey: ['patients', id],
    queryFn: async () => {
      const { data } = await api.get<Patient>(`/patients/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
