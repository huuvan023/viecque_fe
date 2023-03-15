import Link from "next/link";
import React from "react";
import { menuRoutes, Routes } from "routes/index";
import ImageAssets from "../elements/ImageAssets";

const Logo = () => {
  return (
    <Link legacyBehavior href={Routes.home}>
      <a className="d-flex">
        <ImageAssets src="assets/imgs/template/viecque.png" alt="logo" width={100}/>
      </a>
    </Link>
  );
};
export default Logo;
