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
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import { LoginData } from "service/auth/type";

const Login: FC = () => {
  // const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const formRef = useRef<ProFormInstance<LoginData>>();
  const [, setAuth] = useAuthContext();
  const userData = auth.getRememberUser();
  const navigate = useNavigate();
  const login = useRequest(auth.login, {
    manual: true,
    onSuccess: (data) => {
      auth.saveToken(data.token);
      setAuth([Action.SIGN_IN, data.employee]);
      navigate("dashboard/screening-list");
      notification.success({
        message: intl.formatMessage({ id: "login_success" }),
      });
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });
  return (
    <div className="bg-white rounded-xl w-full">
      <div className="align-left flex justify-start">
        <img src="/images/logo1.png" alt="logo" width={140} className="mb-7" />
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

          const sendJSON = {
            ...data,
            email: data.email.toLowerCase(),
            web: true,
          };

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
              <FormattedMessage id="login" />
            </Button>
          ),
        }}
      >
        <div className="text-3xl font-semibold mb-3 ml-0 pl-0">
          <FormattedMessage id="login" />
        </div>
        <div className="space-y-1">
          <ProFormText
            name="email"
            placeholder={intl.formatMessage({ id: "login_email" })}
            label={<FormattedMessage id="login_email" />}
            fieldProps={{ size: "large" }}
            required
            rules={[
              {
                message: <FormattedMessage id="must_email" />,
                type: "email",
                required: true,
              },
            ]}
          />
          <ProFormText.Password
            label={intl.formatMessage({ id: "password" })}
            name="password"
            placeholder={intl.formatMessage({ id: "password" })}
            fieldProps={{ size: "large" }}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="required_password" />,
              },
            ]}
            extra={
              <div className="text-[#475467] text-sm mt-1">
                <FormattedMessage id="valid_password" />
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
              <FormattedMessage id="login_reminder" />
            </label>
          </div>
        </div>
      </ProForm>
      {/* <div>Нууц үгээ мартсан уу?</div> */}
    </div>
  );
};

export default Login;
