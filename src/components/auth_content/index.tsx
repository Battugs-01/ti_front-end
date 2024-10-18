import { FormattedMessage } from "react-intl";
import ContentOne from "/background/content-1.svg";
import ContentTwo from "/background/content-2.svg";
import Logo from "/background/logo.svg";

export const AuthContent: React.FC = () => {
  return (
    <div className="col-span-3 hidden sm:flex flex-col p-12 gap-6 bg-[#DCE3E8]">
      <div className="flex items-center justify-start mb-4">
        <img src={Logo} />
      </div>
      <div className="text-primary-700 font-bold text-2xl lg:text-3xl 2xl:text-4xl text-center mx-10">
        <FormattedMessage id="auth_title" />
      </div>
      <div className="h-1/2 mb-10">
        <div className="relative">
          <img
            src={ContentOne}
            className="absolute top-4 w-[320px] lg:w-[400px] 2xl:w-[450px]"
          />
          <img
            src={ContentTwo}
            className="absolute lg:top-10 top-40 right-10 w-[320px] lg:w-[400px] 2xl:w-[450px]"
          />
        </div>
      </div>
      <footer className="text-[#416D74] text-xl lg:text-2xl text-center mt-20">
        © Developed by Quantum Partners LLC
      </footer>
    </div>
  );
};
