import ProTable, {
  ActionType,
  ProColumns,
  ProTableProps,
} from "@ant-design/pro-table";
import { RemoveModal } from "components/modal";
import React, { useRef, useState } from "react";
import { ActionComponentProps, RemoveModelConfig } from "types";
import {
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
  refresh?: (value?: any) => void;
  details?: T[];
  create: boolean;
  customActions?: (value: T) => React.ReactNode;
  RemoveModelConfig?: RemoveModelConfig<T>;
  DeActivateModelConfig?: RemoveModelConfig<T>;
  onPaginationChange?: (page: number, pageSize: number) => void;
  hideEditButton?: (record: any) => boolean;
  hideInActiveButton?: (record: any) => boolean;
  showDetailButton?: (record: any) => boolean;
  noShadow?: boolean;
  selectedId?: number;
  page?: number;
  limit?: number;
  setCreate?: Function;
  // customListType? : (records) => void
};

export const ITable = <T extends {}>({
  CreateComponent,
  UpdateComponent,
  DetailComponent,
  RemoveComponent,
  create,
  setCreate,
  columns,
  hideAction = false,
  total,
  refresh,
  details,
  customActions,
  RemoveModelConfig,
  DeActivateModelConfig,
  onPaginationChange,
  hideEditButton,
  showDetailButton,
  noShadow = false,
  page,
  limit,
  ...rest
}: Props<T>) => {
  const [pageData, setPageData] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: limit ?? 20,
  });
  const actionRef = useRef<ActionType>();
  const [update, setUpdate] = useState<T>();
  const [detail, setDetail] = useState<T>();
  const [remove, setRemove] = useState<T>();
  const [deactivate, setDeactivate] = useState<T>();

  return (
    <>
      <ProTable
        className="p-0 m-0"
        id="main-table"
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
        // scroll={{ x: "auto" }}
        size="small"
        search={false}
        pagination={{
          className: "px-6 font-semibold text-gray-500",
          pageSize: pageData.limit,
          pageSizeOptions: [20, 50, 100, 200, 500],
          showSizeChanger: true,
          onChange: (page, size) => {
            setPageData({ page, limit: size });
            refresh && refresh({ page: page ? page - 1 : page, limit: size });
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
            refresh && refresh({ page: page ? page - 1 : page, limit: size });
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
                    {DetailComponent && (
                      <DetailButton
                        style={{
                          opacity: showDetailButton?.(record) ? 0.5 : 1,
                          cursor: showDetailButton?.(record)
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onClick={() => {
                          showDetailButton?.(record) ? null : setDetail(record);
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
                          hideEditButton?.(record) ? null : setUpdate(record);
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

      {CreateComponent && (
        <CreateComponent
          open={create}
          onCancel={() => setCreate?.(false)}
          onFinish={() => {
            setCreate?.(false);
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
