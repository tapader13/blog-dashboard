import { getSession } from '@/lib/getSession';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const Header = async () => {
  const session = await getSession();
  // if (!session?.user) {
  //   redirect('/login');
  // }

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <input
          type='text'
          placeholder='Search...'
          className='md:w-[200px] w-[150px] p-2 bg-transparent outline-none'
        />
      </div>
      <div className='flex items-center gap-1'>
        <div className='w-10 h-10 rounded-full overflow-hidden flex items-center justify-center'>
          <Image
            src={session?.user?.image || '/avater.jpg'}
            alt='user'
            width={30}
            height={30}
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium'>
            {session?.user?.name || 'Guest'}
          </span>
          <span className='text-[10px] text-gray-500 text-right'>
            {session?.user?.email || 'guest@gmail.com'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
