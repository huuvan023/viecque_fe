import { RoutesConst } from "@Constants/routes-const";
import { Routes } from "./routes";
export interface MenuRoutes {
  label: string;
  path: string;
  routesType: string;
  children?: {
    label: string;
    path: string;
    routesType: string;
  }[];
}
export const menuRoutes: MenuRoutes[] = [
  {
    label: "Trang chủ",
    path: Routes.home,
    routesType: RoutesConst.public,
  },
];
