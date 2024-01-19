import { useRequest } from "ahooks";
import { Avatar, Badge, notification } from "antd";
import EditIcon from "assets/government/icons/editButton.svg";
import MailIcon from "assets/government/icons/mail.svg";
import PhoneIcon from "assets/government/icons/phone.svg";
import TrashIcon from "assets/government/icons/trashButton.svg";
import IBadge from "components/badge";
import { CustomButton } from "pages/government/components/button";
import { useState } from "react";
import { UserList } from "service/gov-settings";
import governmentUser from "service/gov-settings/request";
import { EditUser } from "./actions/edit/editUser";

type ItemType = {
  data?: UserList;
  refresh?: () => void;
};

export const Item: React.FC<ItemType> = ({ data, refresh }) => {
  const [editModal, setEditModal] = useState<boolean>(false);

  const userInfo = useRequest(() => governmentUser.getUser(data?.id), {
    manual: true,
    onSuccess: () => {
      setEditModal(true);
    },
  });

  const userDelete = useRequest(() => governmentUser.deleteUser(data?.id), {
    manual: true,
    onSuccess: () => {
      refresh && refresh();
      notification?.success({ message: "Амжилттай устлаа" });
    },
  });

  const cancelModal = () => {
    setEditModal(false);
  };
  const deleteUser = () => {
    userDelete.run();
  };
  return (
    <div
      className="w-full text-base"
      style={{ borderBottom: "1px solid #EAECF0" }}
    >
      <div className="w-full flex items-center p-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            size={36}
            style={{ background: "#144E5A" }}
            shape="circle"
            className="uppercase"
          >
            {data?.email?.substring(0, 2)}
          </Avatar>
          <div className="font-bold">{data?.first_name}</div>
          <div>{data?.last_name}</div>
          <IBadge color="gray" title={data?.position} />
          <Badge status="default" />
          <div className="flex items-center gap-1 text-sm">
            <img src={PhoneIcon} />
            <div>{data?.phone}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1 text-sm">
            <img src={MailIcon} />
            <div>{data?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <CustomButton
            title="Засах"
            icon={<img src={EditIcon} />}
            onClick={() => userInfo?.run()}
          />
          <CustomButton
            title="Устгах"
            icon={<img src={TrashIcon} />}
            isDelete
            onClick={deleteUser}
          />
        </div>
      </div>
      <EditUser
        isOpenModal={editModal}
        cancelModal={cancelModal}
        data={userInfo?.data}
      />
    </div>
  );
};
