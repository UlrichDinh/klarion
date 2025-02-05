import { useMutation, } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json });

      if (!response.ok) {
        // Assert the expected error shape
        const errorData = (await response.json()) as { success: boolean; message?: string };
        throw new Error(errorData.message || "Registration failed");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Registered successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};