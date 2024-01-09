import ProForm, {
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { AuthErrorCodes } from "firebase/auth";
import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import { LoginData } from "service/auth/type";
import { authService } from "service/firebase";

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<ProFormInstance<LoginData>>();
  const [, setAuth] = useAuthContext();
  const userData = auth.getRememberUser();
  const navigate = useNavigate();
  const login = useRequest(auth.login, {
    manual: true,
    onSuccess: (data) => {
      auth.saveToken(data.token);
      setAuth([Action.SIGN_IN, data.user]);
      navigate("/dashboard/government/requests");
      notification.success({
        message: "Success",
      });
    },
  });
  return (
    <div style={{ maxWidth: 380 }} className="bg-white rounded-xl p-6">
      <div className="text-center">
        <img
          src="/images/logo.jpg"
          alt="logo"
          style={{ height: 75, borderRadius: 1000 }}
        />
      </div>
      <ProForm<LoginData>
        formRef={formRef}
        className="mt-5"
        initialValues={userData}
        labelCol={{
          className: "font-medium",
        }}
        onFinish={async (data: LoginData) => {
          setLoading(true);
          auth.rememberUser(data);

          const sendJSON = { ...data, email: data.email.toLowerCase() };
          try {
            let user = await authService.signInWithEmailAndPassword(
              sendJSON.email,
              sendJSON.password
            );
            let firebaseUserClaims = await user.user?.getIdTokenResult();
            await login.runAsync({
              id_token: firebaseUserClaims?.token,
            });
          } catch (err: any) {
            if (err?.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
              notification.error({
                message:
                  "Олон удаа нэвтрэх нэр нууц үгээ буруу оруулсан байна. Түр хугацааны дараа дахин оролдоно уу",
              });
            } else {
              notification.error({
                message: "Таны имэйл эсвэл нууц үг буруу байна.",
              });
            }
          }
          setLoading(false);
        }}
        submitter={{
          render: () => (
            <Button
              block
              type="primary"
              loading={loading}
              disabled={loading}
              htmlType="submit"
              size="large"
              className="mt-7 "
            >
              Sign In
            </Button>
          ),
        }}
      >
        <div className="space-y-5">
          <ProFormText
            width="md"
            name="email"
            placeholder="Enter your email"
            label="Email"
            fieldProps={{ size: "large" }}
            rules={[
              {
                message: "Email is required!",
              },
            ]}
          />
          <ProFormText.Password
            width="md"
            label="Password"
            name="password"
            placeholder="Enter your password"
            fieldProps={{ size: "large" }}
            rules={[
              {
                message: "Password is required!",
              },
            ]}
          />
          <div className="flex items-center space-x-3 custom-ant-item-margin-remove  ">
            <ProFormCheckbox
              id="remember"
              name="remember"
              className="mb-0 pb-0"
              style={{
                marginBottom: 0,
              }}
              fieldProps={{
                className: "mb-0 pb-0",
              }}
            />
            <label htmlFor="remember" className="text-gray-700">
              Remember me
            </label>
          </div>
        </div>
      </ProForm>
    </div>
  );
};

export default Login;
