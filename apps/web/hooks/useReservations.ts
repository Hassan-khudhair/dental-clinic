import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Reservation, ReservationStatus } from '@clinic/types';

export function useReservations(status?: string) {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', status],
    queryFn: async () => {
      const { data } = await api.get<Reservation[]>('/reservations', {
        params: status ? { status } : undefined,
      });
      return data;
    },
  });
}

export function useUpdateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ReservationStatus }) => {
      const { data } = await api.patch<Reservation>(`/reservations/${id}`, { status });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reservations'] }),
  });
}

export function useDeleteReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/reservations/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reservations'] });
      qc.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}
