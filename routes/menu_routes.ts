import { RoutesEnum } from "@Constants/routes-enum";
import { Routes } from "./routes";
export interface MenuRoutes {
  label: string;
  path: string;
  routesType: RoutesEnum;
  children?: {
    label: string;
    path: string;
    routesType: RoutesEnum;
  }[];
}
export const menuRoutes: MenuRoutes[] = [
  {
    label: "Trang chủ",
    path: Routes.home,
    routesType: RoutesEnum.public,
  },
];
