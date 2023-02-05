import { AuthError } from "@Constants/auth-error";
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
    return res.status(200).json(null);
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

  await fetch(`${api}/user`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.error === AuthError.OK) {
        return (res as NextApiResponse)
          .status(result.status)
          .json({ success: true });
      } else {
        return (res as NextApiResponse).status(result.status).json(result);
      }
    })
    .catch((error) => {
      return (res as NextApiResponse).status(401).json(error);
    });
}
