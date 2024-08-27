import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, Divider } from "antd";
import { agencyArray, levelOptions } from "config";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import permission from "service/settings/permission";

interface ScreeningListFilterType {
  onFinish?: (formData: Record<string, any>) => Promise<boolean | void>;
}

export const ScreeningListFilter: React.FC<ScreeningListFilterType> = ({
  onFinish,
}) => {
  const intl = useIntl();
  const personChargeList = useRequest(permission.list, {
    manual: true,
  });

  return (
    <ProForm
      onFinish={onFinish}
      submitter={{
        render: ({ reset, submit }) => {
          return (
            <div className="flex items-center gap-3 w-full">
              <Button
                className="w-1/2"
                type="default"
                size="large"
                onClick={() => reset?.()}
              >
                <FormattedMessage id="reset" />
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={submit}
                className="w-1/2"
              >
                <FormattedMessage id="filter" />
              </Button>
            </div>
          );
        },
      }}
    >
      <ProFormText name="age" placeholder={intl.formatMessage({ id: "age" })} />
      <ProFormSelect
        name="levels"
        options={levelOptions.map((el) => ({ ...el }))}
        placeholder={intl.formatMessage({ id: "level" })}
        fieldProps={{
          mode: "multiple",
        }}
      />
      <ProFormSelect
        name="agency_id"
        placeholder={intl.formatMessage({ id: "agency" })}
        options={agencyArray.map((el) => ({ ...el }))}
      />
      <ProFormSelect
        name="is_have_care_giver"
        placeholder={intl.formatMessage({ id: "caregiver" })}
        options={[
          {
            label: intl.formatMessage({ id: "yes" }),
            value: true,
          },
          {
            label: intl.formatMessage({ id: "no" }),
            value: false,
          },
        ]}
      />
      <ProFormSelect
        name="person_in_charge_ids"
        request={async () => {
          const data = await personChargeList.runAsync({});
          return data?.items?.map((val) => ({
            label: (
              <div className="flex items-center gap-3">
                <Avatar src={file.fileToUrl(val?.profile?.physical_path || "")}>
                  {val?.first_name?.substring(0, 2)}
                </Avatar>
                <div>{val?.first_name}</div>
              </div>
            ),
            value: val.id,
          }));
        }}
        placeholder={intl.formatMessage({ id: "person_in_charge" })}
        fieldProps={{
          mode: "multiple",
        }}
      />
      <Divider />
    </ProForm>
  );
};
