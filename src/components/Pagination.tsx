'use client';
import React from 'react';
import { Button } from './ui/button';

const Pagination = ({
  currentPage,
  setCurrentPage,
  blogsPerPage,
  totalBlogs,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  blogsPerPage: number;
  totalBlogs: number;
}) => {
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  return (
    <div className='flex items-center justify-between text-gray-500'>
      <div data-aos='zoom-in'>
        <span >
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <div className='flex items-center gap-3' data-aos='zoom-in'>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className='text-black bg-[rgba(59,130,244,0.19)] hover:bg-blue-500'
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <div
              className={`h-10 cursor-pointer w-10 text-center rounded-full flex items-center justify-center ${
                page === currentPage
                  ? 'text-black bg-blue-500'
                  : 'text-black bg-[rgba(59,130,244,0.19)]'
              }`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          )
        )}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className='text-black bg-[rgba(59,130,244,0.19)] hover:bg-blue-500'
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
