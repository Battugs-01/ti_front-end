import { IModalForm } from "components/modal";
import { ItemInterface, UserList } from "service/gov-settings";
import { UserForm } from "./userForm/index";
import governmentUser from "service/gov-settings/request";
import { useRequest } from "ahooks";

type EditUserType = {
  id?: number;
  isOpenModal?: boolean;
  cancelModal?: () => void;
};

export const EditUser: React.FC<EditUserType> = ({
  id,
  isOpenModal,
  cancelModal,
}) => {
  const userInfo = useRequest(() => governmentUser.getUser(id));
  return (
    <div>
      <IModalForm
        onSuccess={() => cancelModal}
        title={"Засах"}
        open={isOpenModal}
        okText="Засах"
        cancelText="Болих"
        modalProps={{ onCancel: cancelModal }}
        onRequest={async (values) => {
          return governmentUser.updateUser({ ...values }, id);
        }}
      >
        <UserForm data={userInfo?.data} />
      </IModalForm>
    </div>
  );
};
