import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';

import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api.history)['bulk-delete']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.history)['bulk-delete']['$post']
>['json'];

export const useBulkDeleteHistory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.history['bulk-delete']['$post']({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('History deleted');
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
    onError: () => {
      toast.error('Failed to delete history');
    },
  });

  return mutation;
};
