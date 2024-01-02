import { PlusOutlined } from "@ant-design/icons";
import {
  FormListActionType,
  ProFormItem,
  ProFormList,
  ProFormTimePicker,
} from "@ant-design/pro-form";
import { Button, Divider, FormListOperation } from "antd";
import { DeleteButton, SectionContainer } from "components/index";
import { FieldRequireMessage, WEEK_DAY_ARRAY } from "config";
import { useRef } from "react";

export const TimeTable = () => {
  const actionRef = useRef<FormListActionType<any>>();
  const toggleWeekDay = (
    action: FormListOperation & {
      getCurrentRowData: () => any;
      setCurrentRowData: (data: any) => void;
    },
    rowData: any,
    value: string
  ) => {
    if (rowData?.week_days?.includes(value)) {
      let index = rowData?.week_days?.findIndex((el: string) => el === value);
      rowData?.week_days.splice(index, 1);
    } else {
      rowData.week_days = [...(rowData?.week_days || []), value];
    }
    action.setCurrentRowData({ ...rowData });
  };

  return (
    <SectionContainer label="Timetable*">
      <ProFormList
        name={"timeTable"}
        creatorButtonProps={{
          className: " hidden",
        }}
        actionRef={actionRef}
        actionRender={() => []}
      >
        {(_fields, _index, action, _count) => {
          let rowData = action.getCurrentRowData();
          return (
            <div className={` space-y-3 ${_index > 0 && "mt-3"}`}>
              <div className="flex items-center">
                <div>
                  <ProFormItem
                    name={"week_days"}
                    rules={[
                      {
                        message: FieldRequireMessage,
                        required: true,
                      },
                    ]}
                  >
                    {WEEK_DAY_ARRAY.map((el, index) => {
                      return (
                        <Button
                          key={"weekDay-" + index}
                          type={
                            rowData?.week_days?.includes(el.value)
                              ? "primary"
                              : "default"
                          }
                          className={`border-l ${
                            index === 0 && " rounded-tr-none rounded-br-none"
                          } ${
                            index === WEEK_DAY_ARRAY.length - 1 &&
                            " rounded-tl-none rounded-bl-none "
                          } ${
                            index !== 0 &&
                            index !== WEEK_DAY_ARRAY.length - 1 &&
                            "rounded-none"
                          } ${index > 0 && "border-l-0"} ${
                            rowData?.week_days?.includes(el.value) &&
                            " border-l border-solid border-white"
                          } `}
                          onClick={() =>
                            toggleWeekDay(action, rowData, el.value)
                          }
                        >
                          {el.label}
                        </Button>
                      );
                    })}
                  </ProFormItem>
                </div>
                {_index > 0 && (
                  <DeleteButton
                    onClick={() => actionRef?.current?.remove(_index)}
                  />
                )}
              </div>
              <div className="flex items-center space-x-2  ">
                <ProFormTimePicker
                  name={"opening"}
                  rules={[
                    {
                      message: FieldRequireMessage,
                      required: true,
                    },
                  ]}
                />

                <Divider
                  style={{
                    maxWidth: 8,
                    minWidth: 8,
                    margin: 0,
                  }}
                  className="bg-gray-600 mb-6"
                />
                <ProFormTimePicker
                  name={"closing"}
                  rules={[
                    {
                      message: FieldRequireMessage,
                      required: true,
                    },
                  ]}
                />
              </div>
            </div>
          );
        }}
      </ProFormList>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        ghost
        className="mb-3 border-0  font-medium"
        onClick={() => actionRef.current?.add({})}
      >
        Add hours
      </Button>
    </SectionContainer>
  );
};
