import { HomePage, PackagePage } from '@/pages';

export const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/package/:name',
    component: PackagePage
  }
];
