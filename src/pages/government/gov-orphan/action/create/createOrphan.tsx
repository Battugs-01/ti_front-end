import { IModalForm } from "components/modal";
import { OrphanForm } from "./orphanForm/index";
import orphanUser from "service/gov-orphan/requests";
import { useRequest } from "ahooks";
import uploadFile from "service/uploadFile";
import { CardInterface } from "service/gov-orphan";

type CreateOrphanType = {
  openModal?: boolean;
  cancelModal?: () => void;
};

export const CreateOrphan: React.FC<CreateOrphanType> = ({
  openModal,
  cancelModal,
}) => {
  const uploadImage = useRequest(uploadFile.create, {
    manual: true,
  });
  return (
    <IModalForm
      open={openModal}
      width={700}
      title="Нэмэх"
      cancelText="Болих"
      okText="Нэмэх"
      modalProps={{ onCancel: cancelModal }}
      onRequest={async (values) => {
        // uploadImage.runAsync(values?.files);
        return orphanUser.create({
          contact: {
            first_name: values?.first_name,
            last_name: values?.last_name,
            phone: values?.phone,
            position: "Position",
          },
          is_active: values?.is_active,
          logo_id: 2,
          email: values?.email,
          organization_name: values?.organization_name,
          password: values?.password,
          payment: {
            account_number: values?.account_number,
            bank_name: values?.bank_name,
            reciever_name: values?.reciever_name,
          },
        });
      }}
    >
      <OrphanForm />
    </IModalForm>
  );
};
