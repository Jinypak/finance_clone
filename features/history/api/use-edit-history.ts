import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';

import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.history)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.history)[':id']['$patch']
>['json'];

export const useEditHistory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.history[':id']['$patch']({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account Updated');
      queryClient.invalidateQueries({ queryKey: ['filtered_history', { id }] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to update history');
    },
  });

  return mutation;
};
