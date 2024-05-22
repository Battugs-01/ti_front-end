import { PageLoading } from "@ant-design/pro-layout";
import { Card, Empty } from "antd";
import { FormInstance } from "antd/lib";
import SearchIcon from "assets/government/icons/search.svg";
import { ExportButton } from "components/index";
import { IModalForm } from "components/modal";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import { useRef, useState } from "react";
import { ListElderly } from "service/social-worker/customer/type";
import { caregiverFilterSum } from "utils/caregiver-filter";
import { exportFromTable } from "utils/export";
import List from "../../components/list";
import { CareGiverCreate } from "./caregiver-create";
import { CreateForm } from "./create";

type AllProps = {
  data?: ListElderly[];
  list?: any;
  setPagination: (page: number, pageSize: number) => void;
  current?: number;
  page?: any;
  tab?: any;
  setSearch?: any;
  searchRun?: any;
  refreshList: () => void;
  totalItems?: number;
};

export const All: React.FC<AllProps> = ({
  data,
  setPagination,
  list,
  setSearch,
  searchRun,
  page,
  tab,
  current,
  refreshList,
  totalItems,
}) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isStepModal, setStepModal] = useState<boolean>(false);
  const [registerNumber, setRegister] = useState<boolean>(false);

  const formRef = useRef<FormInstance>(null);
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

  return (
    <div className="custom-ant-card-padding-border-remove mt-6">
      <Card>
        <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            refresh={refreshList}
            customHeaderTitle={`Үйлчлүүлэгчдийн жагсаалт`}
            setCreate={() => setOpenModal(true)}
            setSearch={(e) => {
              setSearch(e || "");
              searchRun.run({
                query: e,
                ...page,
                status: caregiverFilterSum(tab),
              });
            }}
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
        {list?.loading ? (
          <PageLoading />
        ) : totalItems === 0 ? (
          <Empty
            className="h-full items-center flex flex-col justify-center"
            description="Мэдээлэл байхгүй байна"
          />
        ) : (
          <div className="w-full">
            {data?.map((card, key) => (
              <List data={card} refreshList={refreshList} key={key} />
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
        )}

        <IModalForm
          open={isOpenModal}
          formRef={formRef}
          onOpenChange={() => formRef.current?.resetFields()}
          width={724}
          title="Үйлчлүүлэгч нэмэх"
          modalProps={{ onCancel: cancelModal, onOk: nextModal }}
          okText={
            <div className="flex items-center gap-2">
              <img src={SearchIcon} /> <div>Хайх</div>
            </div>
          }
          onRequest={async (values) => {
            setRegister(values);
          }}
        >
          <CreateForm />
        </IModalForm>
        {/* 
        <CareGiverForm /> */}
        {isStepModal && (
          <CareGiverCreate
            registerNumber={registerNumber}
            refreshList={refreshList}
            cancelStepModal={cancelStepModal}
            isStepModal={isStepModal}
          />
        )}
      </Card>
    </div>
  );
};
