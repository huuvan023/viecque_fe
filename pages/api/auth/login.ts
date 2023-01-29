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
  if (req.method !== "POST") {
    return res.status(200).json({ message: "Method not found" });
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(req.body);

  var requestOptions: RequestInit = {
    method: req.method,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${api}/public/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const cookies = new Cookies(req, res, { secure: false });

      if (result.data) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 4);
        cookies.set("access_token", result.data?.token, {
          httpOnly: true,
          sameSite: "lax",
          expires: expirationDate,
        });

        (res as NextApiResponse).status(result.status).json({
          success: true,
        });
      } else {
        cookies.set("access_token");
        (res as NextApiResponse).status(result.status).json(result);
      }
    })
    .catch((error) => {
      res.status(200).json(error);
    });
}
