'use client';

import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form';
import { useGetWorkspaceId } from '@/features/workspaces/hooks/use-get-workspace-id';

export const WorkspaceIdJoinClient = () => {
  const workspaceId = useGetWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspaceInfo({
    workspaceId,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!initialValues) {
    return null;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};
