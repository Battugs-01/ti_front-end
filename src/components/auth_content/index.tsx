import { useEffect, useState } from "react";
import ContentOne from "/background/login.png";

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
      className={`col-span-3 hidden md:flex flex-col gap-6  justify-between ${
        isScrollable ? "overflow-y-auto" : "overflow-hidden"
      } max-h-screen`}
    >
      <div className="relative flex-grow">
        <img
          src={ContentOne}
          className="absolute  object-contain"
          alt="Content 1"
        />
      </div>
    </div>
  );
};
