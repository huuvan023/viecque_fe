import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link legacyBehavior href="/">
      <a className="d-flex">
        <img alt="jobBox" src="assets/imgs/template/jobhub-logo.svg" />
      </a>
    </Link>
  );
};
export default Logo;
