import { useParams } from '@solidjs/router';
import { Area, Axis, Line, XYContainer } from '@unovis/ts';
import { format } from 'date-fns';
import { createMemo, onMount } from 'solid-js';

import { mockData } from '@/shared/mock';

interface Data { amount: number; date: string }

const x = (_: Data, i: number) => i;
const y = (d: Data) => d.amount;

const line = new Line<Data>({
  x,
  y

});

const area = new Area<Data>({
  x,
  y,
  opacity: 0.1
});

export default function Package() {
  const { name } = useParams();
  let chartRef;

  const data = createMemo(() => {
    const periodData = {} as Record<string, Data>;
    const periodFormat = 'MM-yyyy'; // MM-yyyy - monthly, ww-yyyy - week
    for (const date in mockData.downloads) {
      const period = format(date, periodFormat);
      periodData[period] ||= { amount: 0, date };
      periodData[period].amount += mockData.downloads[date];
    }
    return Object.entries(periodData).map(([_, { date, amount }]) => ({ date, amount }));
  });

  const formatNumber = new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format;
  const formatNumberCompact = (value: number, maximumFractionDigits: number = 0) => Intl.NumberFormat('en', { maximumFractionDigits, notation: 'compact' }).format(value);

  const formatDate = (date: Date): string => {
    return ({
      weekly: format(date, 'd MMM'),
      monthly: format(date, 'MMM yyy')
    }).monthly;
  };

  const xTicks = (i: number) => {
    if (i === 0 || i === data.length - 1 || !data()[i]) {
      return '';
    }

    return formatDate(data()[i].date);
  };

  onMount(() => {
    const chart = new XYContainer(chartRef!, {
      components: [line, area],
      xAxis: new Axis({ type: 'x', tickFormat: xTicks }),
      yAxis: new Axis({ type: 'y', tickFormat: formatNumberCompact }),
      width: 650
    }, data());
  });

  return (
    <main class='flex justify-center items-center h-screen'>
      <div class='flex flex-col gap-4'>
        <div class='self-start'>
          <div class='flex items-start gap-4'>
            <h3 class='scroll-m-20 text-2xl font-semibold tracking-wide'>
              {mockData.name}
            </h3>
            <code class='relative rounded bg-gray-900 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
              {mockData.version}
            </code>
          </div>
          <p class='leading-7 [&:not(:first-child)]:mt-2'>
            {mockData.description}
          </p>
          <a
            href='#'
            class='font-medium text-primary underline underline-offset-4 text-[#4D8CFD] '
          >
            {mockData.homepage}
          </a>

          <p class='text-sm text-muted-foreground mt-2'>{formatNumber(mockData.total)} total npm downloads</p>

        </div>
        <div class='border-[18px] rounded-md border-[#4D8CFD] p-4' ref={chartRef} />
      </div>
    </main>
  );
}
