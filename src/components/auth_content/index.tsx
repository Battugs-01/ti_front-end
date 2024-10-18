import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import ContentOne from "/background/content-1.svg";
import ContentTwo from "/background/content-2.svg";
import Logo from "/background/logo.svg";

export const AuthContent: React.FC = () => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      if (window.innerHeight < 720) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    };

    window.addEventListener("resize", checkHeight);

    checkHeight();

    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <div
      className={`col-span-3 hidden md:flex flex-col p-12 gap-6 bg-[#DCE3E8] justify-between ${
        isScrollable ? "overflow-y-auto" : "overflow-hidden"
      } max-h-screen`}
    >
      <div className="flex items-center justify-start mb-4">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="text-primary-700 font-bold text-2xl lg:text-3xl 2xl:text-4xl text-center mx-10">
        <FormattedMessage id="auth_title" />
      </div>
      <div className="relative flex-grow">
        <img
          src={ContentOne}
          className={`absolute top-4 w-[300px] ${
            isScrollable ? "lg:w-[300px]" : "lg:w-[400px] xl:w-[450px]"
          }  object-contain`}
          alt="Content 1"
        />
        <img
          src={ContentTwo}
          className={`absolute lg:top-10 top-40 right-10 w-[300px] ${
            isScrollable ? "lg:w-[300px]" : "lg:w-[400px] xl:w-[450px]"
          }  object-contain`}
          alt="Content 2"
        />
      </div>
      <footer className="text-[#416D74] text-xl lg:text-2xl text-center">
        © Developed by Quantum Partners LLC
      </footer>
    </div>
  );
};
