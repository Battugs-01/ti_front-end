import { useRequest } from "ahooks";
import { Avatar, Badge, notification } from "antd";
import { FormInstance } from "antd/lib";
import MailIcon from "assets/government/icons/mail.svg";
import PhoneIcon from "assets/government/icons/phone.svg";
import IBadge from "components/badge";
import { DetailButton, EditButton } from "components/button/action";
import { DeleteButton } from "components/index";
import { IModalForm, RemoveModal } from "components/modal";
import { useAuthContext } from "context/auth";
import { useState } from "react";
import file from "service/file";
import permission from "service/settings/permission";

const color = "#144E5A";

type ItemType = {
  data?: any;
  form?: FormInstance;
  refreshList?: () => void;
};

export const Item: React.FC<ItemType> = ({ data, form, refreshList }) => {
  const [update, setUpdate] = useState<any>();
  const [isDelete, setDelete] = useState<any>();

  const updateEmployee = useRequest(permission?.get, {
    manual: true,
    onSuccess: () => {
      setUpdate(undefined);
      refreshList && refreshList();
    },
  });

  const deleteEmployee = useRequest(permission?.get, {
    manual: true,
    onSuccess: () => {
      setDelete(undefined);
      refreshList && refreshList();
    },
  });

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
        <div className="gap-3 flex items-center justify-end mr-10">
          <DetailButton
            title="Засах"
            onClick={() => setDetail(data)}
            style={{ opacity: 1, cursor: "pointer" }}
          />
          <EditButton
            title="Засах"
            onClick={() => setUpdate(data)}
            style={{ opacity: 1, cursor: "pointer" }}
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
          title="Edit member"
          modalProps={{ onCancel: cancelModal }}
          okText="Save"
          onRequest={async (values) => {
            values.profile = await newFileUpload(values?.profile);

            return updateEmployee.runAsync({
              ...values,
              profile_id: values?.profile,
            });
          }}
        >
          <div>sda</div>
          {/* <UpdateForm data={update} form={form} /> */}
        </IModalForm>
      )}
      {isDelete && (
        <RemoveModal
          remove
          display={
            <div className="text-lg">
              Та {isDelete?.first_name} ажилтаныг устгах гэж байна. Та итгэлтэй
              байна уу?
            </div>
          }
          open={!!isDelete}
          width={724}
          title="Delete member"
          onCancel={cancelDeleteModal}
          onRequest={async () => {
            return deleteEmployee.runAsync(isDelete.id);
          }}
        />
      )}
    </div>
  );
};
