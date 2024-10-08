import type { AccessorWithLatest } from '@solidjs/router';
import { Area, Axis, Crosshair, Line, Tooltip, XYContainer } from '@unovis/ts';
import { format } from 'date-fns';
import type { ComponentProps } from 'solid-js';
import { createMemo, onMount } from 'solid-js';

import type { FetchData } from '~/shared/api';

interface Data { amount: number; date: string }

interface Props {
  data: AccessorWithLatest<FetchData | undefined>;
}

const x = (_: Data, i: number) => {
  return i;
};
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

const tooltip = new Tooltip({});

const formatNumber = new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format;

const formatDate = (date: string): string => {
  return ({
    weekly: format(date, 'd MMM'),
    monthly: format(date, 'MMM yyy')
  }).monthly;
};

const crosshair = new Crosshair<Data>({
  template: (d) => `${formatDate(d.date)}: ${formatNumber(d.amount)}`,
  x,
  y
});

const Chart = (props: ComponentProps<'div'> & Props) => {
  const chartData = () => props.data();
  let chartRef;

  const data = createMemo<Data[]>(() => {
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

  const xTicks = (i: number) => {
    if (i === 0 || i === data.length - 1 || !data()[i]) {
      return props.data()?.name || '';
    }

    return formatDate(data()[i].date);
  };

  onMount(() => {
    if (!chartRef) return;

    const xAxis = new Axis<Data>({ type: 'x', tickFormat: (_, i) => xTicks(i) });
    const yAxis = new Axis<Data>({ type: 'y', tickFormat: (value, maximumFractionDigits) => formatNumberCompact(Number(value), maximumFractionDigits) });

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore

    const chart = new XYContainer(chartRef!, {
      components: [line, area],
      xAxis,
      yAxis,
      width: 650,
      crosshair,
      tooltip
    }, data());
  });

  return (
    <div ref={chartRef} {...props} />
  );
};

export default Chart;
