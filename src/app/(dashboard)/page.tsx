import { getCurrent } from "@/features/auth/action";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";
import DashboardLayout from "./layout";

export default async function Home() {
  const user = await getCurrent();
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="flex gap-4">
      <DashboardLayout>
        <UserButton />
      </DashboardLayout>
    </div>
  );
}
