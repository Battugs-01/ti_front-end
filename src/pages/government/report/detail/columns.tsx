import { ProColumns } from "@ant-design/pro-table";
import { Avatar } from "antd";
import { tableCellFixed } from "utils/index";

export const FamilyName: ProColumns<any, any> = {
  ...tableCellFixed(150),
  dataIndex: "title",
  title: "Ургийн овог",
  align: "left",
  render: (_, record) => (
    <div className="flex gap-2">
      <Avatar
        shape="circle"
        style={{ backgroundColor: "" }}
        size={25}
        src={record.images[0]}
      >
        {/* {record.images[0]} */}
      </Avatar>
      <span className="">{record.brand}</span>
    </div>
  ),
};

export const LastName: ProColumns<any, any> = {
  ...tableCellFixed(100),
  dataIndex: "price",
  title: "Овог",
  render: (_, record) => record.price,
};

export const FirstName: ProColumns<any, any> = {
  ...tableCellFixed(150),
  dataIndex: "title",
  title: "Нэр",
  render: (_, record) => <span className="">{record.title}</span>,
};

export const RegisterID: ProColumns<any, any> = {
  ...tableCellFixed(150),
  dataIndex: "stock",
  align: "center",
  title: "Регистрийн дугаар",
  render: (_, record) => <span className="">{record.stock}</span>,
};

export const Gender: ProColumns<any, any> = {
  ...tableCellFixed(100),
  dataIndex: "service",
  title: "Хүйс",
  render: (_, record) => `${record.discountPercentage || "-"}`,
};
