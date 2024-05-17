import { ProFormSelect, ProFormText, ProFormUploadButton } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Checkbox, Col, Row, Table } from "antd";
import { SectionField } from "components/index";
import { FORM_ITEM_RULE, RoleType, roleSelect } from "config";
import { useAuthContext } from "context/auth";
import { useEffect, useState } from "react";
import address from "service/address";

type OrphanFormType = {
  //   data?: ItemInterface;
  form?: any;
};

export const CreateForm: React.FC<OrphanFormType> = ({ form }) => {
  const [selectRole, setSelectRole] = useState<number>(RoleType.aimag);
  const [user] = useAuthContext();
  useEffect(() => {
    district?.runAsync(user?.user?.city_id);
  }, []);
  const district = useRequest(address.district, {
    manual: true,
  });
  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });

  return (
    <div >
      <Row gutter={[16, 16]}>
        <Col>
          <ProFormUploadButton
            title={
              <div className="flex items-center flex-col justify-center gap-2 text-[#00000073]">
                <div className="text-xs ">Зураг оруулах</div>
              </div>
            }
            label={"Цээж зураг (3x4 хэмжээтэй)"}
            max={1}
            rules={[
              {
                validator: (_, file) => {
                  if (file && file.length > 0) {
                    if (
                      file[0].type === "image/jpeg" ||
                      file[0].type === "image/png"
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Зөвхөн JPG, PNG файлыг оруулах боломжтой"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              },
              ...FORM_ITEM_RULE(),
            ]}
            name="profile"
            fieldProps={{
              name: "file",
              listType: "picture-card",
              beforeUpload: () => {
                return false;
              },
            }}
          />

        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            name="user_type"
            label="Хэрэглэгчийн төрөл"
            placeholder="Хэрэглэгчийн төрөл сонгоно уу?"
            options={roleSelect.map((el) => ({ ...el }))}
            onChange={(val: number) => {
              setSelectRole(val);
            }}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {selectRole === RoleType.sum && (
          <>
            <Col span={12}>
              <ProFormSelect
                fieldProps={{
                  allowClear: true,
                }}
                name={"district_id"}
                placeholder="Батсүмбэр"
                label={"Сум/Дүүрэг"}
                onChange={(value) => {
                  khoroo.run(value);
                }}
                options={district.data?.map((item: any) => {
                  return {
                    label: item?.name,
                    value: item?.id,
                  };
                })}
                rules={[
                  {
                    required: true,
                    message: "Энэ талбарийг оруулах шаардлагатай!",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name={"khoroo_id"}
                placeholder="Хороо"
                label={"Хороо/Баг"}
                options={khoroo.data?.map((item: any) => {
                  return {
                    label: item?.name,
                    value: item?.id,
                  };
                })}
              />
            </Col>
          </>
        )}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            placeholder="Овог"
            name="last_name"
            label={"Овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            placeholder="Нэр"
            name="first_name"
            label="Нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            placeholder="Албан тушаал"
            name="position"
            label="Албан тушаал"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Утас"
            fieldProps={{
              addonBefore: "+976",
              maxLength: 8,
              minLength: 8
            }}
            placeholder="Утас"
            name="phone"
            rules={[
              {
                max: 8,
                min: 8,
                message: "Утсны дугаар оруулна уу!",
                required: true,
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            placeholder="Цахим шуудангаа оруулна уу"
            name="email"
            label="Цахим шуудан"
            rules={[
              {
                message: "Энэ талбар и-мэйл хаяг байх ёстой",
                type: "email"
                // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              },
              {
                message: "И-мэйл хаягаа оруулна уу?",
                required: true,
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText.Password
            placeholder="*************"
            name="password"
            label="Нууц үг"
            rules={[
              {
                message: "Нууц үгээ оруулна уу!",
                required: true,
              },
              {
                message: "Том, жижиг үсэг, тоо болон тусгай тэмдэгт (#?!@$%^&*-) орсон байх ёстой",
                pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};
