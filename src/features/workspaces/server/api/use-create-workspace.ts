import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to create workspace");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace created successfully");
      // Trigger a refetch of workspaces data
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error: Error) => {
      console.log(error, 'error');

      toast.error(error.message || "Failed to create workspace");
    },
  });

  return mutation;
};
