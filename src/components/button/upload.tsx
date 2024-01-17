import {
  ProFormUploadButton,
  ProFormUploadButtonProps,
  ProFormUploadDragger,
  ProFormUploadDraggerProps,
} from "@ant-design/pro-form";
import { FieldRequireMessage } from "config";
import EditIcon from "assets/icons/featured-icon.svg";
type PropsDragger = ProFormUploadDraggerProps & {
  validator?: (value: any) => Promise<any>;
  required?: boolean;
};
export const UploadDraggerButton = ({
  validator,
  required = true,
  ...rest
}: PropsDragger) => {
  return (
    <div id={`${rest.name}`}>
      <ProFormUploadDragger
        {...rest}
        title={
          <div className="w-full h-full space-x-2 text-sm text-gray-600">
            <div className="text-primary">
              <div>
                <img src={EditIcon} />
              </div>
              <span className=" font-semibold  text-[#144E5A] mr-1">
                Файл оруулах
              </span>
            </div>
            <div className="">SVG,PNG,JPG or GIF (Хэмжээ :800*400px)</div>
          </div>
        }
        icon={false}
        description={false}
        fieldProps={{
          beforeUpload: (file) => false,
          listType: "picture",
          multiple: true,
          ...{ ...(rest.fieldProps && rest.fieldProps) },
        }}
        rules={
          required
            ? validator
              ? [
                  {
                    required: true,
                    validator: (_, value) => {
                      return validator(value);
                    },
                  },
                ]
              : [
                  {
                    message: FieldRequireMessage,
                    required: true,
                  },
                ]
            : undefined
        }
      />
    </div>
  );
};

type PropsUpload = ProFormUploadButtonProps & {};

export const UploadButton = ({
  title = "Logo upload",
  required = true,
  ...rest
}: PropsUpload) => {
  return (
    <div id={`${rest.name}`}>
      <ProFormUploadButton
        {...rest}
        title={title}
        max={1}
        fieldProps={{
          beforeUpload: (_) => false,
        }}
        rules={
          required
            ? [
                {
                  message: FieldRequireMessage,
                  required: true,
                },
              ]
            : undefined
        }
      />
    </div>
  );
};
