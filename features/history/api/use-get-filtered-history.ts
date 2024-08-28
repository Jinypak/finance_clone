import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useGetFilteredHistory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['filtered_history', { id }],
    queryFn: async () => {
      const response = await client.api.history[':id'].$get({ param: { id } });

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
