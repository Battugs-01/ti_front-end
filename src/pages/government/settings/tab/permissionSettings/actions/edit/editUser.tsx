import { IModalForm } from "components/modal";
import { ItemInterface, UserList } from "service/gov-settings";
import { UserForm } from "./userForm/index";
import governmentUser from "service/gov-settings/request";

type EditUserType = {
  data?:UserList;
  isOpenModal?: boolean;
  cancelModal?: () => void;
};

export const EditUser: React.FC<EditUserType> = ({
  data,
  isOpenModal,
  cancelModal,
}) => {
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
          return governmentUser.updateUser({ ...values },data?.id);
        }}
      >
        <UserForm data={data}/>
      </IModalForm>
    </div>
  );
};
