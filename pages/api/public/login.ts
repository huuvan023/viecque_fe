import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
import api from "env";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "Method not found" });
  }
  return new Promise((resolve) => {
    req.headers.cookie = "";

    const handleLoginRsponse: ProxyResCallback = (proxyRes, req, res) => {
      try {
        let body = "";
        proxyRes.on("data", function (chunk) {
          body += chunk;
        });
        proxyRes.on("end", function () {
          const respondse = JSON.parse(body);
          const data = respondse.data;
          const cookies = new Cookies(req, res, { secure: false });

          if (data) {
            cookies.set("access_token", data?.token, {
              httpOnly: true,
              sameSite: "lax",
              // expires: new Date(2023, 2, 2),
            });

            (res as NextApiResponse).status(200).json({
              success: true,
            });
          } else {
            cookies.set("access_token");
            (res as NextApiResponse).status(200).json(respondse);
          }
        });
      } catch (error) {
        res.end("logoin error");
      }
      resolve(true);
    };
    proxy.once("proxyRes", handleLoginRsponse);

    proxy.web(req, res, {
      target: api,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
