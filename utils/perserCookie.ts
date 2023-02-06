export const parserTokenByCookie = (cookie: string): string => {
  if (!cookie) {
    return "";
  }

  const token = cookie.replace("access_token=", "");
  return token;
};
