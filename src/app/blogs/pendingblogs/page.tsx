'use client';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export interface BlogData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string[];
  tags: string[];
  status: string;
}

const getBlogs = async (): Promise<BlogData[]> => {
  const response = await fetch(`${process.env.NEXT_URL}/api/blogapi`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const data = await response.json();
  return data;
};

const PendingBlogs = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(2);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const fetchBlogs = async () => {
        try {
          const blogsData = await getBlogs();
          setBlogs(blogsData.filter((blog) => blog.status === 'draft'));
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

      fetchBlogs();
    }
  }, [status, router]);
  console.log(blogs, 'blog');
  return (
    <div className='px-3 w-full'>
      {session && (
        <>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>
              All Draft <span className='text-blue-500'>Blogs</span>
            </h1>
            <h3 className='text-xl font-bold text-gray-500'>
              /blogs/pendin-blogs
            </h3>
          </div>
          <div className='mt-10 w-full'>
            <Table className='w-full mx-auto'>
              {/* <TableCaption>A list of published blogs.</TableCaption> */}
              <TableHeader className='w-full'>
                <TableRow className='w-full'>
                  <TableHead className='w-1/6'>Number</TableHead>
                  <TableHead className='w-2/6'>Title</TableHead>
                  <TableHead className='w-2/6'>Slug</TableHead>
                  <TableHead className='w-1/6'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='w-full'>
                {currentBlogs &&
                  currentBlogs.map((blog) => (
                    <TableRow key={blog._id} className='w-full'>
                      <TableCell className='font-medium w-1/6'>
                        {blog._id}
                      </TableCell>
                      <TableCell className='w-2/6'>{blog.title}</TableCell>
                      <TableCell className='w-2/6'>{blog.slug}</TableCell>
                      <TableCell className='w-1/6'>
                        <div className='flex gap-2 items-center'>
                          <Link href={`/blogs/edit/${blog.slug}`}>
                            <Button className='rounded-full'>Edit</Button>
                          </Link>
                          <Link href={`/blogs/delete/${blog.slug}`}>
                            <Button className='rounded-full'>Delete</Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow className='w-full'>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className='text-right'>$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className='mt-10'>
            <div>
              {blogs.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  blogsPerPage={blogsPerPage}
                  totalBlogs={blogs.length}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingBlogs;
