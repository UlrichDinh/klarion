import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";


export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to create workspace");
      }
      const { data } = await response.json();

      return data;
    },
  });
};
