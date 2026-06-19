import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Treatment } from '@/types';

export function useTreatments(patientId?: string) {
  return useQuery<Treatment[]>({
    queryKey: ['treatments', patientId],
    queryFn: async () => {
      const { data } = await api.get<Treatment[]>('/treatments', {
        params: patientId ? { patientId } : undefined,
      });
      return data;
    },
  });
}

export function useCreateTreatment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Treatment, 'id' | 'createdAt' | 'patient'>) => {
      const { data } = await api.post<Treatment>('/treatments', payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['treatments'] }),
  });
}

export function useDeleteTreatment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/treatments/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['treatments'] }),
  });
}
