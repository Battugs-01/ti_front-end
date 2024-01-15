import { ProFormText } from "@ant-design/pro-form";
import { SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { ClauseForm } from "./clauseForm";

type CreateClauseType = {
  openModal?: boolean;
  cancelModal?: () => void;
};

export const CreateClause: React.FC<CreateClauseType> = ({
  openModal,
  cancelModal,
}) => {
  return (
    <IModalForm
      open={openModal}
      width={700}
      title="Заалт нэмэх"
      cancelText="Болих"
      okText="Нэмэх"
      modalProps={{ onCancel: cancelModal }}
    >
      <ClauseForm />
    </IModalForm>
  );
};
