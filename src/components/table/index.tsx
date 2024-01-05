import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import ProTable, {
  ActionType,
  ProColumns,
  ProTableProps,
} from "@ant-design/pro-table";
import { Button, Card } from "antd";
import refreshIcon from "assets/icons/Button.svg";
import { RemoveModal } from "components/modal";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import { RiFilter3Fill } from "react-icons/ri";
import { ActionComponentProps, RemoveModelConfig } from "types";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  EditButton,
  InActiveButton,
  StopPagination,
} from "..";
type Props<T> = ProTableProps<T, any, any> & {
  CreateComponent?: React.FC<ActionComponentProps<T>>;
  DetailComponent?: React.FC<ActionComponentProps<T>>;
  UpdateComponent?: React.FC<ActionComponentProps<T>>;
  RemoveComponent?: React.FC<ActionComponentProps<T>>;
  columns?: ProColumns<T, any>[];
  hideAction?: boolean;
  total?: number;
  hideSearch?: boolean;
  hideFilter?: boolean;
  hideCreateButton?: boolean;
  refresh?: (value?: any) => void;
  toolbarItems?: React.ReactNode;
  details?: T[];
  title?: string;
  customActions?: (value: T) => React.ReactNode;
  RemoveModelConfig?: RemoveModelConfig<T>;
  DeActivateModelConfig?: RemoveModelConfig<T>;
  onPaginationChange?: (page: number, pageSize: number) => void;
  hideEditButton?: (record: any) => boolean;
  hideInActiveButton?: (record: any) => boolean;
  showDetailButton?: boolean;
  customHeaderTitle?: React.ReactNode;
  noShadow?: boolean;
  selectedId?: number;
  hideToggle?: boolean;
  page?: number;
  limit?: number;
};

