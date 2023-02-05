import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
import { useAuth } from "hooks/use-auth";

interface Props {
  children: React.ReactNode;
}
const Authentication = (props: Props) => {
  const { firstLoading, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      router.push({
        pathname: Routes.home,
      });
    }
  }, [firstLoading, profile, router]);

  return <>{props.children}</>;
};
export default Authentication;
