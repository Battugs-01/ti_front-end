import { LeftOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Modal, Tabs } from "antd";
import LoomIcon from "assets/government/icons/loom.svg";
import EmployeeIcon from "assets/government/icons/employees.svg";
import CalendarIcon from "assets/government/icons/calendar.svg";
import BedIcon from "assets/government/icons/bed.svg";
import ReportIcon from "assets/government/icons/report.svg";
import HeartIcon from "assets/government/icons/heart-hand.svg";
import CheckCircle from "assets/government/icons/checkCircle.svg";
import moment from "moment";
import { DefaultButton } from "pages/government/components/button";
import { CardInterface, TabType } from "service/gov-orphan";
import { moneyFormat } from "utils/index";
import { Fragment, useState } from "react";
import { CloseButton, ConfirmButton } from "components/button/action";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../modal";

const items = [
  {
    key: TabType.employees,
    label: "Ажилчид",
  },
  {
    key: TabType.care,
    label: "Асруулагчид",
  },
  {
    key: TabType.report,
    label: "Тайлан",
  },
  {
    key: TabType.form,
    label: "Бүртгэлийн маягт",
  },
];

type HeaderType = {
  tab?: String;
  changeTab: any;
  data: any;
};

const Header: React.FC<HeaderType> = ({ changeTab, data, tab }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Card
      className="px-4"
      title={
        <div className="flex items-center gap-4">
          <Link to={"/dashboard/government/orphan"}>
            <DefaultButton
              title="Буцах"
              icon={<LeftOutlined rev={undefined} />}
            />
          </Link>
          <div className="flex items-center gap-2">
            <img src={LoomIcon} />
            <div className="font-bold">Батсүмбэрийн Улсын асрамжийн газар</div>
          </div>
        </div>
      }
      extra={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src={EmployeeIcon} />
            <div>Ажилчид:</div>
            <div>{data?.emplopyees}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={CalendarIcon} />
            <div>Сүүлийн сард:</div>
            <div>{data?.plan}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={BedIcon} />
            <div>Орны тоо:</div>
            <div>{data?.bedNumber}</div>
            <div>/ {data?.bedNumberMax}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={ReportIcon} />
            <div>Тайлан:</div>
            <div>{data?.report}</div>
            <div>/ {data?.reportMax}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1">
            <img src={HeartIcon} />
            <div>Хандив:</div>
            <div>{moneyFormat(data?.donation, "mnt")}</div>
          </div>
          {tab === TabType.form ? (
            <div className="flex items-center gap-4">
              <CloseButton title="Татгалзах" />
              <ConfirmButton title="Магадлан итгэмжлэх" onClick={showModal} />
            </div>
          ) : (
            <Fragment>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={CheckCircle} />
                <div>{data?.name}</div>
                <div>{moment(data?.date).format("l")}</div>
              </div>
            </Fragment>
          )}
        </div>
      }
    >
      <Tabs
        defaultActiveKey={TabType.employees}
        onChange={changeTab}
        items={items?.map((el) => {
          return {
            key: el?.key,
            label: <div className="flex items-center gap-2">{el?.label}</div>,
          };
        })}
      />
      <div className="custom-ant-modal-padding">
        <ConfirmModal
          width={350}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          title="Магадлан итгэмжлэх үү?"
          content="“Батсүмбэрийн Улсын асрамжийн газар”-г магадлан итгэмжлэхдээ итгэлтэй
        байна уу?"
        />
      </div>
      {/* <Modal
        title="Магадлан итгэмжлэх үү?"
        open={isModalOpen}
        footer={() => {
          return (
            <Fragment>
              <Button type="default">Болих</Button>
              <ConfirmButton title="Магадлан итгэмжлэх" />
            </Fragment>
          );
        }}
      >
        “Батсүмбэрийн Улсын асрамжийн газар”-г магадлан итгэмжлэхдээ итгэлтэй
        байна уу?
      </Modal> */}
    </Card>
  );
};

export default Header;
