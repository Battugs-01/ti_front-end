import { ProFormText } from "@ant-design/pro-form";

export const CreateForm: React.FC = () => {
  return (
    <div>
      <ProFormText
        label="Регистрийн дугаар"
        placeholder="Регистрийн дугаар оруулна уу?"
        name="rd"
        rules={[
          {
            required:true,
            message:"Энэ талбарийг оруулах шаардлагатай!"
          }
        ]}
      />
    </div>
  );
};
