import Loading from "@Component/elements/Loading";
import Layout from "@Component/Layout/Layout";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import React, { useContext, useEffect, useState } from "react";
export default function Home() {
  const [state, dispatch] = useContext(GlobalStateContext);
  useEffect(() => {
    handleLoading(false);
  }, []);
  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };

  return (
    <>
      <Layout>
        <div>dasdas</div>
      </Layout>
    </>
  );
}
