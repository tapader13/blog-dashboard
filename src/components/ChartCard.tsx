'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
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

export const description =
  'A pie chart displaying the distribution of blog types.';

const chartData = [
  { type: 'Published', amount: 275, fill: 'var(--color-Published)' },
  { type: 'Pending', amount: 200, fill: 'var(--color-Pending)' },
  { type: 'Draft', amount: 187, fill: 'var(--color-Draft)' },
];

const chartConfig = {
  amount: {
    label: 'Amount',
  },
  Published: {
    label: 'Published',
    color: 'hsl(var(--chart-1))',
  },
  Pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-2))',
  },
  Draft: {
    label: 'Draft',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function ChartCard() {
  return (
    <Card className='flex flex-col h-[400px]'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Blog Type Distribution</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey='amount' hideLabel />}
            />
            <Pie data={chartData} dataKey='amount'>
              <LabelList
                dataKey='type'
                className='fill-background'
                stroke='none'
                fontSize={12}
                fill='white'
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing the distribution of blog types
        </div>
      </CardFooter>
    </Card>
  );
}
