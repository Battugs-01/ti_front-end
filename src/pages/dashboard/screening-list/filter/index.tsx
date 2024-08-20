import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Button, Divider } from "antd";
import { levelOptions } from "config";
import { FormattedMessage, useIntl } from "react-intl";

export const ScreeningListFilter = () => {
  const intl = useIntl();
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values, "sss");
      }}
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
      />
      <ProFormSelect
        name="is_have_care_giver"
        placeholder={intl.formatMessage({ id: "caregiver" })}
      />
      <ProFormSelect
        name="person_in_charge_ids"
        placeholder={intl.formatMessage({ id: "person_in_charge" })}
        fieldProps={{
          mode: "multiple",
        }}
      />
      <Divider />
    </ProForm>
  );
};
