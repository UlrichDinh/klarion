import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type ApiError = {
  message?: string;
};

export const useCurrent = () => {
  return useQuery({
    queryKey: ['current'],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        throw new Error(
          errorData.message || 'Failed to fetch current user data'
        );
      }

      const { data } = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
