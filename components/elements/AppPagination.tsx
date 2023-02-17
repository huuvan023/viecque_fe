import { PaginationModel } from "@Models/pagination.model";
import Link from "next/link";
import React, { useEffect, useState, memo } from "react";
interface Props {
  handlePagination: (pagintaion: PaginationModel) => void;
  total: number;
  pagination: PaginationModel;
}
const AppPagination = ({ handlePagination, total, pagination }: Props) => {
  const [totalData, setTotalData] = useState<number[]>([]);

  useEffect(() => {
    const mtotal = [];
    for (
      let index = 0;
      index < Math.ceil(total / pagination.pageSize);
      index++
    ) {
      mtotal.push(index + 1);
    }
    setTotalData(mtotal);
  }, [total, pagination]);

  return (
    <div className="paginations">
      <ul className="pager">
        <li>
          <a
            onClick={() => {
              if (pagination.page === 1) {
                return;
              }
              handlePagination({ ...pagination, page: pagination.page - 1 });
            }}
            className="pager-prev"
            href="#"
          />
        </li>
        {totalData.map((item) => (
          <li key={item}>
            <a
              href="#"
              onClick={() => handlePagination({ ...pagination, page: item })}
              className={
                item === pagination.page
                  ? "pager-number active"
                  : "pager-number"
              }
            >
              {item}
            </a>
          </li>
        ))}

        <li>
          <a
            onClick={() => {
              if (pagination.page === totalData.length) {
                return;
              }
              handlePagination({ ...pagination, page: pagination.page + 1 });
            }}
            className="pager-next"
            href="#"
          />
        </li>
      </ul>
    </div>
  );
};
export default AppPagination;
