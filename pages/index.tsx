import Layout from "@Component/Layout/Layout";
import { SET_DATA } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import React, { useContext } from "react";
export default function Home() {
  const [state, dispatch] = useContext(GlobalStateContext);

  const handleClick = () => {
    dispatch({
      type: SET_DATA,
      data: `${Math.floor(Math.random() * 100000)}`,
    });
  };

  return (
    <>
      <Layout>
        <button onClick={handleClick}>Set user</button>
        <div>{state.data1}</div>
      </Layout>
    </>
  );
}
