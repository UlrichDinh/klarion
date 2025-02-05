import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface ApiError {
  message?: string;
}

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();
      const json = await response.json();

      if (!response.ok) {
        throw new Error((json as ApiError).message || "Failed to fetch workspaces");
      }

      const { data } = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
