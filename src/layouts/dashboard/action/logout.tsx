import { ModalForm } from "@ant-design/pro-form";
import { Button } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { Logout04 } from "untitledui-js-base";

interface Logout {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const Logout: React.FC<Logout> = ({ visible, onClose, onFinish }) => {
  return (
    <ModalForm
      title={
        <Logout04
          size="20"
          className="text-[#F04438] rounded-full bg-[#FEE4E2] p-2 border-[#FEF3F2] border-8 border-solid"
        />
      }
      width={400}
      open={visible}
      modalProps={{
        onCancel: onClose,
        styles: {
          header: {
            padding: "1rem 1.5rem 0 1.5rem",
          },
          content: {
            padding: "0",
          },
          body: {
            padding: "0 1.5rem 1.2rem 1.5rem",
          },
          footer: {
            padding: "0 1.5rem 1.2rem 1.5rem",
          },
        },
      }}
      submitter={{
        render: () => {
          return (
            <div className="flex items-center gap-4 w-full">
              <Button
                onClick={onClose}
                size="large"
                type="default"
                className="w-1/2"
              >
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={() => {
                  onFinish?.();
                }}
                className="w-1/2"
                size="large"
                type="primary"
              >
                <FormattedMessage id="yes" />
              </Button>
            </div>
          );
        },
      }}
    >
      <div className="font-semibold text-lg">
        <FormattedMessage id="logout_message" />
      </div>
    </ModalForm>
  );
};
