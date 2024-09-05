'use client';
import { Cards } from '@/components/Cards';
import { ChartCard } from '@/components/ChartCard';
import SmallCard from '@/components/SmallCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BlogData } from './blogs/pendingblogs/page';
import { useEffect, useState } from 'react';
const getBlogs = async (): Promise<BlogData[]> => {
  const response = await fetch(
    `https://blog-dashboard-theta-seven.vercel.app/api/blogapi`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const data = await response.json();
  return data;
};
export default function Home() {
  const { data: session, status } = useSession();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const fetchBlogs = async () => {
        setLoading(true);
        try {
          const blogsData = await getBlogs();
          setBlogs(blogsData);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
        setLoading(false);
      };

      fetchBlogs();
    }
  }, [status, router]);
  console.log(blogs);
  const publishedCount = blogs.filter(
    (blog) => blog.status === 'published'
  ).length;
  const draftCount = blogs.filter((blog) => blog.status === 'draft').length;
  const categoryCount = new Map<string, number>();
  blogs.forEach((blog) => {
    blog.category.forEach((cat) => {
      if (categoryCount.has(cat)) {
        categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
      } else {
        categoryCount.set(cat, 1);
      }
    });
  });
  const convertObject = Object.fromEntries(categoryCount);
  console.log(convertObject);
  if (loading) {
    return <div className='loader'></div>;
  }
  return (
    <main className='mx-4'>
      <div
        className='grid sm:grid-cols-4 grid-cols-1 gap-3 '
        data-aos='flip-left'
      >
        <div className='col-span-1'>
          <SmallCard />
        </div>
        <div className='col-span-1'>
          <SmallCard />
        </div>
        <div className='col-span-1'>
          <SmallCard />
        </div>
        <div className='col-span-1'>
          <SmallCard />
        </div>
      </div>
      <div className=' flex flex-col sm:flex-row gap-3 mt-2'>
        <div
          className='h-[400px] sm:w-[70%] w-full hidden sm:block'
          data-aos='zoom-out-down'
        >
          <Cards convertObject={convertObject} />
        </div>
        <div className='h-[400px] sm:w-[30%] w-full'>
          <ChartCard publishedCount={publishedCount} draftCount={draftCount} />
        </div>
      </div>
    </main>
  );
}
