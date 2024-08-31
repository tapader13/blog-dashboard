'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A stacked area chart';

const chartData = [
  { category: 'Js', value: 35 },
  { category: 'React', value: 28 },
  { category: 'Express', value: 40 },
  { category: 'Node.js', value: 22 },
  { category: 'CSS', value: 18 },
  { category: 'HTML', value: 30 },
];

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function Cards() {
  return (
    <Card className='h-[400px]'>
      <CardHeader>
        <CardTitle>Technology Categories</CardTitle>
        <CardDescription>
          Showing total blogs for different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='w-full h-[200px]' config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='value'
              type='natural'
              fill='var(--color-value)'
              fillOpacity={0.4}
              stroke='var(--color-value)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this category{' '}
              <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              JavaScript
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
