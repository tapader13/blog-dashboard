import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const SmallCard = () => {
  return (
    <div>
      {' '}
      <Card className='max-w-xs' x-chunk='charts-01-chunk-3'>
        <CardHeader className='p-4 pb-0'>
          <CardTitle>Walking Distance</CardTitle>
          <CardDescription>
            Over the last 7 days, your distance walked and run was 12.5 miles
            per day.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-row items-baseline gap-4 p-4 pt-0'>
          <div className='flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none'>
            12.5
            <span className='text-sm font-normal text-muted-foreground'>
              miles/day
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmallCard;
