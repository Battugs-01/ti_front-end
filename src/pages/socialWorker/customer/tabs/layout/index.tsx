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
import CustomPagination from "components/pagination";
import { CreateForm } from "../all/create";
import { CareGiverCreate } from "../all/caregiver-create";

type LayoutProps = {
  data?: ListElderly[];
  list?: any;
  setPagination: (page: number, pageSize: number) => void;
  current?: number;
  refreshList: () => void;
  totalItems?: number;
};

export const Layout: React.FC<LayoutProps> = ({
  data,
  list,
  setPagination,
  current,
  refreshList,
  totalItems,
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
  // const refreshList = () => {
  //   list?.run();
  // };
  return (
    <div className="custom-ant-card-padding-border-remove mt-6">
      <Card loading={list?.loading}>
        <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            refresh={refreshList}
            customHeaderTitle={`Нийт (${data?.length || 0})`}
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
            <List data={card} key={key} />
          ))}
          <div
            className="flex justify-end mb-4 px-6"
            style={{ borderTop: "1px solid #EAECF0" }}
          >
            <CustomPagination
              total={list?.data?.total}
              setPagination={setPagination}
              current={current}
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
            refreshList={refreshList}
            cancelStepModal={cancelStepModal}
            isStepModal={isStepModal}
          />
        )}
      </Card>
    </div>
  );
};
