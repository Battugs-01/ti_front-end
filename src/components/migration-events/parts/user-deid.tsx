import { Avatar, Col, Row } from "antd";
import CareGiverBadge from "components/badge/caregiver";
import CustomCard from "components/custom-card";
import dayjs from "dayjs";
import moment from "moment";
import { FC } from "react";
import file from "service/file";
import { moneyFormat } from "utils/index";

interface Props {
  data: any;
}

const UserDied: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="flex-col flex items-start">
        <div className="flex justify-between ">
          <div className="font-medium text-sm ">
            <CareGiverBadge status={data?.status_code} />
          </div>
        </div>
        <div>{dayjs(data.updated_at).format("YYYY-MM-DD HH:mm:ss")}</div>
        <div className="flex gap-2 items-center my-2 ">
          <Avatar
            shape="circle"
            size={30}
            src={file.fileToUrl(
              data?.modified_employee?.profile?.physical_path || "AS"
            )}
            className="flex items-center"
          />
          <div className="flex flex-col m-0 p-0 ">
            <p className="m-0 p-0 text-sm font-semibold capitalize">
              {data?.modified_employee?.first_name}
            </p>
            <p className="m-0 p-0 text-xs font-normal capitalize">
              {data?.modified_employee?.position}
            </p>
          </div>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
            <div className="grid grid-cols-1 gap-5">
              <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                <CustomCard
                  title="Дугаар"
                  children={data?.movement?.unique_number}
                />
                <CustomCard
                  title="Нас барсан огноо"
                  children={
                    <div className="text-xs font-bold flex gap-2 ">
                      <span className="mt-1">
                        {moment(data?.movement?.death_date).format(
                          "YYYY/MM/DD"
                        )}
                      </span>
                    </div>
                  }
                />
                <CustomCard
                  title="Нас барсан цаг"
                  children={
                    <div className="text-xs font-bold flex gap-2 ">
                      <span className="mt-1">
                        {moment(data?.movement?.death_date).format(
                          "YYYY/MM/DD"
                        )}
                      </span>
                    </div>
                  }
                />
                <CustomCard
                  title="Нас барсны гэрчилгээ"
                  children={data?.movement?.unique_number}
                />
                <CustomCard
                  title="Шүүх эмнэлгийн тодорхойлолт"
                  children={data?.movement?.unique_number}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={11} className="mr-1">
          <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
            <div className="grid grid-cols-1 gap-5">
              <span className="text-sm font-medium">Буяны ажил</span>
              <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                <CustomCard
                  title="Буяны ажил гүйцэтгэгч байгууллага"
                  children={data?.movement?.charity_work?.company_name}
                />
                <CustomCard
                  title="Холбоо барих дугаар"
                  children={data?.movement?.charity_work?.phone_numbers[0]}
                />
                <CustomCard
                  title="Оршуулгын байршил"
                  children={data?.movement?.charity_work?.address}
                />
                <CustomCard
                  title="Бүртгэсэн огноо"
                  children={
                    <div className="text-xs font-bold flex gap-2 ">
                      <span className="mt-1">
                        {moment(
                          data?.movement?.charity_work?.created_at
                        ).format("YYYY/MM/DD")}
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserDied;