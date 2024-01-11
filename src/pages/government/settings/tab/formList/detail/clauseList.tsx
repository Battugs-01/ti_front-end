import { Collapse } from "antd";
import { ClauseInterface } from "service/gov-settings";

type ClauseListType = {
  clauseList?: ClauseInterface[];
};

export const ClauseList: React.FC<ClauseListType> = ({ clauseList }) => {
  return (
    <div className="custom-ant-collapse mt-6 w-3/5 m-auto">
      {clauseList?.map((collapse, key) => {
        return (
          <Collapse
            key={key}
            className="mb-4"
            expandIconPosition="end"
            items={[
              {
                key,
                label: (
                  <div className="flex items-center gap-4 text-xl text-[#1D2939]">
                    <div className="font-bold">{collapse?.clauseId}</div>{" "}
                    <div className="font-bold">
                      {collapse?.clauseDescription}
                    </div>
                  </div>
                ),
                children: (
                  <div className="text-gray-500">{collapse?.clauseContent}</div>
                ),
              },
            ]}
          />
        );
      })}
    </div>
  );
};
