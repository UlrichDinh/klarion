import { LoaderIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useGetWorkspaceId } from '@/features/workspaces/hooks/use-get-workspace-id';

import { UpdateTaskForm } from './update-task-form';

import { useGetTask } from '../api/use-get-task';

interface UpdateTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export const UpdateTaskFormWrapper = ({
  onCancel,
  id,
}: UpdateTaskFormWrapperProps) => {
  const workspaceId = useGetWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }

  return (
    <UpdateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      initialValues={initialValues}
    />
  );
};
