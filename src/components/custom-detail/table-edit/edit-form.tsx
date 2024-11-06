import ProForm, {
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, Card, notification } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import userList from "service/settings/user_list";
import { X } from "untitledui-js-base";
import { useLevelContext } from "../selected-level";

interface DevPlanEditFormProps {
  data: CareFociItemElement;
  setSelectedRow: any;
  setIsEditing: any;
  isEditing: boolean;
  onFinish?: () => void;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
}
interface ServiceOption {
  name: string;
  description: string;
}
const DevPlanEditForm: React.FC<DevPlanEditFormProps> = ({
  data,
  setSelectedRow,
  setIsEditing,
  setSelectedRowKeys,
  isEditing,
  onFinish,
}) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const { selectedLevel, setSelectedLevel } = useLevelContext();
  const employee = useRequest(userList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const debouncedSearch = debounce((value) => {
    employee.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  useEffect(() => {
    employee.run({
      current: 1,
      pageSize: 20,
    });
  }, []);

  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...data,
    });
  }, [data]);

  const updateDevPlan = useRequest(developmentPlan.updateDevPlan, {
    manual: true,
    onSuccess: () => {
      setIsEditing(false);
      onFinish && onFinish();
      setSelectedRow(null);
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
      setIsEditing(true);
    },
  });

  const SERVICE_OPTIONS: ServiceOption[] = [
    {
      name: "service_provided",
      description:
        "Хөдөлгөөн засалчаар үнэлгээ хийлгэж (эмнэлэг эсвэл гэрээр) хийлгэж, асран хамгаалагчийн оролцоотой хийх дасгал хөдөлгөөний техникийг зааж, дасгал хөдөлгөөн тогтмол хийхийг урамшуулан дэмжинэ. Мөн зөв зогсох, явах, суух, хэвтэх, орноос босох техникийг зааж сургана.",
    },
    {
      name: "service_provided2",
      description:
        "Хувцаслах, хоол хийх, усанд орох гэх мэт өдөр тутмын үйл ажиллагаанд туслах ахуй засал зөвлөгөө хийх.",
    },
    {
      name: "service_provided3",
      description:
        "Саркопенийн хам шинж, идэвхгүй байдлаас үүдэлтэй биеийн хөдөлгөөний үйл ажиллагааны бууралтаас сэргийлэхийн тулд уураг ихтэй хоол хүнс хэрэглэхийг зөвлөн уураг илчлэгийн дутагдалыг эмчилнэ.",
    },
  ];

  const ALL_CASE: ServiceOption[] = [
    {
      name: "all_case1",
      description:
        "Ахмад настны амьдарч байгаа орчинд үнэлгээ өгч, орчны эрсдэлийг бууруулах налуу зам, босго намсгах гэх мэт гэр дотуур орчны тохижуулах",
    },
    {
      name: "all_case2",
      description:
        "Хөдөлгөөнд туслах хэрэгсэл болох, тавг, тулшиг, алхуулагч, тэргэнцэр, бие засах суултуур зэрэг шаардлагатай хэрэгслээр хангана",
    },
    {
      name: "all_case3",
      description:
        "Асаргаа шаардлагатай, хөдөлгөөний чадвар алдагдсан ахмад настны асаргааны хувийбарт үйлчилгээнд хөлбөн зуучилна",
    },
    {
      name: "all_case4",
      description:
        "Санал болгож буй хувийбарт асаргааны үйлчилгээний нэр бичих",
    },
    {
      name: "all_case5",
      description:
        "Асран хамгаалагч хангалттай хэмжээнд асарч чадахгүй тохиолдолд асаргааны талаар сургалтад хамруулах",
    },
    {
      name: "all_case6",
      description:
        "Сэтгэл санааны дэмжлэг үзүүлж, ижил төстэй бэрхшээлтэй тулгарсан хүмүүсийг бүсэдтэй холбох",
    },
    {
      name: "all_case7",
      description:
        "Хөдөлгөөний чадвар алдагдтад нөлөөлөх орчны эрсдэлийг үнэлж, үдирдана",
    },
    {
      name: "all_case8",
      description: "Бусад",
    },
  ];
  return (
    <Card
      title={
        <div className="text-xl font-semibold mt-2">
          <FormattedMessage id="update" />
        </div>
      }
      extra={
        <Button
          className="mt-2 p-1 flex items-center justify-center"
          onClick={() => {
            setSelectedRow(null);
            setSelectedRowKeys([]);
          }}
        >
          <X className="w-5 h-5" />
        </Button>
      }
      className="h-full w-full card-header-remove overflow-y-auto"
    >
      <ProForm
        formRef={formRef}
        submitter={{
          render: ({ submit: onSubmit }) => {
            return (
              <>
                <div className="flex justify-end w-full rounded-xl gap-2">
                  {/* <Button
                    size="middle"
                    className="text-sm  items-center"
                    icon={<FaArrowLeft size={12} />}
                    // onClick={() => onCancel && onCancel()}
                  >
                    Буцах
                  </Button> */}
                  <Button
                    size="middle"
                    className="text-sm flex items-center gap-2 justify-center"
                    type="primary"
                    onClick={onSubmit}
                  >
                    <FormattedMessage id="save" />
                  </Button>
                </div>
              </>
            );
          },
        }}
        onFinish={async (values) => {
          if (!!values) {
            updateDevPlan.runAsync({
              ...values,
              assessment_id: selectedLevel?.id,
              id: data?.id,
              care_foci_id: data?.care_foci_id || 0,
              is_general: data?.is_general,
            });
            formRef.current?.resetFields();
          }
        }}
      >
        <ProFormRadio.Group
          label={
            <div className="font-medium text-gray-700">
              <FormattedMessage id="severity_syndrome" />
            </div>
          }
          className="flex justify-between"
          name={"severity_level"}
          options={[
            {
              value: "Хөнгөн",
              label: intl.formatMessage({ id: "low" }),
            },
            {
              value: "Дунд",
              label: intl.formatMessage({ id: "medium" }),
            },
            {
              value: "Хүнд",
              label: intl.formatMessage({ id: "high" }),
            },
          ]}
        />
        <ProFormTextArea
          fieldProps={{
            className: "w-full h-40",
          }}
          name={"summary_plan"}
          placeholder={intl.formatMessage({ id: "summary_plan" })}
          className="w-full h-40"
          label={
            <div className="font-medium text-gray-700">
              <FormattedMessage id="summary_plan" />
            </div>
          }
        />
        {/* <Row gutter={[16, 16]}>
          <div className="font-medium text-gray-700">
            <FormattedMessage id="service_provided" />
          </div>

          {SERVICE_OPTIONS.map((service) => (
            <React.Fragment key={service.name}>
              <Col span={24} className="flex items-center gap-2">
                <div className="flex items-start gap-2">
                  <ProFormCheckbox
                    className="flex items-center"
                    name={service.name}
                    placeholder={intl.formatMessage({ id: service.name })}
                  />
                  <div className="text-sm mt-1 text-gray-700">
                    {service.description}
                  </div>
                </div>
              </Col>

              <ProFormItem
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues[service.name] !== currentValues[service.name]
                }
                className=" m-0 p-0"
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {(form) => {
                  const value = form.getFieldValue(service.name);
                  return (
                    value && (
                      <div className="ml-8 flex justify-between items-center gap-4">
                        <ProFormDatePicker
                          name={`duration_${service.name}`}
                          initialValue={dayjs().endOf("day")}
                          placeholder={intl.formatMessage({ id: "time" })}
                          label={
                            <div className="font-medium text-gray-700">
                              <FormattedMessage id="time" />
                            </div>
                          }
                        />
                        <ProFormSelect
                          name={"person_in_charge_id"}
                          shouldUpdate
                          className="flex items-center justify-center m-0 p-0 w-full"
                          fieldProps={{
                            showSearch: true,
                            loading: employee.loading,
                            filterOption: false,
                            onSearch: debouncedSearch,
                          }}
                          style={{
                            margin: 0,
                            padding: 0,
                          }}
                          label={intl.formatMessage({ id: "responsible" })}
                          placeholder={intl.formatMessage({
                            id: "responsible",
                          })}
                          options={employee?.data?.items.reduce<any[]>(
                            (acc, record) => {
                              acc.push({
                                label: (
                                  <div className="flex gap-2 items-center">
                                    <Avatar
                                      shape="circle"
                                      size={"small"}
                                      src={file.fileToUrl(
                                        record.profile?.physical_path || "AS"
                                      )}
                                    />
                                    <span>{`${record?.last_name?.substring(
                                      0,
                                      1
                                    )}. ${record?.first_name}`}</span>
                                  </div>
                                ),
                                value: record?.id,
                              });
                              return acc;
                            },
                            []
                          )}
                        />
                      </div>
                    )
                  );
                }}
              </ProFormItem>
            </React.Fragment>
          ))}
        </Row>
        <Row gutter={[16, 16]} className="mt-5">
          <div className="font-medium text-gray-700">
            <FormattedMessage id="all_case" />
          </div>

          {ALL_CASE.map((item) => (
            <React.Fragment key={item.name}>
              <Col span={24} className="flex items-center gap-2">
                <div className="flex items-start gap-2">
                  <ProFormCheckbox
                    className="flex items-center"
                    name={item.name}
                    placeholder={intl.formatMessage({ id: item.name })}
                  />
                  <div className="text-sm mt-1 text-gray-700">
                    {item.description}
                  </div>
                </div>
              </Col>

              <ProFormItem
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues[item.name] !== currentValues[item.name]
                }
                className=" m-0 p-0"
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {(form) => {
                  const value = form.getFieldValue(item.name);
                  return (
                    value && (
                      <div className="ml-8 flex justify-between items-center gap-4">
                        <ProFormDatePicker
                          name={`duration_${item.name}`}
                          initialValue={dayjs().endOf("day")}
                          placeholder={intl.formatMessage({ id: "time" })}
                          label={
                            <div className="font-medium text-gray-700">
                              <FormattedMessage id="time" />
                            </div>
                          }
                        />
                        <ProFormSelect
                          name={"person_in_charge_id"}
                          shouldUpdate
                          className="flex items-center justify-center m-0 p-0 w-full"
                          fieldProps={{
                            showSearch: true,
                            loading: employee.loading,
                            filterOption: false,
                            onSearch: debouncedSearch,
                          }}
                          style={{
                            margin: 0,
                            padding: 0,
                          }}
                          label={intl.formatMessage({ id: "responsible" })}
                          placeholder={intl.formatMessage({
                            id: "responsible",
                          })}
                          options={employee?.data?.items.reduce<any[]>(
                            (acc, record) => {
                              acc.push({
                                label: (
                                  <div className="flex gap-2 items-center">
                                    <Avatar
                                      shape="circle"
                                      size={"small"}
                                      src={file.fileToUrl(
                                        record.profile?.physical_path || "AS"
                                      )}
                                    />
                                    <span>{`${record?.last_name?.substring(
                                      0,
                                      1
                                    )}. ${record?.first_name}`}</span>
                                  </div>
                                ),
                                value: record?.id,
                              });
                              return acc;
                            },
                            []
                          )}
                        />
                      </div>
                    )
                  );
                }}
              </ProFormItem>
            </React.Fragment>
          ))}
        </Row> */}

        <ProFormDigit
          name={"duration"}
          placeholder={intl.formatMessage({ id: "time" })}
          label={
            <div className="font-medium text-gray-700">
              <FormattedMessage id="time" />
            </div>
          }
        />
        <ProFormSelect
          name={"person_in_charge_id"}
          shouldUpdate
          className="flex items-center justify-center "
          fieldProps={{
            showSearch: true,
            loading: employee.loading,
            filterOption: false,
            onSearch: debouncedSearch,
          }}
          label={intl.formatMessage({ id: "select" })}
          placeholder={intl.formatMessage({ id: "select" })}
          options={employee?.data?.items.reduce<any[]>((acc, record) => {
            acc.push({
              label: (
                <div className="flex gap-2 items-center">
                  <Avatar
                    shape="circle"
                    size={"small"}
                    src={file.fileToUrl(record.profile?.physical_path || "AS")}
                  />
                  <span>{`${record?.last_name?.substring(0, 1)}. ${
                    record?.first_name
                  }`}</span>
                </div>
              ),
              value: record?.id,
            });
            return acc;
          }, [])}
        />
        <ProFormTextArea
          fieldProps={{
            className: "w-full h-40",
          }}
          disabled
          name={"result"}
          placeholder={intl.formatMessage({ id: "result" })}
          className="w-full h-40"
          label={
            <div className="font-medium text-gray-700">
              <FormattedMessage id="result" />
            </div>
          }
        />
        <ProFormRadio.Group
          label={
            <div className="font-medium text-gray-700">
              <FormattedMessage id="is_resolved" />
            </div>
          }
          className="flex justify-between"
          name={"is_resolved"}
          disabled
          options={[
            {
              value: true,
              label: "Тийм",
            },
            { value: false, label: "Үгүй" },
          ]}
        />
      </ProForm>
    </Card>
  );
};

export default DevPlanEditForm;
