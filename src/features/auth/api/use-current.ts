import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch the current authenticated user's data.
 * Uses the react-query library to manage the query state.
 * 
 * @returns {object} The query object containing the current user's data, loading status, and error information.
 */
export const useCurrent = () => {
  const query = useQuery({
    queryKey: ['current'],
    queryFn: async () => {
      // Send a GET request to the client.api.auth.current endpoint
      const response = await client.api.auth.current.$get()

      if (!response.ok) {
        return null
      }

      const { data } = await response.json()
      return data
    }
  });

  return query;
}