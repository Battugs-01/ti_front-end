import {
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Checkbox, Col, Row, Table } from "antd";
import { FormInstance } from "antd/lib";
import { SectionField } from "components/index";
import { FORM_ITEM_RULE, RoleType, roleSelect } from "config";
import { useAuthContext } from "context/auth";
import { useEffect, useState } from "react";
import address from "service/address";
import file from "service/file";
import { EmployeeInterface } from "service/gov-employees/type";

type OrphanFormType = {
  data?: EmployeeInterface;
  form?: FormInstance;
};

export const UpdateForm: React.FC<OrphanFormType> = ({ form, data }) => {
  const [selectRole, setSelectRole] = useState<number>(
    data?.user_type || RoleType.aimag
  );
  const [user] = useAuthContext();
  const districtId = form?.getFieldValue(["district_id"]);
  useEffect(() => {
    district?.runAsync(user?.user?.city_id);
    khoroo?.runAsync(data?.district_id);
    // khoroo?.runAsync(districtId);
  }, []);
  const district = useRequest(address.district, {
    manual: true,
  });
  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });

  return (
    <div className="">
      <Row gutter={[16, 16]}>
        <Col>
          <ProFormUploadButton
            title={
              <div className="flex items-center flex-col justify-center gap-2 text-[#00000073]">
                <div className="text-xs ">Зураг оруулах</div>
              </div>
            }
            label={"Цээж зураг (3x4 хэмжээтэй)"}
            name={"profile"}
            max={1}
            rules={FORM_ITEM_RULE()}
            initialValue={[
              {
                uid: `${data?.profile_id}`,
                id: `${data?.profile_id}`,
                name: data?.profile?.original_name || "",
                status: "done",
                url: file.fileToUrl(data?.profile?.physical_path || ""),
                size: data?.profile?.file_size || 0,
              },
            ]}
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
            initialValue={data?.user_type}
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
                initialValue={data?.district_id}
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
                initialValue={data?.khoroo_id}
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
            initialValue={data?.last_name}
            label={"Овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            placeholder="Нэр"
            name="first_name"
            initialValue={data?.first_name}
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
            initialValue={data?.position}
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
            initialValue={data?.phone}
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
            initialValue={data?.email}
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
      </Row>
    </div>
  );
};
