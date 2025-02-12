'use client';

import { PageError } from '@/components/page-error';
import { PageLoader } from '@/components/page-loader';

import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form';
import { useGetWorkspaceId } from '@/features/workspaces/hooks/use-get-workspace-id';

export const WorkspaceIdJoinClient = () => {
  const workspaceId = useGetWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspaceInfo({
    workspaceId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="Workspace not found." />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};
