import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { useEffect, useState } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { initPagination } from "utils/index";

/**
 * Custom hook for fetching and managing customer company data
 */
export const useCustomerCompanyData = () => {
  const [filter, setFilter] = useState({
    ...initPagination,
    sorter: { created_at: "desc" },
  });
  const [search, setSearch] = useState<string>("");

  const list = useRequest(customerCompany.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...filter,
      search: search,
    });
  };

  useEffect(() => {
    run();
  }, [filter]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  const handleSearch = (value: string) => {
    setSearch(value);
    searchRun.run({ ...filter, search: value });
  };

  const handleRefresh = () => {
    list.run({ ...filter, search: search });
  };

  const handleFilterChange = (values: any) => {
    setFilter({ ...filter, ...values });
  };

  return {
    filter,
    setFilter,
    search,
    setSearch,
    list,
    handleSearch,
    handleRefresh,
    handleFilterChange,
  };
};
