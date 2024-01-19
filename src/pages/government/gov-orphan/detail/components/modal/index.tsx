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
      title={title}
      open={isModalOpen}
      width={width}
      onCancel={handleCancel}
      footer={() => {
        return (
          <Fragment>
            <Button type="default" onClick={handleCancel}>
              Болих
            </Button>
            <ConfirmButton title="Магадлан итгэмжлэх" onClick={handleOk} />
          </Fragment>
        );
      }}
    >
      <div className="text-sm">{content}</div>
    </Modal>
  );
};
