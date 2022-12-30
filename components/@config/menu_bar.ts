export interface MenuBarModel {
  label: string;
  path: string;
  children?: {
    label: string;
    path: string;
  }[];
}
export const menuBar: MenuBarModel[] = [
  {
    label: "Home",
    path: "/",
    children: [
      {
        label: "Home 1",
        path: "/home1",
      },
    ],
  },
  {
    label: "test",
    path: "/test",
  },
  {
    label: "CONTACT",
    path: "/CONTACT",
  },
];
