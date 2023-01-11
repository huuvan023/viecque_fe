import { apiPublicAxios } from "@Axios/api-public/api-public-axios";
import { apiUserAxios } from "@Axios/api-user/api-user";
import Layout from "@Component/Layout/Layout";
import { SET_DATA } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import React, { useContext, useEffect } from "react";
export default function Home() {
  const [state, dispatch] = useContext(GlobalStateContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiUserAxios.updateUserInfo({
          fullName: "test",
          listPhoneNumbers: ["2313123", "312312"],
        });
        const { data } = response;
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
