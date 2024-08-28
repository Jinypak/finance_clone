import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useGetHistory = () => {
  const query = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await client.api.history.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch History');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
