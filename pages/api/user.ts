import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";
import api from "@Env/index";

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
  const parserReqUrl = req.url;
  const newstr = parserReqUrl!.replace("/api", "");
  req.url = newstr;
  const cookies = new Cookies(req, res);
  if (!cookies.get("access_token")) {
    res.status(200).json(null);
  }
  return new Promise((resolve) => {
    // convert cookies to token

    if (cookies.get("access_token")) {
      req.headers.authorization = cookies.get("access_token");
    }

    req.headers.cookie = "";
    proxy.web(req, res, {
      target: api,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once("proxyReq", () => {
      resolve(true);
    });
  });
}
