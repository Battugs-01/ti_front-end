import { Fragment, ReactNode } from "react";
import Menu from "./menu";

type WorkerLayoutType = {
  children?: ReactNode;
};

const WorkerLayout: React.FC<WorkerLayoutType> = ({ children }) => {
  return (
    <Fragment>
      <div className="w-screen h-screen bg-[#E7EDEE] font-inter">
        <div className="w-full">
          <Menu />
        </div>
        <div className="w-full">
          <div className="px-6 pt-8 pb-12">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkerLayout;
