import { useRequest } from "ahooks";

import { useDebounceFn } from "ahooks";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { initPagination } from "utils/index";

const EmployeRegistration = () => {
  const [filter, setFilter] = useState(initPagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(workers.getWorkers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...filter,
      query: search,
    });
  };

  useEffect(() => {
    run();
  }, [filter]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });
  return <div>Hhhas</div>;
};

export default EmployeRegistration;
