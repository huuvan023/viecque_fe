import { ENPOINT } from "@Axios/endpoint";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from "@Env/index";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    return res.status(200).json({ message: "Method not found" });
  }

  const cookies = new Cookies(req, res);
  if (!cookies.get("access_token")) {
    res.status(200).json(null);
  }
  var myHeaders = new Headers();
  if (cookies.get("access_token")) {
    myHeaders.append("Authorization", cookies.get("access_token") || "");
  }

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://banhmisua.cf/user", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      (res as NextApiResponse).status(result.status).json(result);
      // console.log(result.status);
    })
    .catch((error) => {
      const cookies = new Cookies(req, res, { secure: false });
      cookies.set("access_token");
    });
}
