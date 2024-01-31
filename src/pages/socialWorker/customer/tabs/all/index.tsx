import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { ListData } from "service/social-worker/customer/type";
import { exportFromTable } from "utils/export";
import List from "../../components/list";
import moment from "moment";
import { IModalForm } from "components/modal";
import { useState } from "react";
import SearchIcon from "assets/government/icons/search.svg";
import { CreateForm } from "./create";
import { CareGiverForm } from "./caregiver-create";

type AllProps = {
  data?: ListData[];
};

export const All: React.FC<AllProps> = ({ data }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const cancelModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="custom-ant-card-padding-border-remove mt-6">
      <Card>
        <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            refresh={() => {}}
            customHeaderTitle="Бүгд"
            setCreate={() => setOpenModal(true)}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Бүгд"],
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
        <div className="w-full">
          {data?.map((card, key) => (
            <List
              key={key}
              image={card?.image}
              name={card?.name}
              surname={card?.surname}
              registrationNumber={card?.registrationNumber}
              state={card?.state}
              date={moment(card?.date).format("l")}
            />
          ))}
        </div>
        <IModalForm
          successData={() => {}}
          modalProps={{ onCancel: cancelModal }}
          title={"Асруулагч нэмэх"}
          okText={
            <div className="flex items-center gap-2">
              {" "}
              <img src={SearchIcon} alt="search" />
              <div>Хайх</div>
            </div>
          }
          cancelVisible={true}
          open={isOpenModal}
          width={1016}
        >
          <CareGiverForm />
        </IModalForm>
      </Card>
    </div>
  );
};
