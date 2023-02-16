import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import React, { useEffect, useState } from "react";
import FeedsList from "@Component/screen-components/home-components/feeds/FeedsList";
import Link from "next/link";
import { useLoading } from "@Hooks/use-loading";
import { Tabs, TabsProps } from "antd";

export default function UserFeeds() {
  const { setLoading } = useLoading();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tin của bạn",
      children: <TabFeeds />,
    },
    {
      key: "2",
      label: "Tin hết hạn",
      children: <TabFeedsNoActive />,
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Authentication>
      <Layout>
        <div className="container user-feeds-screen">
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Quản lý tin</h2>
            <Tabs defaultActiveKey="1" type="card" size="large" items={items} />
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}

const TabFeeds = () => {
  const [data, setData] = useState([1, 2, 3, 23, 2, 312, 2]);
  const { setLoading } = useLoading();
  useEffect(() => {}, []);

  return (
    <>
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
    </>
  );
};

const TabFeedsNoActive = () => {
  const [data, setData] = useState([1, 2, 3, 23, 2]);
  const { setLoading } = useLoading();
  useEffect(() => {}, []);
  return (
    <>
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
    </>
  );
};
