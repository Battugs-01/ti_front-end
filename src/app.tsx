import { useAuthContext } from "context/auth";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "routes";
import english from "./locales/en";
import mongolia from "./locales/mn";
import { LevelProvider } from "components/custom-detail/selected-level";

const locales = {
  mn: mongolia,
  en: english,
};

const App: React.FC = () => {
  const [_, __, auth] = useAuthContext();
  const locale = locales[auth as keyof typeof locales];
  return (
    <IntlProvider messages={locale} locale={auth?.substring(0, 2)}>
      <LevelProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </LevelProvider>
    </IntlProvider>
  );
};

export default App;
