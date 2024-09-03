import Blog from '@/components/Blog';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react';

const AddBlogs = async () => {
  const session = await getSession();
  console.log(session?.user, 'session');
  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div className='px-3 w-full'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>
          Add New <span className='text-blue-500'>Blogs</span>
        </h1>
        <h3 className='text-xl font-bold text-gray-500'>/blogs/addblog</h3>
      </div>
      <div className='mt-10 w-full'>
        <Blog />
      </div>
    </div>
  );
};

export default AddBlogs;
