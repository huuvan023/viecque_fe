import { apiPublicAxios } from "@Axios/api-public/api-public-axios";
import { apiUserAxios } from "@Axios/api-user/api-user";
import Auth from "@Component/Layout/Auth";
import Layout from "@Component/Layout/Layout";
import { SET_AUTH } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import React, { useContext, useEffect } from "react";
export default function Home() {
  const [state, dispatch] = useContext(GlobalStateContext);

  return (
    <Layout>
      <div>{state.isAuth ? "true" : "false"}</div>
    </Layout>
  );
}
