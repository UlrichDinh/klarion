import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['current'] }); // trigger a refetch of the current user data
      queryClient.invalidateQueries({ queryKey: ['workspaces'] }); // trigger a refetch of the current user data
    },
    onError: () => {
      toast.error('Failed to log out.');
    },
  });

  return mutation;
};
