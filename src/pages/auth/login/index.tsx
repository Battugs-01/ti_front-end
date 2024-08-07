import ProForm, {
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import { LoginData } from "service/auth/type";

const Login: FC = () => {
  // const [loading, setLoading] = useState(false);
  const formRef = useRef<ProFormInstance<LoginData>>();
  const [, setAuth] = useAuthContext();
  const userData = auth.getRememberUser();
  const navigate = useNavigate();
  const login = useRequest(auth.login, {
    manual: true,
    onSuccess: (data) => {
      auth.saveToken(data.token);
      setAuth([Action.SIGN_IN, data.user]);
      navigate("dashboard/socialWorker/customer");
      notification.success({
        message: "Амжилттай нэвтэрлээ.",
      });
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });
  return (
    <div className="bg-white rounded-xl w-full px-16">
      <div className="align-left flex justify-start">
        <img src="/images/logo1.png" alt="logo" width={300} className="mb-7" />
      </div>
      <ProForm<LoginData>
        formRef={formRef}
        className="mt-5"
        initialValues={userData}
        labelCol={{
          className: "font-medium",
        }}
        onFinish={async (data: LoginData) => {
          auth.rememberUser(data);

          const sendJSON = { ...data, email: data.email.toLowerCase() };

          await login.runAsync(sendJSON);
        }}
        submitter={{
          render: () => (
            <Button
              block
              type="primary"
              loading={login.loading}
              disabled={login.loading}
              htmlType="submit"
              size="large"
              className="mt-7"
            >
              Нэвтрэх
            </Button>
          ),
        }}
      >
        <div className="text-3xl font-semibold mb-3 ml-0 pl-0">Нэвтрэх</div>
        <div className="space-y-1">
          <ProFormText
            name="email"
            placeholder="И-мэйл"
            label="Нэвтрэх и-мэйл"
            fieldProps={{ size: "large" }}
            required
            rules={[
              {
                message: "Энэ талбар и-мэйл хаяг байх ёстой",
                type: "email",
                required: true
              },
            ]}
          />
          <ProFormText.Password
            label="Нууц үг"
            name="password"
            placeholder="Нууц үг"
            fieldProps={{ size: "large" }}
            rules={[
              {
                required: true,
                message: "Нууц үг оруулна уу!"
              },
            ]}
            extra={
              <div className="text-[#475467] text-sm mt-1">
                Хамгийн багадаа 8 тэмдэгт оруулна уу.
              </div>
            }
          />
          <div className="flex items-center space-x-3 custom-ant-item-margin-remove">
            <ProFormCheckbox
              id="remember"
              name="remember"
              className="mb-0 pb-0"
              style={{
                marginBottom: 0,
              }}
              fieldProps={{
                className: "mb-0 pb-0 mt-0 pt-0",
              }}
            />
            <label htmlFor="remember" className="text-gray-700">
              Нэвтрэх нэр сануулах
            </label>
          </div>
        </div>
      </ProForm>
    </div>
  );
};

export default Login;
