import { Avatar } from "antd";
import CheckIcon from "assets/government/icons/check_border.svg";
import moment from "moment";
import { File } from "pages/government/components/file";
import { ElderlyInterface } from "service/social-worker/customer/type";

type MigrationType = {
  data?: ElderlyInterface;
};

export const Migration: React.FC<MigrationType> = ({ data }) => {
  return (
    <div className="mt-5">
      <div>
        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src={CheckIcon} />
          </div>
          <div className="flex-col flex gap-1 items-start">
            <div className="font-medium">Бүртгэл үүслээ</div>
            <div>{moment(data?.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
          </div>
        </div>
        <div className="ml-16 flex-col flex gap-3 mt-3">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              ХУ
            </div>
            <div className="flex-col flex gap-1 items-start">
              <div className="font-medium">Б.Хулан</div>
              <div>БГД 2-р хорооны нийгмийн ажилтан</div>
            </div>
          </div>
          <File
            size={data?.definition_governor[0]?.file_size}
            file_name={data?.definition_governor[0]?.original_name}
            path={data?.definition_governor[0]?.physical_path}
          />
          <File
            path={data?.definition_governor[0]?.physical_path}
            size={data?.definition_governor[0]?.file_size}
            file_name={data?.definition_governor[0]?.original_name}
          />
        </div>
      </div>
    </div>
  );
};
