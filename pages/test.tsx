import Auth from "@Component/Layout/Auth";
import Layout from "@Component/Layout/Layout";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function Test({}: Props) {
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
    <Auth isAuth={true}>
      <Layout>
        <div>tedsst</div>
      </Layout>
    </Auth>
  );
}
