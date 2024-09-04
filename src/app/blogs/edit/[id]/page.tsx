import Blog from '@/components/Blog';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react';
import { BlogData } from '../../pendingblogs/page';

const getBlogs = async (id: string): Promise<BlogData | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogapi/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the blog data');
    }

    const data = await response.json();
    return data.blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

const EditBlogs = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
    return null; // Return null to avoid further rendering after redirect
  }

  const blogs = await getBlogs(params.id);

  if (!blogs) {
    return (
      <div className='px-3 w-full'>
        <p className='text-red-500'>Failed to load blog data.</p>
      </div>
    );
  }

  const { _id, title, slug, description, category, tags, status } = blogs;

  return (
    <div className='px-3 w-full'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>
          Edit <span className='text-blue-500'>{title}</span>
        </h1>
        <h3 className='text-xl font-bold text-gray-500'>/blogs/edit-blog</h3>
      </div>
      <div className='mt-10 w-full'>
        <Blog
          id={_id}
          existingTitle={title}
          existingSlug={slug}
          existingDescription={description}
          existingCategory={category}
          existingTags={tags}
          existingStatus={status}
        />
      </div>
    </div>
  );
};

export default EditBlogs;
