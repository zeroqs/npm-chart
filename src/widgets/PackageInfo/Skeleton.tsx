export const Skeleton = () => {
  return (
    <>
      <div class='self-start animate-pulse'>
        <div class='flex items-start gap-4'>
          <div class='h-6 bg-gray-500 rounded-sm dark:bg-gray-700 w-28 mb-4' />

          <div class='relative h-3.5 bg-gray-500 rounded-full dark:bg-gray-700 w-14 mb-4' />
        </div>
        <div class='h-3.5 bg-gray-500 rounded-sm dark:bg-gray-700 mt-2 w-[360px]' />
        <div class='h-3 bg-gray-500 rounded-sm dark:bg-gray-700 mt-2 w-[180px]' />

        <div class='h-2 bg-gray-500 rounded-sm dark:bg-gray-700 mt-4 w-[220px]' />

      </div>

      <div class='animate-pulse w-[712px] h-[400px] bg-gray-500 rounded-sm dark:bg-gray-700' />
    </>
  );
};
