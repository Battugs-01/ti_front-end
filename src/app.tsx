import { useAuthContext } from "context/auth";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "routes";
import english from "./locales/en";
import mongolia from "./locales/mn";
import { LevelProvider } from "components/custom-detail/selected-level";
import { ConfigProvider } from "antd";
import enUSIntl from "antd/lib/locale/en_US";
import "dayjs/locale/mn";
import mnIntl from "antd/lib/locale/mn_MN";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const locales = {
  mn: mongolia,
  en: english,
};

const App: React.FC = () => {
  const [_, __, auth] = useAuthContext();
  const locale = locales[auth as keyof typeof locales];

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale(auth === "en" ? "en" : "mn");

  if (mnIntl.DatePicker && mnIntl.DatePicker.lang) {
    mnIntl.DatePicker.lang.shortMonths = [
      "1 сар",
      "2 сар",
      "3 сар",
      "4 сар",
      "5 сар",
      "6 сар",
      "7 сар",
      "8 сар",
      "9 сар",
      "10 сар",
      "11 сар",
      "12 сар",
    ];
    mnIntl.DatePicker.lang.shortWeekDays = [
      "Да",
      "Мя",
      "Лх",
      "Пү",
      "Ба",
      "Бя",
      "Ня",
    ];
  }
  dayjs.tz.setDefault("Asia/Ulaanbaatar");
  return (
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
          Input: {
            colorBgContainer: "#F5F8F8",
          },
          InputNumber: {
            colorBgContainer: "#F5F8F8",
          },
          Select: {
            colorBgContainer: "#F5F8F8",
          },
          DatePicker: {
            colorBgContainer: "#F5F8F8",
          },
          Descriptions: {
            colorBgContainer: "#F5F8F8",
          },
        },
      }}
      locale={auth === "en" ? enUSIntl : mnIntl}
    >
      <IntlProvider messages={locale} locale={auth?.substring(0, 2)}>
        <LevelProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </LevelProvider>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
