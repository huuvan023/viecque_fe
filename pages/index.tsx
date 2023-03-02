import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchBox from "@Component/Layout/searchBox";
import { GetServerSidePropsContext } from "next";
import FeedsList from "@Component/screen-components/home-components/feeds/FeedsList";
import { Tabs, TabsProps } from "antd";
import AxiosClient from "@Axios/axios";
import axios, { AxiosResponse } from "axios";
import env from "@Env/index";
import { ResponseModel } from "@Models/response.model";
import {
  GetFeedsModel,
  JobCategoryModel,
  PaginationModel,
} from "@Models/index";
import { useRouter } from "next/router";
import AppPagination from "@Component/elements/AppPagination";
import FeedsListOnLocal from "@Component/screen-components/home-components/feeds/FeedsListOnLocal";
interface Props {
  data: GetFeedsModel[];
  total: number;
  filter: {
    page: any;
    pageSize: any;
    keyword: any;
    dateRange: any;
    jobType: any;
    salaryRange: any;
    provinceId: any;
    districtId: any;
    wardId: any;
    jobCate: any;
  };
}
export default function Home({ data, total, filter }: Props) {
  const { setLoading } = useLoading();
  const router = useRouter();
  const [tabActive, setTabActive] = useState("");
  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const query = router.query;
  useEffect(() => {
    setLoading(false);
  }, []);

  const onSearch = (value: string) => {
    router.push({
      pathname: "/",
      query: {
        ...query,
        keyword: value,
        // jobCate: value,
      },
    });
  };
  const onFilterSalary = (value: [number, number]) => {
    router.push({
      pathname: "/",
      query: {
        ...query,
        salaryRangeBefore: value[0],
        salaryRangeAfter: value[1],
      },
    });
  };

  const onFilterJobCate = (value: string) => {
    router.push({
      pathname: "/",
      query: {
        ...query,
        jobCate: value,
      },
    });
  };

  const onPagination = (pagination: PaginationModel) => {
    setPagination(pagination);
    router.push({
      pathname: "/",
      query: {
        ...query,
        page: pagination.page,
      },
    });
  };
  const onChangeTab = (activeKey: string) => {
    setTabActive(activeKey);
  };
  return (
    <>
      <Layout>
        <div className="container home-screen">
          <SearchBox
            onSearch={onSearch}
            onSalary={onFilterSalary}
            defaultValueSalary={filter.salaryRange ?? [0, 1000000]}
            onSelectJobCate={onFilterJobCate}
            defaultValueJobCate={filter.jobCate}
          />
          <div style={{ height: "20px" }}></div>
          <FeedsList data={data} />
          <AppPagination
            handlePagination={onPagination}
            pagination={pagination}
            total={total}
          />
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
  const {
    page = "1",
    pageSize = "10",
    keyword = null,
    dateRange = null,
    jobType = null,
    salaryRangeBefore = null,
    salaryRangeAfter = null,
    provinceId = null,
    districtId = null,
    wardId = null,
    jobCate = null,
  } = context.query;

  let salaryRange = null;
  if (salaryRangeBefore && salaryRangeAfter) {
    salaryRange = [salaryRangeBefore, salaryRangeAfter];
  }
  const data = JSON.stringify({
    page,
    pageSize,
    keyword,
    dateRange,
    jobType,
    salaryRange: salaryRange,
    provinceId,
    districtId,
    wardId,
    jobCate: jobCate === "" ? null : jobCate,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${env}/public/filter-feeds`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let dataResponse: GetFeedsModel[] = [];
  let totalRecord = 0;
  try {
    const response = await (axios(config) as Promise<
      AxiosResponse<ResponseModel<GetFeedsModel[]>>
    >);
    console.log(response);
    dataResponse = response?.data?.data;
    totalRecord = response.data?.totalRecord!;
  } catch (error) {}

  return {
    props: {
      data: dataResponse,
      total: totalRecord,
      filter: {
        page,
        pageSize,
        keyword,
        dateRange,
        jobType,
        salaryRange,
        provinceId,
        districtId,
        wardId,
        jobCate,
      },
    },
  };
}
