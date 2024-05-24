import { ProFormText } from "@ant-design/pro-form";
import { FORM_ITEM_RULE } from "config";

export const CreateForm: React.FC = () => {
  return (
    <ProFormText
      label="Регистрийн дугаар"
      placeholder="Регистрийн дугаар оруулна уу?"
      name="rd"
      rules={
        (FORM_ITEM_RULE(),
        [
          {
            required: true,
            message: "Энэ талбарыг оруулах шаардлагатай!",
          },
          {
            pattern: /^[а-яА-Я]{2}[0-9]{1}[0-9]{7}$/,
            message: "Энэ талбар РД байх ёстой",
          },
        ])
      }
    />
  );
};
