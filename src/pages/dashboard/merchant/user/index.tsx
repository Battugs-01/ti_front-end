import { Tabs, Tooltip } from "antd";
import { useAtom } from "jotai";
import { UserForm } from "./form";
import { UserList } from "./list/list";
import { atomUserForm } from "./store";
import { IfCondition } from "components/condition";
import { ActiveUserList } from "./list/active_list";

const MerchantUser = () => {
  const [form, setForm] = useAtom(atomUserForm);
  return (
    <div className="space-y-4">
      <Tabs
        onChange={(e) => setForm({ ...form, tab: e })}
        items={[
          {
            key: "all",
            label: <Tooltip title="All Merchant User List">All</Tooltip>,
          },
          {
            key: "active",
            label: <Tooltip title="Active Merchant User list">Active</Tooltip>,
          },
        ]}
        activeKey={form.tab}
      />
      {/* Form */}
      <UserForm />
      <IfCondition
        condition={form.tab === "all"}
        whenTrue={<UserList />}
        whenFalse={<ActiveUserList />}
      />
    </div>
  );
};

export default MerchantUser;
