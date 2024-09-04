import Link from 'next/link';
import React from 'react';
import {
  RiHomeLine,
  RiFileListLine,
  RiAddLine,
  RiTimeLine,
} from 'react-icons/ri';
import { Button } from './ui/button';
import { signOut } from '@/auth';

const navvar = [
  {
    name: 'Dashboard',
    icon: RiHomeLine,
    path: '/',
  },
  {
    name: 'Blogs',
    icon: RiFileListLine,
    path: '/blogs',
  },
  {
    name: 'AddBlog',
    icon: RiAddLine,
    path: '/blogs/addblog',
  },
  {
    name: 'Pending',
    icon: RiTimeLine,
    path: '/blogs/pendingblogs',
  },
];

const Navvar = () => {
  return (
    <div className='flex flex-col gap-4 mt-5'>
      {navvar.map((item) => (
        <Link
          href={item.path}
          key={item.name}
          className='flex items-center gap-2'
        >
          <item.icon className='text-xl' />
          <span className='hidden lg:block'>{item.name}</span>
        </Link>
      ))}
      <form
        action={async () => {
          'use server';
          await signOut({ callbackUrl: '/login' });
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </div>
  );
};

export default Navvar;
