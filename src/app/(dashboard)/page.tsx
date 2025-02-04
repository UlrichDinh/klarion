import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");


  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}