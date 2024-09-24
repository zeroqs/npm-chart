import { A } from '@solidjs/router';

interface Props {
  title: string
}

export const Badge = (props: Props) => {
  return <A class='p-2 bg-gray-700 rounded-md hover:bg-sky-950 transition ease-in-out duration-200' href={`${props.title}`}>{props.title}</A>;
};
