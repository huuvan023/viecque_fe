import { AuthError } from "@Constants/auth-error";
import api from "@Env/index";
import axios from "axios";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cookies = new Cookies(req, res);

  const dataOnQuery = req.query;
  Object.keys(dataOnQuery).forEach((item) => {
    if (
      dataOnQuery[item] === "undefined" ||
      dataOnQuery[item] === "" ||
      dataOnQuery[item] === "null"
    ) {
      delete dataOnQuery[item];
    }
  });
  var data = JSON.stringify(dataOnQuery);
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${api}/admin/filter-feeds`,
    headers: {
      accept: "application/json",
      Authorization: cookies.get("access_token") || "",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return (res as NextApiResponse).json(response.data);
    })
    .catch(function (error) {
      return (res as NextApiResponse).json(error?.response?.data);
    });
}
