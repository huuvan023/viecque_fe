import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyReqCallback, ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "Method not found" });
  }
  const cookies = new Cookies(req, res, { secure: false });
  cookies.set("access_token");
  return res.status(200).json({ message: "Logout success" });
}
