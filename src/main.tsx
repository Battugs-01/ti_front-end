import { ConfigProvider, notification } from "antd";
import App from "app";
import enUSIntl from "antd/lib/locale/en_US";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { createRoot } from "react-dom/client";
import "./styles/custom.less";
import "./styles/global.less";
import "./styles/tailwind.css";
import { AuthProvider } from "context/auth";

const domNode = document.getElementById("root") as any;
const root = createRoot(domNode);

notification.config({
  placement: "topRight",
  // className: "custom-ant-notification-message p-4",
});

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Ulaanbaatar");

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#144E5A",
        fontFamily: "Inter",
        colorBorder: "#D0D5DD",
      },
      components: {
        Radio: {
          buttonCheckedBg: "#CFDADC",
        },
        Collapse: {
          colorBgContainer: "#fff",
          headerBg: "#fff",
          colorBorder: "#fff",
        },
        Segmented: {
          colorBgLayout: "#CFDADC",
          colorText: "#1D2939",
        },
        Table: {
          rowHoverBg: "#F5F8F8",
          rowSelectedHoverBg: "#E7EDEE",
          rowExpandedBg: "#F5F8F8",
        },
        Input:{
          colorBgContainer:"#F5F8F8"
        },
        InputNumber:{
          colorBgContainer:"#F5F8F8"
        },
        Select:{
          colorBgContainer:"#F5F8F8"
        },
        DatePicker:{
          colorBgContainer:"#F5F8F8"
        },
        Descriptions:{
          colorBgContainer:"#F5F8F8"
        }
      },
    }}
    locale={enUSIntl}
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </ConfigProvider>
);
