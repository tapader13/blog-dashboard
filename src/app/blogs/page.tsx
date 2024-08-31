import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react';

const Blogs = async () => {
  const session = await getSession();
  console.log(session?.user, 'session');
  if (!session?.user) {
    redirect('/login');
  }
  return <div>Blogs</div>;
};

export default Blogs;
