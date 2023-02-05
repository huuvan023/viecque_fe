import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import React, { useEffect } from "react";
import Link from "next/link";
import ImageAssets from "@Component/elements/ImageAssets";
import SearchBox from "@Component/Layout/searchBox";
import { GetServerSidePropsContext } from "next";
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
          <div className="row">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                >
                  <div className="card-grid-2 hover-up">
                    <div className="card-grid-2-image-left">
                      <div className="save-box">
                        <ImageAssets
                          className="save-icon"
                          src="assets/imgs/icon/save.png"
                          alt="JobBox"
                        />
                        <span>Lưu lại</span>
                      </div>

                      <div className="image-box">
                        <img
                          src="assets/imgs/brands/brand-2.png"
                          alt="jobBox"
                        />
                      </div>
                      <div className="right-info">
                        <Link legacyBehavior href="/">
                          <a className="name-job">Nhân viên bán hàng</a>
                        </Link>
                        <span className="location-small">Công ty test</span>
                        <span className="size-box-width"></span>
                        <span className="card-time">
                          5<span> minutes ago</span>
                        </span>
                      </div>
                    </div>
                    <div className="card-block-info">
                      <p className="font-sm color-text-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae architecto eveniet, dolor quo
                        repellendus pariatur.
                      </p>

                      <div className="card-2-bottom mt-10">
                        <div className="row">
                          <div className="col-lg-7 col-7">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i className="fi-rr-marker mr-5 ml-0" />
                              <span
                                style={{ fontWeight: 700, color: "#a0abb8" }}
                              >
                                quận 7 Tp.HCM
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-5 col-5 text-end">
                            <span style={{ fontWeight: 700, color: "#a0abb8" }}>
                              $ 100.000 VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
