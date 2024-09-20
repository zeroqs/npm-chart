import { type ComponentProps, splitProps } from 'solid-js';

const defaultClass = 'w-full p-2 border rounded-md bg-gray-900 border-gray-700 outline-none focus:outline-slate-500';

export const Input = (props: ComponentProps<'input'>) => {
  const [classProps, restProps] = splitProps(
    props,
    ['class']
  );

  return (
    <input class={`${defaultClass} ${classProps.class}`} {...restProps} />
  );
};
