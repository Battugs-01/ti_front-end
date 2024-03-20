import { Card } from "antd";
import { ExportButton } from "components/index";
import { IModalForm } from "components/modal";
import InitTableHeader from "components/table-header";
import moment from "moment";
import { useState } from "react";
import { ListElderly } from "service/social-worker/customer/type";
import { exportFromTable } from "utils/export";
import List from "../../components/list";
import SearchIcon from "assets/government/icons/search.svg";
import { CreateForm } from "./create";
import { CareGiverCreate } from "./caregiver-create";
import CustomPagination from "components/pagination";

type AllProps = {
  data?: ListElderly[];
  list?: any;
  setPagination: (page: number, pageSize: number) => void;
  current?: number;
};

export const All: React.FC<AllProps> = ({
  data,
  list,
  setPagination,
  current,
}) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isStepModal, setStepModal] = useState<boolean>(false);

  const cancelModal = () => {
    setOpenModal(false);
  };

  const cancelStepModal = () => {
    setStepModal(false);
  };

  const nextModal = () => {
    setOpenModal(false);
    setStepModal(true);
  };
  const refreshList = () => {
    list?.run();
  };
  return (
    <div className="custom-ant-card-padding-border-remove mt-6">
      <Card loading={list?.loading}>
        <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            refresh={refreshList}
            customHeaderTitle={`Нийт (${list?.data?.total || 0})`}
            setCreate={() => setOpenModal(true)}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Нийт (6)"],
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
              url={card?.elderly?.profile?.physical_path}
              image={card?.elderly?.first_name?.substring(0, 2).toUpperCase()}
              name={card?.elderly?.first_name}
              surname={card?.elderly?.last_name}
              registrationNumber={card?.elderly?.rd}
              id={card?.elderly_id}
              state={card?.status}
              date={moment(card?.created_at).format("l")}
            />
          ))}
          <div
            className="flex justify-end mb-4 px-6"
            style={{ borderTop: "1px solid #EAECF0" }}
          >
            <CustomPagination
              total={list?.data?.total}
              setPagination={setPagination}
              // current={}
            />
          </div>
        </div>

        <IModalForm
          open={isOpenModal}
          width={724}
          title="Үйлчлүүлэгч нэмэх"
          modalProps={{ onCancel: cancelModal, onOk: nextModal }}
          okText={
            <div className="flex items-center gap-2">
              <img src={SearchIcon} /> <div>Хайх</div>
            </div>
          }
        >
          <CreateForm />
        </IModalForm>
        {/* 
        <CareGiverForm /> */}
        {isStepModal && (
          <CareGiverCreate
            cancelStepModal={cancelStepModal}
            isStepModal={isStepModal}
          />
        )}
      </Card>
    </div>
  );
};
