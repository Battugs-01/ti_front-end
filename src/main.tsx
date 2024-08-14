import { ConfigProvider, notification } from "antd";
import enUSIntl from "antd/lib/locale/en_US";
import { AuthProvider } from "context/auth";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { Locale } from "types";
import english from "./locales/en";
import mongolia from "./locales/mn";
import "./styles/custom.less";
import "./styles/global.less";
import "./styles/tailwind.css";

const domNode = document.getElementById("root") as any;
const root = createRoot(domNode);

notification.config({
  placement: "topRight",
  // className: "custom-ant-notification-message p-4",
});

const locales = {
  mn: mongolia,
  en: english,
};

const locale: Locale = localStorage.getItem("web.locale") as Locale;

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
      },
    }}
    locale={enUSIntl}
  >
    <IntlProvider messages={locales[locale]} locale={locale?.substring(0, 2)}>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </IntlProvider>
  </ConfigProvider>
);
