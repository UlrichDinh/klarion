import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/queries';
import { UpdateWorkspaceForm } from '@/features/workspaces/components/update-workspace-form';
import { getWorkspace } from '@/features/workspaces/queries';

interface WorkspaceIdSettingsPageProps {
  params: { workspaceId: string };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();

  if (!user) redirect('/sign-in');

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
