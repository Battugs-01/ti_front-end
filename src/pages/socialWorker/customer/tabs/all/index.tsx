import { StepsForm } from "@ant-design/pro-form";
import { Card, Modal, message } from "antd";
import { ExportButton } from "components/index";
import { IModalForm } from "components/modal";
import InitTableHeader from "components/table-header";
import moment from "moment";
import { useState } from "react";
import { ListData } from "service/social-worker/customer/type";
import { exportFromTable } from "utils/export";
import List from "../../components/list";
import { CaregiverInfoForm } from "./caregiver-create/caregiver-info-form.tsx";
import { RegistrationForm } from "./caregiver-create/registration-document";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button";
import ArrowRight from "assets/government/icons/arrow-right.svg";
import SaveIcon from "assets/government/icons/save.svg";
import { HealthForm } from "./caregiver-create/health-condition";
import { SendForm } from "./caregiver-create/request-send";
import LeftIcon from "assets/government/icons/left-icon.svg";
import SearchIcon from "assets/government/icons/search.svg";
import { CreateForm } from "./create";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import file from "service/file";
import dayjs from "dayjs";

type AllProps = {
  data?: ListData[];
};

export const All: React.FC<AllProps> = ({ data }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isStepModal, setStepModal] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const elderly = useRequest(orphanElderly.create, {
    manual: true,
    onSuccess() {
      message.success("Амжилттай");
      setStepModal(false);
    },
    onError() {
      message.error("Амжилтгүй");
      setStepModal(false);
    },
  });
  const filesDoc = useRequest(file.uploads, {
    manual: true,
  });
  const filesHealth = useRequest(file.uploads, {
    manual: true,
  });
  const filesRequest = useRequest(file.uploads, {
    manual: true,
  });
  const cancelModal = () => {
    setStepModal(false);
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
            refresh={() => {}}
            customHeaderTitle="Нийт (6)"
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
              image={card?.image}
              name={card?.name}
              surname={card?.surname}
              registrationNumber={card?.registrationNumber}
              state={card?.state}
              date={moment(card?.date).format("l")}
            />
          ))}
        </div>
        <StepsForm
          onFinish={async (val) => {
            console.log(" sda ", val);
            console.log(" sda documents ", val.documents);

            const data = await filesDoc.runAsync({
              files: Object.values(val.documents || {}),
            });
            // const healthData= await filesHealth.runAsync({ files: Object.values(val.laboratorytests) });
            const requestData = await filesRequest.runAsync({
              files: Object.values(val.request || {}),
            });
            const arrToObj = (data: any, value: any) => {
              console.log("Data", data);
              console.log("Value", value);

              if (!data || !value) {
                return;
              }
              const array = Object.keys(value)?.map((el, i) => {
                return {
                  [el]: data[i].id,
                };
              });
              const docsObject = array.reduce((acc, obj) => {
                return Object.assign(acc, obj);
              }, {});
              return docsObject;
            };

            const docs = arrToObj(data, val?.documents);
            const request = arrToObj(requestData, val?.request);
            // files.runAsync({ files: Object.values(val.request) });
            await elderly.runAsync({
              ...val,
              care_center_id: 2,
              profile_id: 70,
              address: {
                ...val?.address,
              },
              documents: docs,
              request: request,
              // birth_date:
            });
            console.log(val, "this is");
          }}
          current={current}
          stepsProps={{
            onChange: (val) => {
              setCurrent(val);
            },
            current,
            progressDot: (icon, { index, status }) => {
              switch (status) {
                case "finish":
                  return (
                    <div className="bg-[#F5F8F8] rounded-full w-6 h-6 p-1">
                      <img src={checkSvg} alt="check" />
                    </div>
                  );
                case "wait":
                  return (
                    <div className="bg-[#F9FAFB] rounded-full p-1 w-6 h-6">
                      <div className="bg-[#F9FAFB] rounded-full w-full h-full">
                        <img src={waitCircle} alt="finishCircle" />
                      </div>
                    </div>
                  );
                case "process":
                  return (
                    <div className="bg-[#F5F8F8] rounded-full p-1 w-6 h-6">
                      <div className="bg-[#F5F8F8] rounded-full w-full h-full">
                        <img src={finishCircle} alt="finishCircle" />
                      </div>
                    </div>
                  );
              }
            },
          }}
          submitter={{
            render: ({ step, onSubmit }) => {
              return (
                <div className="flex justify-between items-center w-full">
                  <div>
                    {step !== 0 && (
                      <DefaultButton
                        icon={<img src={LeftIcon} />}
                        title={"Буцах"}
                        onClick={() => {
                          if (step > 0) setCurrent(step - 1);
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <DefaultButton
                      icon={<img src={SaveIcon} />}
                      title="Түр хадгалах"
                    />
                    {step === 3 ? (
                      <CustomButton
                        onClick={() => {
                          onSubmit && onSubmit({ name: "jjj" });
                        }}
                        extraIcon={<img src={ArrowRight} />}
                        title="Хүсэлт илгээх"
                      />
                    ) : (
                      <CustomButton
                        onClick={() => {
                          onSubmit && onSubmit();
                          if (step < 3) setCurrent(step + 1);
                        }}
                        extraIcon={<img src={ArrowRight} />}
                        title="Дараагийнх"
                      />
                    )}
                  </div>
                </div>
              );
            },
          }}
          stepsFormRender={(dom, submitter) => {
            return (
              <Modal
                width={1064}
                title={"Асруулагч нэмэх"}
                footer={submitter}
                onCancel={cancelModal}
                open={isStepModal}
              >
                {dom}
              </Modal>
              // <IModalForm
              //   successData={() => {}}
              //   modalProps={{ onCancel: cancelStepModal }}
              //   title={"Асруулагч нэмэх"}
              //   footer={submitter}
              //   open={isStepModal}
              //   width={1064}
              // >
              //   {dom}
              // </IModalForm>
            );
          }}
        >
          <StepsForm.StepForm
            name="giver-info"
            title={
              <div className="text-[#344054] font-semibold mt-1">
                Асруулагчийн хувийн мэдээлэл
              </div>
            }
            onFinish={async (val) => {
              return true;
            }}
          >
            <CaregiverInfoForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="documents"
            title={
              <div className="text-[#344054] font-semibold mt-1">
                Бүрдүүлэх бичиг баримт
              </div>
            }
            onFinish={async (values: any) => {
              console.log(Object.values(values)[0], "sda");

              return true;
            }}
          >
            <RegistrationForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="health"
            title={
              <div className="text-[#344054] font-semibold mt-1">
                Эрүүл мэндийн байдал
              </div>
            }
            onFinish={async () => {
              return true;
            }}
          >
            <HealthForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="request"
            title={
              <div className="text-[#344054] font-semibold mt-1">
                Хүсэлт илгээх
              </div>
            }
            onFinish={async (values) => {
              console.log("3 dah upload", values);
              // files.runAsync({ files: Object.values(values) });
              return true;
            }}
          >
            <SendForm />
          </StepsForm.StepForm>
        </StepsForm>
        <IModalForm
          open={isOpenModal}
          width={724}
          title="Асруулагч нэмэх"
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
      </Card>
    </div>
  );
};
