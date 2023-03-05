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
  LocationDataModel,
  PaginationModel,
} from "@Models/index";
import { useRouter } from "next/router";
import AppPagination from "@Component/elements/AppPagination";
import {
  convertDateTimeToDateString,
  decreasedDate,
} from "@Utils/format-time-string";
interface Props {
  data: GetFeedsModel[];
  total: number;
  filter: {
    page: any;
    pageSize: any;
    keyword: any;
    dateType: any;
    jobType: any;
    salaryRange: any;
    provinceId: any;
    districtId: any;
    wardId: any;
    jobCate: any;
  };
}
export default function Home({ data, total, filter }: Props) {
  const router = useRouter();
  const query = router.query;
  const { setLoading } = useLoading();
  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [defaultLocation, setDefaultLocation] = useState<
    LocationDataModel | undefined
  >();
  useEffect(() => {
    setLoading(false);
    setDefaultLocation(
      JSON.parse(localStorage.getItem("filterLocation")!) || undefined
    );
  }, [data, total, filter]);

  const onClearFilter = () => {
    setLoading(true);
    router.push({
      pathname: "/",
      query: {},
    });
  };

  const onSearch = (value: string) => {
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

    router.push({
      pathname: "/",
      query: {
        ...query,
        jobCate: value,
      },
    });
  };

  const onFilterJobType = (value: string) => {
    setLoading(true);
    router.push({
      pathname: "/",
      query: {
        ...query,
        jobType: value,
      },
    });
  };
  const onFilterDateType = (value: string) => {
    setLoading(true);
    router.push({
      pathname: "/",
      query: {
        ...query,
        dateType: value,
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

  const onFilterLocation = (value: LocationDataModel) => {
    localStorage.setItem("filterLocation", JSON.stringify(value));
    const newQuery = {
      ...query,
      provinceId: value.provinceId?.code,
      districtId: value.districtId?.code,
      wardId: value.wardId?.code,
    };
    console.log(value);
    // if (!value.provinceId) {
    //   delete newQuery.provinceId;
    // }
    // if (!value.districtId) {
    //   delete newQuery.districtId;
    // }
    // if (!value.wardId) {
    //   delete newQuery.wardId;
    // }
    router.push({
      pathname: "/",
      query: newQuery,
    });
  };

  return (
    <>
      <Layout>
        <div className="container home-screen">
          <SearchBox
            // clear filter
            onClearFilter={onClearFilter}
            // search
            onSearch={onSearch}
            // salary
            onSalary={onFilterSalary}
            defaultValueSalary={filter.salaryRange ?? [0, 10000000]}
            // cate job
            onSelectJobCate={onFilterJobCate}
            defaultValueJobCate={filter.jobCate}
            // job type
            onSelectJobType={(value) => onFilterJobType(value)}
            defaultValueJobType={filter.jobType}
            // range Date
            onSelectDateType={(value) => onFilterDateType(value)}
            defaultValueDateType={filter.dateType}
            // location
            handleLocationData={(value) => onFilterLocation(value)}
            // defaultLocation={
            //   JSON.parse(localStorage.getItem("filterLocation")!) || undefined
            // }
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
    dateType = null,
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
  let dateRange = null;
  if (dateType) {
    const rangeFromDate = convertDateTimeToDateString(new Date());
    const rangeToDate = convertDateTimeToDateString(
      decreasedDate(new Date(), +dateType! as number)
    ); // giảm ngày cho date hiện tại

    dateRange = [
      new Date(rangeToDate).getTime(),
      new Date(rangeFromDate).getTime(),
    ];
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

    dataResponse = response.data?.data;
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
        dateType,
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
