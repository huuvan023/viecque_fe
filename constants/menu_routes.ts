import { Routes } from './routes';
export interface MenuRoutes {
  label: string;
  path: string;
  children?: {
    label: string;
    path: string;
  }[];
}
export const menuRoutes: MenuRoutes[] = [
  {
    label: "Trang chủ",
    path: Routes.home,
  },
];
