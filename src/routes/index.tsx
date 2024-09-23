import { useNavigate } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';

import { IconSearch } from '~/shared/icons/IconSearch';
import { Input } from '~/shared/ui/Input';

export default function Home() {
  const [search, setSearch] = createSignal('');
  const navigate = useNavigate();

  const handleSearch: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    setSearch(event.currentTarget.value);
  };

  const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();
    navigate(`/${search()}`);
  };

  return (
    <main class='flex justify-center items-center h-screen '>
      <div class='flex flex-col'>
        <h1 class='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl text-center'>
          npm statistics chart
        </h1>
        <p class='text-sm text-muted-foreground pt-1'>Search for a package to see its download stats over time.</p>
        <form class='relative' onSubmit={handleSubmit}>
          <Input value={search()} onInput={handleSearch} class='my-4' />
          <span class='absolute inset-y-0 end-0 flex items-center px-3.5 pr-1'>
            <button class='bg-amber-900 p-1.5 rounded-md' type='submit'>
              <IconSearch />
            </button>
          </span>
        </form>
      </div>
    </main>
  );
}
