import { Select } from "antd";
import MNFlag from "assets/img/mn.svg";
import ENFlag from "assets/img/en.svg";
import { useAuthContext } from "context/auth";
const size = 30;

const LanguageSelector: React.FC = () => {
  const [_, __, lang, setLang] = useAuthContext();
  return (
    <Select
      bordered={false}
      removeIcon={false}
      suffixIcon={false}
      defaultValue={lang}
      className={`border-none option`}
      onChange={(value) => {
        setLang(value);
        localStorage.setItem("web.locale", value);
      }}
    >
      <Select.Option value="mn">
        <div className="flex items-center">
          <img src={MNFlag} width={size} height={size} />
        </div>
      </Select.Option>
      <Select.Option value="en">
        <div className="flex items-center">
          <img src={ENFlag} width={size} height={size} />
        </div>
      </Select.Option>
    </Select>
  );
};

export default LanguageSelector;
