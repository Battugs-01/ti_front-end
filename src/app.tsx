import { useAuthContext } from "context/auth";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "routes";
import english from "./locales/en";
import mongolia from "./locales/mn";

const locales = {
  mn: mongolia,
  en: english,
};

const App: React.FC = () => {
  const [_, __, auth] = useAuthContext();
  const locale = locales[auth as keyof typeof locales];
  return (
    <IntlProvider messages={locale} locale={auth?.substring(0, 2)}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
