'use client';

import { useGetWorkspaceId } from '@/features/workspaces/hooks/use-get-workspace-id';
import React from 'react';

const WorkspaceId = () => {
  const workspaceId = useGetWorkspaceId();

  return <div>{workspaceId}</div>;
};

export default WorkspaceId;
