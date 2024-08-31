'use client';
import { Cards } from '@/components/Cards';
import { ChartCard } from '@/components/ChartCard';
import SmallCard from '@/components/SmallCard';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='mx-4'>
      <div className='flex gap-3 justify-between'>
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
      <div className=' flex gap-3 mt-2'>
        <div className='h-[400px] w-[70%]'>
          <Cards />
        </div>
        <div className='h-[400px] w-[30%]'>
          <ChartCard />
        </div>
      </div>
    </main>
  );
}
