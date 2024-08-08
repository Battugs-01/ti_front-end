import React, { useRef } from "react";
import { Button, ButtonProps } from "antd"; // Import your component library
import { BiSearch } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { RiFilter3Fill } from "react-icons/ri";
import { CreateButton } from "..";
import refreshIcon from "assets/government/icons/refresh.svg";
import { useDebounceFn } from "ahooks";
import { atom, useAtom } from "jotai";
interface TableHeaderProps {
  customHeaderTitle?: string;
  hideToggle?: boolean;
  hideFilter?: boolean;
  selectedToggle?: string;
  addButtonName?: string;
  handleToggle?: Function;
  hideSearch?: boolean;
  hideCreate?: boolean;
  refresh?: () => void;
  toolbarItems?: React.ReactNode;
  hideCreateButton?: boolean;
  setCreate?: (value: boolean) => void;
  setSearch?: (value: string) => void;
  hideTitle?: boolean;
  searchPlaceHolder?: any;
  leftContent?: any;
  loading?: boolean;
  search?: string;
  store?: any;
}
const init = atom<any>({});

const InitTableHeader: React.FC<TableHeaderProps> = ({
  customHeaderTitle,
  hideToggle,
  hideFilter,
  selectedToggle,
  addButtonName,
  handleToggle,
  hideSearch,
  hideCreate,
  search,
  refresh,
  toolbarItems,
  searchPlaceHolder,
  hideCreateButton,
  hideTitle = false,
  leftContent,
  setCreate,
  setSearch,
  loading,
  store,
}) => {
  const [stre, setStore] = useAtom<any>(store || init);

  const form = useRef<ProFormInstance>();
  const checkIfChanged = () => {
    const { deadline, full_date, ...rest } =
      form.current?.getFieldsValue() || {};
    const arr = Object.values(rest || {});
    return arr.some((el: any) => (el?.length || 0) > 0 && el);
  };
  const searchDebounce = useDebounceFn(
    (value) => {
      store && setStore?.({ ...(stre || {}), query: value });
      setSearch?.(value);
    },
    { wait: 500 }
  );
  return (
    <div className="flex justify-between pt-2 pr-6 pl-6 items-start  pb-4 px-4  custom-ant-item-margin-remove flex-wrap">
      <>
        <div className="flex space-x-2 py-1.5 w-2/5">
          {hideTitle ? (
            leftContent
          ) : (
            <span className="text-gray-900 text-lg font-medium ">
              {customHeaderTitle}
            </span>
          )}
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
              onClick={() => handleToggle?.("list")}
              icon={
                <FaListUl className="text-lg text-primary items-center flex ml-2.5" />
              }
            ></Button>
            <Button
              size="large"
              className={`flex items-center  text-sm gap-2 font-semibold  relative `}
              type={selectedToggle === "grid" ? "primary" : "text"}
              onClick={() => handleToggle?.("grid")}
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
          placeholder={searchPlaceHolder || "Хайх"}
          hidden={hideSearch}
          fieldProps={{
            size: "large",
            className: "text-sm flex",
            prefix: <BiSearch color="#66708066" size={20} />,
            onChange: (e) => {
              searchDebounce.run(e.target.value);
            }, // Add the icon as a prefix here
          }}
        />
        <div>
          <Button
            size="large"
            className={`flex items-center justify-center font-semibold`}
            type="default"
            icon={<img src={refreshIcon} alt="refresh" />}
            onClick={() => refresh?.()}
          ></Button>
          {/* <img src={refreshIcon} alt="refresh" onClick={() => refresh?.()} /> */}
        </div>
        {toolbarItems}
        {!hideCreate ? (
          <CreateButton
            size="large"
            className={`${hideCreateButton && "hidden"}`}
            onClick={() => setCreate?.(true)}
            addButtonName={addButtonName}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InitTableHeader;
