import {
  ProFormUploadButton,
  ProFormUploadButtonProps,
  ProFormUploadDragger,
  ProFormUploadDraggerProps,
} from "@ant-design/pro-form";
import { FieldRequireMessage } from "config";
import EditIcon from "assets/icons/featured-icon.svg";
import { formatKB, formatMB } from "utils/index";
import FilesImage from "assets/icons/files.svg";
import Trash from "assets/icons/trash.svg";
import { CloudDownloadOutlined } from "@ant-design/icons";

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
          <div className="w-full h-full bg-[#E7EDEE] space-x-2 text-sm text-gray-600">
            <div className="text-primary">
              <div>
                <img src={EditIcon} />
              </div>
              <span className=" font-semibold  text-[#144E5A] mr-1">
                Файл хавсаргах
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
  title = "Файл хавсаргах",
  required = true,
  label = "Файл",
  ...rest
}: PropsUpload) => {
  return (
    <div id={`${rest.name}`} className="custom-btn-remove-bg">
      <ProFormUploadButton
        {...rest}
        title={title}
        label={label}
        // max={1}
        width={400}
        fieldProps={{
          beforeUpload: (_) => false,
          multiple: true,
          itemRender: (originNode, file, fileList, actions) => {
            return (
              <div className="flex justify-between items-center bg-[#E7EDEE] rounded-xl p-4 my-2">
                <div className="flex gap-3 items-center justify-center">
                  <img src={FilesImage} alt="file image" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium m-0 p-0">{file.name}</p>
                    <p className="text-[#475467] font-normal text-sm p-0 m-0">
                      {formatKB(file.size!, 1)}
                    </p>
                  </div>
                </div>
                <img src={Trash} alt="trash" onClick={() => actions.remove()} />
              </div>
            );
          },
        }}
        className="w-full"
        icon={<CloudDownloadOutlined rev={undefined} />}
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
