import React, { useRef } from "react";
import { Button } from "antd"; // Import your component library
import { BiSearch } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import refreshIcon from "assets/icons/Button.svg";
import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { RiFilter3Fill } from "react-icons/ri";
import { CreateButton } from "..";

interface TableHeaderProps {
  customHeaderTitle: string;
  hideToggle?: boolean;
  hideFilter?: boolean;
  selectedToggle: string;
  handleToggle: Function;
  hideSearch?: boolean;
  refresh?: () => void;
  toolbarItems: React.ReactNode;
  hideCreateButton?: boolean;
  setCreate?: (value: boolean) => void;
}

const InitTableHeader: React.FC<TableHeaderProps> = ({
  customHeaderTitle,
  hideToggle,
  hideFilter,
  selectedToggle,
  handleToggle,
  hideSearch,
  refresh,
  toolbarItems,
  hideCreateButton,
  setCreate,
}) => {
  const form = useRef<ProFormInstance>();

  const checkIfChanged = () => {
    const { deadline, full_date, ...rest } =
      form.current?.getFieldsValue() || {};
    const arr = Object.values(rest || {});
    return arr.some((el: any) => (el?.length || 0) > 0 && el);
  };

  return (
    <div className="flex justify-between pt-2 pr-6 pb-0 pl-6">
      <>
        <div className="flex space-x-2 py-1.5">
          <span className="text-gray-900 text-lg font-medium">
            {customHeaderTitle}
          </span>
        </div>
      </>
      <div className="flex gap-2 flex-wrap">
        {hideToggle ? (
          <div className="flex">
            <Button
              size="large"
              className={`flex items-center  text-sm gap-2 font-semibold  relative ${
                hideFilter && "hidden"
              }`}
              type={selectedToggle === "list" ? "primary" : "text"}
              onClick={() => handleToggle("list")}
              icon={
                <FaListUl className="text-lg text-primary items-center flex ml-2.5" />
              }
            ></Button>
            <Button
              size="large"
              className={`flex items-center  text-sm gap-2 font-semibold  relative `}
              type={selectedToggle === "grid" ? "primary" : "text"}
              onClick={() => handleToggle("grid")}
              icon={
                <CiGrid41 className="text-lg text-primary items-center flex ml-2.5" />
              }
            ></Button>
          </div>
        ) : (
          ""
        )}
        <Button
          size="large"
          className={`flex items-center  text-sm gap-2 font-semibold  relative`}
          icon={
            <RiFilter3Fill className="text-lg text-primary items-center flex ml-2.5" />
          }
        >
          {checkIfChanged() && (
            <div className="absolute -top-1 -right-1 w-2 z-[10] h-2 bg-red-500 rounded-full"></div>
          )}
        </Button>
        <ProFormText
          name={"text"}
          placeholder={"Хайх"}
          hidden={hideSearch}
          fieldProps={{
            size: "large",
            className: "text-sm flex",
            prefix: <BiSearch color="#66708066" size={20} />, // Add the icon as a prefix here
          }}
        />
        <div className="">
          <img src={refreshIcon} alt="refresh" onClick={() => refresh?.()} />
        </div>
        {toolbarItems}
        <CreateButton
          size="large"
          className={`${hideCreateButton && "hidden"}`}
          onClick={() => setCreate?.(true)}
        />
      </div>
    </div>
  );
};

export default InitTableHeader;
