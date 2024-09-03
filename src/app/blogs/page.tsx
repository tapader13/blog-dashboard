import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
const invoices = [
  {
    number: 'INV001',
    title: 'Paid',
    slug: '$250.00',
  },
  {
    number: 'INV002',
    title: 'Pending',
    slug: '$150.00',
  },
  {
    number: 'INV003',
    title: 'Unpaid',
    slug: '$350.00',
  },
  {
    number: 'INV004',
    title: 'Paid',
    slug: '$450.00',
  },
  {
    number: 'INV005',
    title: 'Paid',
    slug: '$550.00',
  },
  {
    number: 'INV006',
    title: 'Pending',
    slug: '$200.00',
  },
  {
    number: 'INV007',
    title: 'Unpaid',
    slug: '$300.00',
  },
];

const Blogs = async () => {
  const session = await getSession();
  console.log(session?.user, 'session');
  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div className='px-3 w-full'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>
          All Published <span className='text-blue-500'>Blogs</span>
        </h1>
        <h3 className='text-xl font-bold text-gray-500'>/blogs</h3>
      </div>
      <div className='mt-10 w-full'>
        <Table className='w-full mx-auto '>
          <TableCaption className=' '>A list of published blogs.</TableCaption>
          <TableHeader className='w-full '>
            <TableRow className='  w-full '>
              <TableHead className='w-1/6   '>Number</TableHead>
              <TableHead className='w-2/6  '>Title</TableHead>
              <TableHead className='w-2/6  '>Slug</TableHead>
              <TableHead className='w-1/6  '>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='w-full'>
            {invoices.map((invoice) => (
              <TableRow key={invoice.number} className=' w-full'>
                <TableCell className='font-medium w-1/6  '>
                  {invoice.number}
                </TableCell>
                <TableCell className=' w-2/6 '>{invoice.title}</TableCell>
                <TableCell className=' w-2/6 '>{invoice.slug}</TableCell>
                <TableCell className=' w-1/6 '>
                  <div className='flex gap-2 items-center'>
                    <Link href={`/blogs/edit/${invoice.slug}`}>
                      {' '}
                      <Button className='rounded-full'>Edit</Button>
                    </Link>
                    <Link href={`/blogs/delete/${invoice.slug}`}>
                      <Button className='rounded-full'>Delete</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className='w-full'>
              <TableCell colSpan={3} className=' '>
                Total
              </TableCell>
              <TableCell className='text-right  '>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Blogs;
