'use client';

import { TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from 'recharts';

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

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;
interface cardsData {
  Technology?: string;
  Health?: string;
  Education?: string;
  Finance?: string;
  Lifestyle?: string;
  Travel?: string;
  Food?: string;
  Fashion?: string;
  Entertainment?: string;
}
export function Cards({ convertObject }: { convertObject: cardsData }) {
  const chartData = [
    { category: 'Food', value: Number(convertObject.Food) || 10 },
    { category: 'Technology', value: Number(convertObject.Technology) || 10 },
    { category: 'Health', value: Number(convertObject.Health) || 10 },
    { category: 'Education', value: Number(convertObject.Education) || 10 },
    { category: 'Finance', value: Number(convertObject.Finance) || 10 },
    { category: 'Lifestyle', value: Number(convertObject.Lifestyle) || 10 },
    { category: 'Travel', value: Number(convertObject.Travel) || 10 },
    { category: 'Fashion', value: Number(convertObject.Fashion) || 10 },
    {
      category: 'Entertainment',
      value: Number(convertObject.Entertainment) || 10,
    },
  ];
  return (
    <Card className='h-[400px]'>
      <CardHeader>
        <CardTitle>Technology Categories</CardTitle>
        <CardDescription>
          Showing total blogs for different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='w-full  h-[200px]  '
          config={chartConfig}
        >
          <ResponsiveContainer width='100%' height='100%'>
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
          </ResponsiveContainer>
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
