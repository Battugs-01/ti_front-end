import { IModalForm } from "components/modal";
import { ItemInterface } from "service/gov-settings";
import { UserForm } from "./userForm";
import governmentUser from "service/gov-settings/request";

type CreateOrphanType = {
  isOpenModal?: boolean;
  cancelModal?: () => void;
  onSuccess?: () => void;
};

export const CreateUser: React.FC<CreateOrphanType> = ({
  isOpenModal,
  cancelModal,
  onSuccess,
}) => {
  return (
    <div>
      <IModalForm
        successData={onSuccess}
        title={"Нэмэх"}
        open={isOpenModal}
        okText="Нэмэх"
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
