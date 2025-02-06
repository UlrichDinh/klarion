import { getCurrent } from '@/features/auth/action';
import { SignInCard } from '@/features/auth/components/sign-in-card'
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'; // Add this line

const Signin = async () => {
  const user = await getCurrent();

  if (user) redirect("/");
  return (
    <div>
      <SignInCard />
    </div>
  )
}

export default Signin