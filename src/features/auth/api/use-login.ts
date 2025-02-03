import { useMutation, } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";


import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {


  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      console.log("Making API request with:", json); // Debugging

      const response = await client.api.auth.login.$post({ json });
      return await response.json();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },


  });

  return mutation;
};