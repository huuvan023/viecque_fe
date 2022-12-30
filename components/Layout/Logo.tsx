import Link from "next/link";
import React from "react";
import { Routes } from "../../constants/routes";

import ImageAssets from "../elements/ImageAssets";

const Logo = () => {
  return (
    <Link legacyBehavior href={Routes.home}>
      <a className="d-flex">
        <ImageAssets src="assets/imgs/template/jobhub-logo.svg" alt="logo" />{" "}
      </a>
    </Link>
  );
};
export default Logo;
