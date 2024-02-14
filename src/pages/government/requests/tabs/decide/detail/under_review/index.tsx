import LeftDetail from "components/detail-modal/left-detail";
import { ElderlyInterface } from "service/social-worker/customer/type";

type UnderReviewProps = {
  data?: ElderlyInterface;
};

export const UnderReview: React.FC<UnderReviewProps> = ({ data }) => {
  // const detailPromt=[[

  // ]]
  const leftitems = [
    {
      key: "1",
      label: <div className="font-semibold text-base">Хувийн мэдээлэл</div>,
      children: (
        <div>
          {/* {detailPromt?.map((item, index:number) => {
            return (
              <div
                key={index}
                className="mb-4 pt-0 mt-0 w-full flex justify-between"
              >
                <div className="text-[#475467] mt-2 col-span-1 font-normal w-[60%]">
                  {item.name}
                </div>
                <div className="font-semibold  mt-2 w-[40%]">{item.value}</div>
              </div>
            );
          })} */}
        </div>
      ),
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>He</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>test</p>,
    },
  ];

  return (
    <div className="w-full flex gap-4">
      <div className="w-[35%]">
        <LeftDetail items={leftitems} />
      </div>
      <div className="w-[65%]"></div>
    </div>
  );
};
