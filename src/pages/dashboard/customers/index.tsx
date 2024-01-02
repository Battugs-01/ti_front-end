import { FC } from "react";
import { CustomerForm } from "./form";
import { CustomerList } from "./list";
import { Tabs, Tooltip } from "antd";
import { useAtom } from "jotai";
import { atomCustomerForm } from "./store";
import { IfCondition } from "components/condition";
import { ActiveCustomerList } from "./list/active_list";

const CustomerListPage: FC = () => {
  const [form, setForm] = useAtom(atomCustomerForm);
  return (
    <>
      <Tabs
        onChange={(e) => setForm({ ...form, tab: e })}
        items={[
          {
            key: "all",
            label: <Tooltip title="All Customer List"> All</Tooltip>,
          },
          {
            key: "active",
            label: <Tooltip title="Active Customer List">Active</Tooltip>,
          },
        ]}
        defaultValue={form.tab}
      />

      <CustomerForm />

      <IfCondition
        condition={form.tab === "all"}
        whenTrue={<CustomerList />}
        whenFalse={<ActiveCustomerList />}
      />
    </>
  );
};

export default CustomerListPage;
