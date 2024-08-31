import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Header from '@/components/Header';
import Navvar from '@/components/Navvar';
import { MdOutlineArticle } from 'react-icons/md';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-screen'>
          {/* left sidebar */}
          <div className='w-[10%] md:w-[8%] lg:w-[16%] xl:w-[10%] p-4'>
            <Link
              href='/'
              className='flex items-center justify-center lg:justify-start gap-2'
            >
              <MdOutlineArticle className='text-2xl' />
              <span className='hidden lg:block font-bold'>MinhajBlog</span>
            </Link>
            <Navvar />
          </div>
          {/* right content */}
          <div className='w-[90%] md:w-[92%] lg:w-[84%] xl:w-[90%] bg-[#F7F8FA] overflow-scroll flex flex-col'>
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
