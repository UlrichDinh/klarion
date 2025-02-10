'use client';

import { useGetWorkspaceId } from '@/features/workspaces/api/use-get-workspace-id';
import React from 'react';

const WorkspaceId = () => {
  const workspaceId = useGetWorkspaceId();

  return <div>{workspaceId}</div>;
};

export default WorkspaceId;
