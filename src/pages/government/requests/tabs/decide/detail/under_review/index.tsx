import LeftDetail from "components/detail-modal/left-detail";
import RightDetail from "components/detail-modal/right-detail";
import moment from "moment";
import {
  ElderlyInterface,
  GetElderlyInterface,
} from "service/social-worker/customer/type";
import { Migration } from "./tabs/migration";
import { PageLoading } from "@ant-design/pro-layout";
import { Documents } from "pages/government/requests/components/under_review/documents";

type UnderReviewProps = {
  data?: GetElderlyInterface;
};

export const UnderReview: React.FC<UnderReviewProps> = ({ data }) => {
  const detailPromt = [
    {
      name: "Ургийн овог:",
      value: data?.elderly?.family_name,
    },
    {
      name: "Регистрийн дугаар:",
      value: data?.elderly?.rd,
    },
    {
      name: "Төрсөн огноо:",
      value: moment(data?.elderly?.birth_date).format("l"),
    },
    {
      name: "Нас:",
      value: data?.elderly?.age,
    },
    {
      name: "Хүйс",
      value: data?.elderly?.gender === 0 ? "Эрэгтэй" : "Эмэгтэй",
    },
    {
      name: "Боловсрол",
      value: data?.elderly?.education,
    },
    {
      name: "Гэрлэлтийн байдал",
      value: data?.elderly?.marriage,
    },
    {
      name: "Ам бүл",
      value: data?.elderly?.family_count,
    },
    {
      name: "Хүүхдийн тоо",
      value: data?.elderly?.children_count,
    },
    {
      name: "Асруулж байгаа шалтгаан",
      value: data?.elderly?.reason,
    },
    {
      name: "Хөгжлийн бэрхшээлтэй эсэх",
      value: data?.elderly?.is_disability ? "Тийм" : "Үгүй",
    },
    {
      name: "Онош, ХЧА-ын хувь",
      value: data?.elderly?.disability_percent + "%",
    },
  ];

  {
    data?.elderly?.is_disability &&
      detailPromt.push({
        name: "Хөгжлийн бэрхшээл",
        value: data?.elderly?.disability_types
          .map((item) => item.name)
          .join(", "),
      });
  }

  const addressInfo = [
    {
      name: "Аймаг / Нийслэл",
      value: data?.elderly?.address?.city?.name,
    },
    {
      name: "Сум /Дүүрэг",
      value: data?.elderly?.address?.district?.name,
    },
    {
      name: "Баг / Хороо",
      value: data?.elderly?.address?.khoroo?.name,
    },
    {
      name: "Гудамж / Хороолол",
      value: data?.elderly?.address?.street,
    },
    {
      name: "Хашаа / Хаалганы дугаар",
      value: data?.elderly?.address?.description,
    },
  ];

  const rightDetail = [
    {
      key: "1",
      label: "Үйл явдал",
      children: <Migration data={data?.elderly} />,
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
      <div className="box-border xl:w-[35%] w-full flex flex-col">
        {data ? (
          <LeftDetail
            url={data?.elderly?.profile?.physical_path || ""}
            items={leftitems}
            last_name={data?.elderly?.last_name}
            first_name={data?.elderly?.first_name}
          />
        ) : (
          <PageLoading />
        )}
      </div>
      <div className="xl:w-[65%] w-full">
        <RightDetail items={rightDetail} />
      </div>
    </div>
  );
};
