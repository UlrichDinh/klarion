'use client';

import { PageError } from '@/components/page-error';
import { PageLoader } from '@/components/page-loader';

import { useGetProject } from '@/features/projects/api/use-get-project';
import { UpdateProjectForm } from '@/features/projects/components/update-project-form';
import { useGetProjectId } from '@/features/projects/hooks/use-get-project-id';

export const ProjectIdSettingsClient = () => {
  const projectId = useGetProjectId();
  const { data: initialValues, isLoading } = useGetProject({ projectId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="Project not found." />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
};
