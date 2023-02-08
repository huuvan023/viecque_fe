import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import React, { useEffect } from "react";
import Link from "next/link";
import SearchBox from "@Component/Layout/searchBox";
import { GetServerSidePropsContext } from "next";
import FeedsList from "@Component/screen-components/home-components/feeds/FeedsList";
interface Props {
  data: any[];
}
export default function Home({ data }: Props) {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <Layout>
        <div className="container home-screen">
          <SearchBox />
          <div style={{ height: "20px" }}></div>
          <FeedsList data={data} />
          <div className="paginations">
            <ul className="pager">
              <li>
                <a className="pager-prev" href="#" />
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number">1</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number">2</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number">3</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number">4</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number">5</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number active">6</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="#">
                  <a className="pager-number">7</a>
                </Link>
              </li>
              <li>
                <a className="pager-next" href="#" />
              </li>
            </ul>
          </div>
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
  const data = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });

  const newData = await data.then();
  const newList = [];
  for (let index = 0; index < 100; index++) {
    newList.push(index);
    // console.log(newList);
  }
  return {
    props: {
      data: newList,
    },
  };
}
