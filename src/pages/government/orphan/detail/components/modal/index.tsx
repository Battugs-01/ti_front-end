import { Button, Modal } from "antd";
import { ConfirmButton } from "components/button/action";
import { Fragment } from "react";

type ModalType = {
  isModalOpen?: boolean;
  handleCancel?: any;
  handleOk?: any;
  title?: String;
  content?: String;
  width?: number;
};

export const ConfirmModal: React.FC<ModalType> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  title,
  content,
  width,
}) => {
  return (
    <Modal
      title={
        <div className="p-6">
          <div className="font-semibold">{title}</div>
        </div>
      }
      open={isModalOpen}
      width={width}
      onCancel={handleCancel}
      footer={() => {
        return (
          <div className="p-6">
            <Button type="default" onClick={handleCancel}>
              Болих
            </Button>
            <ConfirmButton title="Магадлан итгэмжлэх" onClick={handleOk} />
          </div>
        );
      }}
    >
      <div className="text-sm">{content}</div>
    </Modal>
  );
};
