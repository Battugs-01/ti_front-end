import { Switch } from "antd";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { COLUMN_WIDTHS } from "../constants";
import { ProColumns } from "@ant-design/pro-table";

/**
 * Table columns configuration for CustomerCompany
 */
export const getCustomerCompanyColumns = (): ProColumns<CustomerCompanyType, any>[] => [
  {
    dataIndex: "shortcut_name",
    title: "Товчлол",
    align: "left",
    render: (_, record) => (
      <div className="flex gap-2">
        <span className="text-sm text-[#475467] font-normal">
          {record.shortcut_name || "-"}
        </span>
      </div>
    ),
  },
  {
    dataIndex: "name",
    title: "Компаний нэр",
    align: "left",
    render: (_, record) => (
      <span className="text-sm text-[#475467] font-normal flex text-center">
        {record.name || "-"}
      </span>
    ),
  },
  {
    dataIndex: "is_broker",
    title: "Зууч эсэх",
    width: COLUMN_WIDTHS.BROKER,
    render: (_, record) => (
      <span className="text-sm text-[#475467] font-normal flex text-center ">
        {<Switch disabled checked={!!record.is_broker} />}
      </span>
    ),
  },
  {
    dataIndex: "ledger_name",
    title: "Харилцагчийн код",
    width: COLUMN_WIDTHS.LEDGER,
    render: (_, record) => (
      <span className="text-sm text-[#475467] font-normal flex text-center">
        {record?.ledger?.name || "-"}
      </span>
    ),
  },
  {
    dataIndex: "contact_number",
    title: "Харилцах дугаар",
    align: "center",
    render: (_, record) => (
      <span className="text-sm text-[#475467] font-normal">
        {record.contact_number || "-"}
      </span>
    ),
  },
  {
    dataIndex: "email",
    title: "Цахим хаяг",
    align: "left",
    width: COLUMN_WIDTHS.EMAIL,
    render: (_, record) => (
      <span className="text-sm text-[#475467] font-normal flex text-center ">
        {record?.user?.email || "-"}
      </span>
    ),
  },
  {
    dataIndex: "created_by",
    title: "Бүртгэсэн ажилтан",
    align: "left",
    width: COLUMN_WIDTHS.CREATED_BY,
    render: (_, record) => (
      <span className="text-sm text-[#475467] font-normal flex text-center ">
        {record?.created_by?.email || "-"}
      </span>
    ),
  },
]; 