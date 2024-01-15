import { IModalForm } from "components/modal";
import { ItemInterface } from "service/gov-settings";
import { OrphanForm } from "./orphanForm";

type CreateOrphanType = {
  data?: ItemInterface;
  id?: number;
  openModal?: boolean;
  cancelModal?: () => void;
};

export const CreateOrphan: React.FC<CreateOrphanType> = ({
  data,
  openModal,
  cancelModal,
}) => {
  return (
    <div>
      <IModalForm
        title={data?.orphanName}
        open={openModal}
        okText="Нэмэх"
        cancelText="Болих"
        modalProps={{ onCancel: cancelModal }}
      >
        <OrphanForm data={data} />
      </IModalForm>
    </div>
  );
};
