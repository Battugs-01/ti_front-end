import { FormInterface } from "service/gov-settings";
import FileTextIcon from "assets/government/icons/file-text.svg";
import EyeIcon from "assets/government/icons/eye.svg";
import { CustomButton } from "pages/government/components/button";
import { Link } from "react-router-dom";

export const Item: React.FC<FormInterface> = ({ formTitle, formNo, id }) => {
  return (
    <div className="p-4 w-full">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-11/12">
          <div>
            <img src={FileTextIcon} alt="file-text" />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="font-bold">{formTitle}</div>
            <div className="text-sm">
              Маягтын дугаар: <span className="font-bold">{formNo}</span>
            </div>
          </div>
        </div>
        <div className="w-1/12 text-center flex justify-end items-center">
          <Link to={`${id}`} className="text-gray-700">
            <CustomButton title="Харах" icon={<img src={EyeIcon} />} />
          </Link>
        </div>
      </div>
    </div>
  );
};
