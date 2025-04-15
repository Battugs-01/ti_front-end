import { ModalForm, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Form, message, Modal } from "antd";
import { useEffect } from "react";
import ledger from "service/fininaciar/accountSettlement/ledger";

interface Props {
    customerCompanyId: number;
    onCancel: () => void;
    onFinish?: () => void;
}
const CreateLedger = ({ customerCompanyId, onCancel, onFinish = () => {} }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            customer_company_id: customerCompanyId
        });
    }, [customerCompanyId]);

    const create = useRequest(ledger.create, {
        manual: true,
        onSuccess: () => {
            message.success("Амжилттай үүслээ");
            onFinish();
        }
    });

  return <ModalForm
  trigger={<Button type="primary">Үүсгэх</Button>}
   onFinish={async (formData) => {
    formData.customer_company_id = customerCompanyId;
    console.log(formData);
    if (await create.runAsync(formData)) {
        return true;
    }
    return false;
  }}>
    <ProFormText name="name" label="Дансны код" />
  </ModalForm>;
};

export default CreateLedger;
