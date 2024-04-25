import LeftDetail from "components/detail-modal/left-detail";
import RightDetail from "components/detail-modal/right-detail";
import moment from "moment";
import { ElderlyInterface } from "service/social-worker/customer/type";
import { Migration } from "./tabs/migration";
import { Documents } from "./documents";

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
      value: data?.gender === 0 ? "Эрэгтэй" : "Эмэгтэй",
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
      value: data?.is_disability ? "Тийм" : "Үгүй",
    },
    {
      name: "Онош, ХЧА-ын хувь",
      value: data?.disability_percent,
    },
  ];
  const addressInfo = [
    {
      name: "Аймаг / Нийслэл",
      value: data?.address?.city?.name,
    },
    {
      name: "Сум /Дүүрэг",
      value: data?.address?.district?.name,
    },
    {
      name: "Баг / Хороо",
      value: data?.address?.khoroo?.name,
    },
    {
      name: "Гудамж / Хороолол",
      value: data?.address?.street,
    },
    {
      name: "Хашаа / Хаалганы дугаар",
      value: data?.address?.description,
    },
  ];
  const rightDetail = [
    {
      key: "1",
      label: "Үйл явдал",
      children: <Migration data={data} />,
    },
    {
      key: "2",
      label: "Бичиг баримт",
      children: <Documents data={data} />,
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
      children: (
        <div>
          {addressInfo?.map((item, index: number) => {
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
  ];

  return (
    <div className="w-full flex gap-4 p-4 bg-[#F5F8F8] box-border xl:flex-row flex-col">
      <div className="xl:w-[35%] w-full box-border">
        <LeftDetail
          items={leftitems}
          last_name={data?.last_name}
          first_name={data?.first_name}
          url={data?.profile?.physical_path || ""}
        />
      </div>
      <div className="xl:w-[65%] w-full">
        <RightDetail items={rightDetail} />
      </div>
    </div>
  );
};
