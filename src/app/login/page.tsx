import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/getSession';
import React from 'react';
import { redirect } from 'next/navigation';
const Login = async () => {
  const session = await getSession();
  if (session?.user) {
    redirect('/');
  }
  return (
    <div className='flex items-center justify-center'>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        {' '}
        <Button>Sign in with Google</Button>
      </form>
    </div>
  );
};

export default Login;
