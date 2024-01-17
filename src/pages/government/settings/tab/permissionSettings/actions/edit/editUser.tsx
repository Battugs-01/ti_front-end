import { IModalForm } from "components/modal";
import { ItemInterface } from "service/gov-settings";
import { UserForm } from "../create/userForm";
import governmentUser from "service/gov-settings/request";

type EditUserType = {
  // data?:;
  isOpenModal?: boolean;
  cancelModal?: () => void;
};

export const EditUser: React.FC<EditUserType> = ({
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
          return governmentUser.create({ ...values });
        }}
      >
        <UserForm />
      </IModalForm>
    </div>
  );
};
