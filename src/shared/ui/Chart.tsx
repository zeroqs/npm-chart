import { Area, Axis, Line, XYContainer } from '@unovis/ts';
import { format } from 'date-fns';
import type { ComponentProps, Resource } from 'solid-js';
import { createMemo, onMount } from 'solid-js';

import type { FetchData } from '@/shared/api';

interface Data { amount: number; date: string }

interface Props {
  data: Resource<FetchData>
}

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

export const Chart = (props: ComponentProps<'div'> & Props) => {
  const chartData = () => props.data();
  let chartRef;

  const data = createMemo(() => {
    const periodData = {} as Record<string, Data>;
    const periodFormat = 'MM-yyyy'; // MM-yyyy - monthly, ww-yyyy - week
    for (const date in chartData()?.downloads) {
      const period = format(date, periodFormat);
      periodData[period] ||= { amount: 0, date };
      periodData[period].amount += chartData()?.downloads[date] || 0;
    }
    return Object.entries(periodData).map(([_, { date, amount }]) => ({ date, amount }));
  });

  const formatNumberCompact = (value: number, maximumFractionDigits: number = 0) => Intl.NumberFormat('en', { maximumFractionDigits, notation: 'compact' }).format(value);

  const formatDate = (date: string): string => {
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
      xAxis: new Axis({ type: 'x', tickFormat: (_, i) => xTicks(i) }),
      yAxis: new Axis({ type: 'y', tickFormat: (value, maximumFractionDigits) => formatNumberCompact(Number(value), maximumFractionDigits) }),
      width: 650
    }, data());
  });

  return (
    <div ref={chartRef} {...props} />
  );
};
