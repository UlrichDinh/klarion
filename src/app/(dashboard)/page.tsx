import { getCurrent } from "@/features/auth/action";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'; // Add this line

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <CreateWorkspaceForm />
    </div>
  )
}