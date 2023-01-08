import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
const Auth = (props: Props) => {
  const [cookies, setCookies] = useState<string>("");
  useEffect(() => {
    const cookies = getCookie("access_token");
    setCookies(cookies);
  }, []);

  return <>{cookies ? props.children : <PageNoAuth />}</>;
};
export default Auth;

const PageNoAuth = () => {
  return <div>dsadsa</div>;
};
