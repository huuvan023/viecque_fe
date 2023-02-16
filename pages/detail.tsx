import FeedDetail from "@Component/screen-components/home-components/feeds/FeedDetail";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import StepCreateFeed from "@Component/screen-components/create-feeds-components/Steps";
import { apiBrandsAxios } from "@Axios/user/api-brands";
import { BrandsModel } from "@Models/index";
interface Props {}
export default function Detail({ data }: { data: any }) {
  const router = useRouter();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    (() => {
      getBrandById("75a38d67-bbe7-464b-b9a9-8120801048b9");
    })();
  }, [router]);
  const [brandById, setBrandById] = useState<BrandsModel>();
  const getBrandById = async (id: string) => {
    try {
      const response = await apiBrandsAxios.getBrandById(id);
      setBrandById(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <Layout>
        <div className="container home-screen">
          <FeedDetail data={data} brand={brandById!} />
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