export const ITable = <T extends {}>({
  CreateComponent,
  UpdateComponent,
  DetailComponent,
  title,
  hideSearch,
  hideFilter,
  hideToggle = false,
  RemoveComponent,
  columns,
  hideAction = false,
  total,
  hideCreateButton = false,
  toolbarItems,
  refresh,
  details,
  customActions,
  RemoveModelConfig,
  DeActivateModelConfig,
  onPaginationChange,
  hideEditButton,
  hideInActiveButton,
  showDetailButton = false,
  customHeaderTitle,
  noShadow = false,
  selectedId,
  page,
  limit,
  ...rest
}: Props<T>) => {
  const [pageData, setPageData] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: limit ?? 20,
  });
  const actionRef = useRef<ActionType>();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState<T>();
  const [detail, setDetail] = useState<T>();
  const [remove, setRemove] = useState<T>();
  const [deactivate, setDeactivate] = useState<T>();
  const [selectedToggle, setSelectedToggle] = useState<string>("list");

  const form = useRef<ProFormInstance>();
  const checkIfChanged = () => {
    const { deadline, full_date, ...rest } =
      form.current?.getFieldsValue() || {};
    const arr = Object.values(rest || {});
    return arr.some((el: any) => (el?.length || 0) > 0 && el);
  };
  const handleToggle = (toggleType: string) => {
    setSelectedToggle(toggleType);
  };
  return (
    <>
      <Card
        bodyStyle={{
          padding: "0px",
        }}
      >
        <div className="flex justify-between pt-6 pr-6 pb-0 pl-6">
          {
            <>
              <div className="flex space-x-2 py-1.5">
                <span className="text-gray-900 text-lg font-medium">
                  {customHeaderTitle}
                </span>
              </div>
              {rest.headerTitle}
            </>
          }
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
              <img
                src={refreshIcon}
                alt="refresh"
                onClick={() => refresh?.()}
              />
            </div>
            {toolbarItems}
            <CreateButton
              size="large"
              className={`${hideCreateButton && "hidden"}`}
              onClick={() => setCreate(true)}
            />
          </div>
        </div>
        {selectedToggle === "list" ? (
          <ProTable
            className="p-0 m-0"
            id="main-table"
            onRow={(record) => {
              return {
                onClick: () => {
                  if (DetailComponent) {
                    setDetail(record);
                  }
                },
                className: DetailComponent && "cursor-pointer",
              };
            }}
            {...rest}
            actionRef={actionRef}
            options={{
              // reload: () => {
              //   refresh?.();
              // },
              reload: false,
              setting: false,
              density: false,
            }}
            rowKey={`id`}
            scroll={{ x: "auto" }}
            size="small"
            search={false}
            pagination={{
              className: "px-6 font-semibold text-gray-500",
              pageSize: pageData.limit,
              pageSizeOptions: [20, 50, 100, 200, 500],
              showSizeChanger: true,
              onChange: (page, size) => {
                setPageData({ page, limit: size });
                refresh &&
                  refresh({ page: page ? page - 1 : page, limit: size });
              },
              showTotal: (total, range) => {
                return (
                  <div className="font-semibold text-gray-500">
                    {range[0]}-{range[1]} of {total} items
                  </div>
                );
              },
              total,
              showLessItems: true,
              onShowSizeChange: (page, size) => {
                setPageData({ page, limit: size });
                refresh &&
                  refresh({ page: page ? page - 1 : page, limit: size });
              },

              responsive: true,
            }}
            columns={[
              {
                title: "№",
                align: "center",
                width: 30,
                fixed: "left",
                dataIndex: "index",
                valueType: "index",
                className: "text-gray-600",
                render: (_value, _record, index) =>
                  (pageData.page || 1) * (pageData.limit || 1) +
                  (index + 1) -
                  (pageData.limit || 1),
              },
              ...(columns as any),
              {
                hideInTable: hideAction,
                title: "",
                fixed: "right",
                dataIndex: "action",
                align: "right",

                render: (_, record) => {
                  return (
                    <StopPagination>
                      <div className="gap-2 flex  items-center">
                        {customActions && customActions(record)}
                        {showDetailButton && (
                          <DetailButton
                            onClick={() => {
                              setDetail(record);
                            }}
                          />
                        )}
                        {UpdateComponent && (
                          <EditButton
                            style={{
                              opacity: hideEditButton?.(record) ? 0.5 : 1,
                              cursor: hideEditButton?.(record)
                                ? "not-allowed"
                                : "pointer",
                            }}
                            onClick={() => {
                              hideEditButton?.(record)
                                ? null
                                : setUpdate(record);
                            }}
                          />
                        )}
                        {(RemoveModelConfig || RemoveComponent) && (
                          <DeleteButton
                            onClick={() => {
                              setRemove(record);
                            }}
                          />
                        )}

                        {DeActivateModelConfig && (
                          <InActiveButton
                            style={{
                              opacity: hideEditButton?.(record) ? 0.5 : 1,
                              cursor: hideEditButton?.(record)
                                ? "not-allowed"
                                : "pointer",
                            }}
                            onClick={() => {
                              hideEditButton?.(record)
                                ? null
                                : setDeactivate(record);
                            }}
                          />
                        )}
                      </div>
                    </StopPagination>
                  );
                },
              },
            ]}
          />
        ) : (
          <div>sda</div>
        )}
      </Card>
      {CreateComponent && (
        <CreateComponent
          open={create}
          onCancel={() => setCreate(false)}
          onFinish={() => {
            setCreate(false);
            refresh &&
              refresh({
                ...pageData,
                page: pageData.page ? pageData.page - 1 : 0,
              });
          }}
          details={details}
        />
      )}
      {UpdateComponent && (
        <UpdateComponent
          open={!!update}
          onCancel={() => setUpdate(undefined)}
          detail={update}
          onFinish={() => {
            setUpdate(undefined);
            refresh &&
              refresh({
                ...pageData,
                page: pageData.page ? pageData.page - 1 : 0,
              });
          }}
          details={details}
        />
      )}
      {DetailComponent && (
        <DetailComponent
          open={!!detail}
          detail={detail}
          onCancel={() => setDetail(undefined)}
          details={details}
        />
      )}
      {RemoveComponent && (
        <RemoveComponent
          open={!!remove}
          onCancel={() => setRemove(undefined)}
          detail={remove}
          onFinish={() => {
            setRemove(undefined);
            refresh &&
              refresh({
                ...pageData,
                page: pageData.page ? pageData.page - 1 : 0,
              });
          }}
          details={details}
        />
      )}
      {RemoveModelConfig && (
        <RemoveModal
          {...RemoveModelConfig.config(remove as any)}
          open={!!remove}
          onDone={() => {
            refresh &&
              refresh({
                ...pageData,
                page: pageData.page ? pageData.page - 1 : 0,
              });
            setRemove(undefined);
          }}
          onCancel={() => setRemove(undefined)}
          onRequest={RemoveModelConfig.action}
          remove={true}
        />
      )}
      {DeActivateModelConfig && (
        <RemoveModal
          {...DeActivateModelConfig.config(deactivate as any)}
          open={!!deactivate}
          onDone={() => {
            refresh &&
              refresh({
                ...pageData,
                page: pageData.page ? pageData.page - 1 : 0,
              });
            setDeactivate(undefined);
          }}
          onRequest={DeActivateModelConfig.action}
          onCancel={() => setDeactivate(undefined)}
          remove={false}
        />
      )}
    </>
  );
};
