
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });
      return await response.json();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
    onSuccess: (data) => {
      router.refresh()
      // trigger a refetch of the current user data
      queryClient.invalidateQueries({ queryKey: ["current"] });

      console.log("Login successful:", data);
    },
  });

  return mutation;
};