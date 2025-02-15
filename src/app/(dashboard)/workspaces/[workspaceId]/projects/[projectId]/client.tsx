'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { PageError } from '@/components/page-error';
import { Button } from '@/components/ui/button';

import { useGetProject } from '@/features/projects/api/use-get-project';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useGetProjectId } from '@/features/projects/hooks/use-get-project-id';
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher';

export const ProjectIdClient = () => {
  const projectId = useGetProjectId();
  const { data: project } = useGetProject({
    projectId,
  });

  if (!project) {
    return <PageError message="Project not found." />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
};
