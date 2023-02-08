import FeedDetail from "@Component/screen-components/home-components/feeds/FeedDetail";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
interface Props {}
export default function Detail({ data }: { data: any }) {
  const router = useRouter();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, [router]);

  return (
    <>
      <Layout>
        <div className="container home-screen">
          <FeedDetail data={data} />
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{
  props: Props;
}> {
  const id = context.query.id;
  console.log(id);
  return {
    props: {
      data: {},
    },
  };
}
