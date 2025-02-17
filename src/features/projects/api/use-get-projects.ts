import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to home page if unauthorized.
          window.location.href = '/';
          // Optionally, you can also throw an error to halt further execution.
          throw new Error('Unauthorized: Redirecting to home page.');
        }
        throw new Error('Failed to fetch projects.');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
