import { Fragment, ReactNode } from "react";
import Menu from "./menu";

type WorkerLayoutType = {
  children?: ReactNode;
};

const WorkerLayout: React.FC<WorkerLayoutType> = ({ children }) => {
  return (
    <Fragment>
      <div className="bg-[#E7EDEE] font-inter bg-color-body min-h-screen relative">
        <div className="z-0">
          <Menu />
        </div>
        <div>
          <div className="px-6 pt-8 pb-12 z-50">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkerLayout;
