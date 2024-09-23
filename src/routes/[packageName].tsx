import { A, cache, createAsync, useParams } from '@solidjs/router';
import { createResource, Show, Suspense } from 'solid-js';

import { fetchNpmData } from '~/shared/api';
import { IconSearch } from '~/shared/icons/IconSearch';
import { PackageInfo } from '~/widgets/PackageInfo/PackageInfo';
import { Skeleton } from '~/widgets/PackageInfo/Skeleton';

export default function Package() {
  const { packageName } = useParams();
  const data = createAsync(() => fetchNpmData(packageName));

  return (
    <main class='flex justify-center items-center h-screen'>
      <div class='flex flex-col gap-4'>
        <A
          href='/'
          class='flex items-center gap-2 font-medium underline underline-offset-4 text-[#4D8CFD] text-sm text-muted-foreground mt-2'
        >
          <IconSearch size={14} />

          Search another package {packageName}
        </A>

        <PackageInfo data={data} />
      </div>
    </main>
  );
}
