import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
import { useAuth } from "hooks/use-auth";
import Loading from "@Component/elements/Loading";

interface Props {
  children: React.ReactNode;
  isAuth?: boolean;
}
const Auth = (props: Props) => {
  return (
    <>
      {props.isAuth ? (
        <NoAuthentication {...props} />
      ) : (
        <Authentication {...props} />
      )}
    </>
  );
};

export default Auth;

const Authentication = (props: Props) => {
  const { firstLoading, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && profile?.data) {
      router.push({
        pathname: Routes.home,
      });
    }
  }, [firstLoading, profile, router]);

  return (
    <>{!firstLoading && !profile?.data ? <>{props.children}</> : <Loading />}</>
  );
};

const NoAuthentication = (props: Props) => {
  const { firstLoading, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      router.push({
        pathname: Routes.home,
      });
    }
  }, [firstLoading, profile, router]);

  return <>{!firstLoading ? <>{props.children}</> : <Loading />}</>;
};
