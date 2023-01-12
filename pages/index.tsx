import Layout from "@Component/Layout/Layout";
import GlobalStateContext from "@Store/Context";
import React, { useContext } from "react";
export default function Home() {
  const [state, dispatch] = useContext(GlobalStateContext);

  return (
    <Layout>
      <div>{state.isAuth ? "true" : "false"}</div>
    </Layout>
  );
}
