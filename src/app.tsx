import { ConfigProvider } from "antd";
import mnIntl from "antd/lib/locale/mn_MN";
import dayjs from "dayjs";
import "dayjs/locale/mn";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "routes";

const App: React.FC = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("mn");

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
          colorPrimary: "#0077F4",
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
            rowHoverBg: "#F9FAFB",
            rowSelectedHoverBg: "#E7EDEE",
            rowExpandedBg: "#F9FAFB",
          },
          Input: {
            colorBgContainer: "#F9FAFB",
          },
          InputNumber: {
            colorBgContainer: "#F9FAFB",
          },
          Select: {
            colorBgContainer: "#F9FAFB",
          },
          DatePicker: {
            colorBgContainer: "#F9FAFB",
          },
          Descriptions: {
            colorBgContainer: "#F9FAFB",
          },
        },
      }}
      locale={mnIntl}
    >
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
