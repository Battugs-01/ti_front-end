import { Button } from "antd";
import ENFlag from "assets/img/en.svg";
import MNFlag from "assets/img/mn.svg";
import { useAuthContext } from "context/auth";
const size = 30;

const LanguageSelector: React.FC = () => {
  const [_, __, lang, setLang] = useAuthContext();

  const renderFlag = () => {
    if (lang === "mn") {
      return (
        <div className="flex items-center">
          <img src={MNFlag} width={size} height={size} />
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <img src={ENFlag} width={size} height={size} />
        </div>
      );
    }
  };
  return (
    <Button
      ghost
      className={`border-none option button-hover`}
      onClick={() => {
        setLang(lang === "mn" ? "en" : "mn");
        localStorage.setItem("web.locale", lang === "mn" ? "en" : "mn");
        location.reload()
      }}
    >
      <div className="flex items-center">{renderFlag()}</div>
    </Button>
  );
};

export default LanguageSelector;
