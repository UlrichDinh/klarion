import { createSessionClient } from '@/lib/appwrite';
import { getMember } from '../members/utils';
import { ProjectType } from './types';
import { DATABASE_ID, WORKSPACES_ID } from '@/config';

type GetProjectProps = {
  projectId: string;
};

export const getWorkspace = async ({ projectId }: GetProjectProps) => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const project = await databases.getDocument<ProjectType>(
    DATABASE_ID,
    WORKSPACES_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) {
    throw new Error('Unauthorized');
  }
  return project;
};
