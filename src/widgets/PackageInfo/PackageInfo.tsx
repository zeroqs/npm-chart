import type { AccessorWithLatest } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Show } from 'solid-js';

import type { FetchData } from '~/shared/api';

const Chart = clientOnly(() => import('~/shared/ui/Chart'));

interface Props {
  data: AccessorWithLatest<FetchData | undefined>;
}
const formatNumber = new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format;

export const PackageInfo = (props: Props) => {
  return (
    <Show when={props.data()} fallback={<>not found</>}>
      <div class='self-start animate-fade animate-ease-in-out'>
        <div class='flex items-start gap-4'>
          <h3 class='scroll-m-20 text-2xl font-semibold tracking-wide'>
            {props.data()?.name}
          </h3>
          <code class='relative rounded bg-gray-900 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
            {props.data()?.version}
          </code>
        </div>
        <p class='leading-7 [&:not(:first-child)]:mt-2'>
          {props.data()?.description}
        </p>
        <a
          href='#'
          class='font-medium text-primary underline underline-offset-4 text-[#4D8CFD] '
        >
          {props.data()?.homepage}
        </a>

        <p class='text-sm text-muted-foreground mt-2'>{formatNumber(props.data()?.total || 0)} total npm downloads</p>

      </div>
      <div class='animate-fade animate-ease-in-out border-[24px] rounded-md border-[#4D8CFD] p-6'>
        <Chart data={props.data} />
      </div>
    </Show>
  );
};
