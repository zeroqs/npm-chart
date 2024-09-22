import { A, useParams } from '@solidjs/router';
import { createResource, Suspense } from 'solid-js';

import { fetchNpmData } from '@/shared/api';
import { IconSearch } from '@/shared/icons/IconSearch';
import { PackageInfo } from '@/widgets/PackageInfo/PackageInfo';
import { Skeleton } from '@/widgets/PackageInfo/Skeleton';

export default function Package() {
  const { name } = useParams();
  const [data] = createResource(name, () => fetchNpmData(name));

  return (
    <main class='flex justify-center items-center h-screen'>
      <div class='flex flex-col gap-4'>
        <A
          href='/'
          class='flex items-center gap-2 font-medium underline underline-offset-4 text-[#4D8CFD] text-sm text-muted-foreground mt-2'
        >
          <IconSearch size={14} />

          Search another package
        </A>

        <Suspense fallback={<Skeleton />}>
          <PackageInfo data={data} />
        </Suspense>
      </div>
    </main>
  );
}
