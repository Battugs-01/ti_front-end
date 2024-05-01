import LeftDetail from "components/detail-modal/left-detail";
import RightDetail from "components/detail-modal/right-detail";
import moment from "moment";
import { ElderlyInterface } from "service/social-worker/customer/type";
import { Migration } from "./tabs/migration";
import { FiledDocuments } from "./tabs/filed_documents";
import { HealthStatus } from "./tabs/health_status";

type UnderReviewProps = {
  data?: ElderlyInterface;
};

export const UnderReview: React.FC<UnderReviewProps> = ({ data }) => {
  const detailPromt = [
    {
      name: "Ургийн овог:",
      value: data?.family_name,
    },
    {
      name: "Регистрийн дугаар:",
      value: data?.rd,
    },
    {
      name: "Төрсөн огноо:",
      value: moment(data?.birth_date).format("l"),
    },
    {
      name: "Нас:",
      value: data?.age,
    },
    {
      name: "Хүйс",
      value: data?.gender,
    },
    {
      name: "Боловсрол",
      value: data?.education,
    },
    {
      name: "Гэрлэлтийн байдал",
      value: data?.marriage,
    },
    {
      name: "Ам бүл",
      value: data?.family_count,
    },
    {
      name: "Хүүхдийн тоо",
      value: data?.children_count,
    },
    {
      name: "Асруулж байгаа шалтгаан",
      value: data?.reason,
    },
    {
      name: "Хөгжлийн бэрхшээлтэй эсэх",
      value: data?.is_disability,
    },
    {
      name: "Онош, ХЧА-ын хувь",
      value: data?.disability_percent + "%",
    },
  ];

  {
    data?.is_disability &&
      detailPromt.push({
        name: "Хөгжлийн бэрхшээл",
        value: data?.disability_types.map((item) => item.name).join(", "),
      });
  }
  const rightDetail = [
    {
      key: "1",
      label: "Шилжилт хөдөлгөөн",
      children: <Migration data={data} />,
    },
    {
      key: "2",
      label: "Бүрдүүлсэн бичиг баримт",
      children: <FiledDocuments data={data} />,
    },
    {
      key: "3",
      label: "Эрүүл мэндийн байдал",
      children: <HealthStatus />,
    },
  ];
  const leftitems = [
    {
      key: "1",
      label: <div className="font-semibold text-base">Хувийн мэдээлэл</div>,
      children: (
        <div>
          {detailPromt?.map((item, index: number) => {
            return (
              <div
                key={index}
                className="mb-4 pt-0 mt-0 w-full flex justify-between"
              >
                <div className="text-[#475467] mt-2 col-span-1 text-base font-normal w-[60%]">
                  {item.name}
                </div>
                <div className="mt-2 w-[40%] font-bold text-base ">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: <div className="font-semibold text-base">Оршин суугаа хаяг</div>,
      children: <p>He</p>,
    },
  ];

  return (
    <div className="w-full flex gap-4 p-4 bg-[#F5F8F8] box-border">
      <div className="w-[35%] box-border">
        <LeftDetail
          items={leftitems}
          last_name={data?.last_name}
          first_name={data?.first_name}
        />
      </div>
      <div className="w-[65%]">
        <RightDetail items={rightDetail} />
      </div>
    </div>
  );
};
