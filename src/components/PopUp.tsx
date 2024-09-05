'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BlogData } from '@/app/blogs/page';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PopUp({ blog }: { blog: BlogData }) {
  const [isLoading, setIsLoading] = useState(false);
  let id = blog._id;
  const router = useRouter();
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/blogapi?id=${id}`, { method: 'DELETE' });
      router.push('/');
    } catch (error) {
      console.error('Failed to delete blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full'>Delete</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{blog?.title}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this blog?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='danger'
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
