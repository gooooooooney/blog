'use client'; // Error components must be Client components

import { Button } from '@/components/ui/Flowbite';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2  flex justify-center items-center flex-col'>
      <h2 className='mb-8'>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
