import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'; // Add this line

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      Home
    </div>
  )
}