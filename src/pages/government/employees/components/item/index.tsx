import { Avatar, Badge, notification } from "antd";
import IBadge from "components/badge";
import PhoneIcon from "assets/government/icons/phone.svg";
import MailIcon from "assets/government/icons/mail.svg";
import { CustomButton } from "pages/government/components/button";
import { EmployeeInterface } from "service/gov-employees/type";
import { EditOutlined } from "@ant-design/icons";
import { DeleteButton } from "components/index";
import { useState } from "react";
import { IModalForm, RemoveModal } from "components/modal";
import { UpdateForm } from "../../action/UpdateForm";
import { useRequest } from "ahooks";
import employee from "service/gov-employees";
import { FormInstance } from "antd/lib";
import file from "service/file";
import { useAuthContext } from "context/auth";

const color = "#144E5A";

type ItemType = {
  data?: EmployeeInterface;
  form?: FormInstance;
  refreshList?: () => void;
};

export const Item: React.FC<ItemType> = ({ data, form, refreshList }) => {
  const [update, setUpdate] = useState<EmployeeInterface>();
  const [isDelete, setDelete] = useState<EmployeeInterface>();
  const updateEmployee = useRequest(employee?.employeeEdit, {
    manual: true,
    onSuccess: () => {
      setUpdate(undefined);
      refreshList && refreshList();
    },
  });
  const deleteEmployee = useRequest(employee?.employeeDelete, {
    manual: true,
    onSuccess: () => {
      setDelete(undefined);
      refreshList && refreshList();
    },
  });
  // const [delete]
  const cancelModal = () => {
    setUpdate(undefined);
  };
  const cancelDeleteModal = () => {
    setDelete(undefined);
  };
  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const newFileUpload = async (files: any[]) => {
    if (!files[0]?.uid.includes("rc-upload")) {
      return parseInt(files[0]?.uid);
    }
    const file = await upload.runAsync({
      file: files[0].originFileObj,
    });
    return file[0].id;
  };

  const [{ user }] = useAuthContext();

  return (
    <div
      className="bg-white w-full text-base"
      style={{
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="w-full p-4 flex items-center justify-between flex-wrap 3xl:flex-nowrap gap-3">
        <div className="flex items-center gap-2 flex-wrap 2xl:flex-nowrap">
          <Avatar
            size={36}
            src={file.fileToUrl(data?.profile?.physical_path || "")}
            style={{ background: color }}
            shape="circle"
          >
            {"BA"}
          </Avatar>
          <div className="font-bold uppercase">{data?.first_name}</div>
          <div>{data?.last_name}</div>
          <IBadge color="gray" title={data?.position} />
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={PhoneIcon} />
            <div className="text-sm font-normal">{data?.phone}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={MailIcon} />
            <div className="text-sm font-normal">{data?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:flex-nowrap">
          <CustomButton
            icon={<EditOutlined rev={undefined} />}
            title="Засах"
            onClick={() => setUpdate(data)}
          />
          {user?.id !== data?.id ? (
            <DeleteButton title={"Устгах"} onClick={() => setDelete(data)} />
          ) : (
            ""
          )}
        </div>
      </div>
      {update && (
        <IModalForm
          open={!!update}
          width={724}
          title="Ажилтан засах"
          modalProps={{ onCancel: cancelModal }}
          okText="Хадгалах"
          onRequest={async (values) => {
            values.profile = await newFileUpload(values?.profile);

            return updateEmployee.runAsync(
              { ...values, profile_id: values?.profile },
              update.id
            );
          }}
        >
          <UpdateForm data={update} form={form} />
        </IModalForm>
      )}
      {isDelete && (
        <RemoveModal
          remove
          display={
            <div className="text-xl">
              Та {isDelete?.first_name} ажилтаныг устгах гэж байна. Та итгэлтэй
              байна уу?
            </div>
          }
          open={!!isDelete}
          width={724}
          title="Ажилтан устгах"
          onCancel={cancelDeleteModal}
          // okText="Устгах"
          onRequest={async () => {
            return deleteEmployee.runAsync(isDelete.id);
          }}
        />
      )}
    </div>
  );
};
