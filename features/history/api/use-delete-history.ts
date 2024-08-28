import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';

import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.history)[':id']['$delete']
>;

export const useDeleteHistory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.history[':id']['$delete']({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('History Delete');
      queryClient.invalidateQueries({ queryKey: ['filtered_history', { id }] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to Delete history');
    },
  });

  return mutation;
};
