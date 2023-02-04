import Layout from "@Component/Layout/Layout";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import { useLoading } from "@Hooks/use-loading";

import React, { useContext, useEffect, useState } from "react";
export default function Home() {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Layout>
        <div>dasdas</div>
      </Layout>
    </>
  );
}
