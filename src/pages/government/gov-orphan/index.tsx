import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import { useState } from "react";
import { CreateOrphan } from "./action/create/createOrphan";
import { Item } from "./item";
import { useRequest } from "ahooks";
import orphanUser from "service/gov-orphan/requests";

const data = [
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батэрдэнэ",
    lastName: "Отгонбаяр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    mail: "trungkienspktnd@gamail.com",
    company: "“Гурван гал” ХХК",
    bankName: "Khan",
    bankNumber: "5031738138",
    id: 45,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батбаяр",
    lastName: "Төгөлдөр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    mail: "manhhachkt08@gmail.com",
    company: "“Аглаг уул” ХХК",
    bankName: "Khas",
    bankNumber: "5031738138",
    id: 12,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батэрдэнэ",
    lastName: "Отгонбаяр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    bankName: "Golomt",
    mail: "trungkienspktnd@gamail.com",
    company: "“Гурван гал” ХХК",
    bankNumber: "5031738138",
    id: 56,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батэрдэнэ",
    lastName: "Отгонбаяр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    mail: "trungkienspktnd@gamail.com",
    company: "“Дахиад нэг компани” ХХК",
    bankName: "Trade",
    bankNumber: "5031738138",
    id: 67,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батэрдэнэ",
    lastName: "Отгонбаяр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    mail: "trungkienspktnd@gamail.com",
    company: "“Гурван гал” ХХК",
    bankName: "Khas",
    bankNumber: "5031738138",
    id: 89,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батэрдэнэ",
    lastName: "Отгонбаяр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    mail: "trungkienspktnd@gamail.com",
    company: "“Залуучуудын газар” ХХК",
    bankName: "Khan",
    bankNumber: "5031738138",
    id: 78,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    firstName: "Батэрдэнэ",
    lastName: "Отгонбаяр",
    position: "Ахлах мэргэжилтэн",
    phone: "99703101",
    mail: "trungkienspktnd@gamail.com",
    company: "“Говь гурван сайхан” ХХК",
    bankName: "Golomt",
    bankNumber: "5031738138",
    id: 34,
  },
];

const GovOrphan: React.FC = () => {
  const [isOpenModal, setModalOpen] = useState<boolean>(false);
  const orphanList = useRequest(() =>
    orphanUser.getList({ current: 1, pageSize: 20 })
  );
  console.log(orphanList.data, "jkkkk");
  const openModal = () => {
    setModalOpen(true);
  };
  const cancelModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="mt-6 custom-ant-card-padding-remove">
      <Card>
        <div style={{ borderBottom: "1px solid #EAECF0" }} className="mt-5">
          <InitTableHeader
            addButtonName="Нэмэх"
            setCreate={setModalOpen}
            customHeaderTitle="Асрамжийн газрын жагсаалт"
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Асрамжийн газрын жагсаалт"],
                      window.document.getElementById(
                        "main-table"
                      ) as HTMLElement,
                      window
                    );
                  }}
                />
              </div>
            }
          />
        </div>
        <div>
          {orphanList?.data?.items?.map((item, key) => {
            return <Item key={key} data={item} />;
          })}
        </div>
        <CreateOrphan openModal={isOpenModal} cancelModal={cancelModal} />
      </Card>
    </div>
  );
};

export default GovOrphan;
