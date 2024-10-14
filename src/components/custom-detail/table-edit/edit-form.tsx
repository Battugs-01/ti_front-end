import ProForm, {
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, Card, notification } from "antd";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
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
      className="h-full w-full card-header-remove"
    >
      <ProForm
        formRef={formRef}
        // loading={dpDetailList.loading}
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
              label: "Хөнгөн",
            },
            { value: "Дунд", label: "Дунд" },
            { value: "Хүнд", label: "Хүнд" },
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
        <ProFormText
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
            // onChange: (newValue) => {
            //   handleFieldChange(index, "person_in_charge_id", newValue);
            // },
            // value: record.person_in_charge_id,
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
