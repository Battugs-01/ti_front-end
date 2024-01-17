import { IModalForm } from "components/modal";
import { OrphanForm } from "./orphanForm";

type CreateOrphanType = {
  openModal?: boolean;
  cancelModal?: () => void;
};

export const CreateOrphan: React.FC<CreateOrphanType> = ({
  openModal,
  cancelModal,
}) => {
  return (
    <IModalForm
      open={openModal}
      width={700}
      title="Нэмэх"
      cancelText="Болих"
      okText="Нэмэх"
      modalProps={{ onCancel: cancelModal }}
    >
      <OrphanForm />
    </IModalForm>
  );
};
