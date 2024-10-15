import {
  DrawerForm,
  FormListActionType,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, Card, Col, notification, Row, Select } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import developmentPlan from "service/development_plan";
import file from "service/file";
// import carefoci from "service/settings/care-foci";
// import permission from "service/settings/permission";
import { Plus, Trash04 } from "untitledui-js-base";

interface DevelopmentProps {
  cancelModal: () => void;
  visible?: boolean;
}

export const CreateDevelopmentPlan: React.FC<DevelopmentProps> = ({
  cancelModal,
  visible,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const customerId = location.search.split("=")[1];
  const createDevPlan = useRequest(developmentPlan.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      cancelModal();
    },
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });
  // const careFoci = useRequest(carefoci.get, {
  //   manual: true,
  // });
  // const personinChargeList = useRequest(perso.list, {
  //   manual: true,
  // });
  const ref = useRef<FormListActionType>();

  return (
    <DrawerForm
      onFinish={async (values) => {
        const items = values.items.map((val: any) => {
          return {
            ...val,
            estimated_date: dayjs(val.estimated_date).toDate(),
          };
        });
        const result = {
          customer_id: parseInt(customerId),
          items,
        };
        await createDevPlan.runAsync(result);
      }}
      title={intl.formatMessage({ id: "create_development_plan" })}
      open={visible}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={cancelModal} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                loading={createDevPlan.loading}
                type="primary"
                icon={<Plus />}
                className="flex items-center"
              >
                <FormattedMessage id="create_plan" />
              </Button>
            </div>
          );
        },
      }}
      drawerProps={{
        onClose: cancelModal,
        width: 500,
      }}
    >
      <ProFormList
        name="items"
        actionRef={ref}
        actionRender={() => []}
        creatorButtonProps={{
          className: "hidden",
        }}
        alwaysShowItemLabel
        className="block"
        initialValue={[{}]}
      >
        {(fields, index) => (
          <Card className="bg-[#F5F8F8] mt-6">
            <div key={index}>
              <div className="flex justify-end">
                {index !== 0 && (
                  <Button
                    ghost
                    onClick={(e) => {
                      ref.current?.remove(index);
                    }}
                    className="text-[#F04438] flex items-center border-none"
                    icon={<Trash04 />}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    name={"intervention"}
                    label={"Intervention"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter intervention",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    name={"care_foci_item_id"}
                    label="Care Foci"
                    // request={async () => {
                    //   const list = await careFoci.runAsync();
                    //   return list?.map((el: any) => ({
                    //     key: el.id,
                    //     label: el.name,
                    //     title: el.name,
                    //     options: el.items.map((item: any) => ({
                    //       key: item.id,
                    //       label: item.name,
                    //       value: item.id,
                    //     })),
                    //   }));
                    // }}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormDigit
                    name={"frequency"}
                    label="Frequency"
                    fieldProps={{
                      addonAfter: (
                        <div style={{ height: "35px", lineHeight: "35px" }}>
                          <ProFormSelect
                            initialValue={"week"}
                            name={"frequency_type"}
                            options={[
                              { label: "Daily", value: "daily" },
                              { label: "Weekly", value: "weekly" },
                              { label: "Monthly", value: "monthly" },
                              { label: "Yearly", value: "yearly" },
                            ]}
                            style={{
                              height: "100%",
                              border: "none",
                              padding: 0,
                            }}
                          />
                        </div>
                      ),
                      style: { height: 35 },
                    }}
                    style={{ height: 35 }}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormSelect
                    name={"person_in_charge_id"}
                    label="Person in Charge"
                    // request={async () => {
                    //   const list = await personinChargeList.runAsync({});
                    //   return list?.items.map((el) => ({
                    //     key: el.id,
                    //     label: (
                    //       <div className="flex items-center gap-3">
                    //         <Avatar
                    //           src={file.fileToUrl(
                    //             el.profile?.physical_path || ""
                    //           )}
                    //         >
                    //           {el?.first_name.substring(0, 2)}
                    //         </Avatar>{" "}
                    //         <div>{el?.first_name}</div>
                    //       </div>
                    //     ),
                    //     value: el.id,
                    //   }));
                    // }}
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    name={"estimated_date"}
                    label="Estimated Completion"
                  />
                </Col>
              </Row>
            </div>
          </Card>
        )}
      </ProFormList>
      <Button
        icon={<Plus />}
        ghost
        className="my-3 font-medium text-[#144E5A] flex items-center"
        onClick={() => ref.current?.add({})}
      >
        <FormattedMessage id="add_plan" />
      </Button>
    </DrawerForm>
  );
};
