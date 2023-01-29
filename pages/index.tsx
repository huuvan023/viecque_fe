import { apiUserAxios } from "@Axios/api-user/api-user";
import Layout from "@Component/Layout/Layout";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
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

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // console.log(context.req.headers.cookie);
//   context.req.headers.token =
//     "AAABhjv1tm0%3DrkBYGzdkAwaELUFpqYUYydFd6MAAAAAAAZVx7";
//   // console.log(context.req.headers);

//   try {
//     const response = apiUserAxios.getUserInfo();
//     console.log(response);
//   } catch (error) {}
//   return {
//     props: {},
//   };
// }
