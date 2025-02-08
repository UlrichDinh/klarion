import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
  const params = useParams();
  const workspaceId = params.workspaceId;

  return Array.isArray(workspaceId) ? workspaceId[0] : workspaceId;
};
