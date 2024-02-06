import { StepsForm } from "@ant-design/pro-form";
import {  Card, Modal } from "antd";
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

type AllProps = {
  data?: ListData[];
};

export const All: React.FC<AllProps> = ({ data }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isStepModal, setStepModal] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const elderly=useRequest(orphanElderly.create,{
    manual:true
  })
  const files=useRequest(file.uploads,{
    manual:true
  })
  const cancelModal = () => {
    setOpenModal(false);
  };
  const cancelStepModal=()=>{
    setStepModal(false);
  }
  const nextModal=()=>{
    setOpenModal(false);
    setStepModal(true);
  }
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
        onFinish={async(val)=>{
          elderly.run({
            ...val,
            care_center_id:2,
            profile_id:70,
            address:{
              city_id:0,
              description:"Test",
              district_id:0,
              khoroo_id: 0,
              street: "string"
            },
            documents:{
              elderly_document_care_center_discount_inquiry: [
                70
              ],
              elderly_document_care_requet: [
                70
              ],
              elderly_document_identity_card: [
                70
              ],
              elderly_document_insurance_discounts_inquiry: [
                70
              ],
              elderly_document_insurance_notebook: [
                70
              ],
              elderly_document_is_disability_inquiry: [
                70
              ],
              elderly_document_is_divorce_inquiry: [
                70
              ],
              elderly_document_is_have_children_inquiry: [
                70
              ],
              elderly_document_is_have_sibling_inquiry: [
                70
              ],
              elderly_document_is_married_inquiry: [
                70
              ],
              elderly_document_is_pension_inquiry: [
                70
              ],
              elderly_document_other_welfare_services_inquiry: [
                70
              ],
              "elderly_document_pension_loan;": [
                70
              ],
              elderly_document_property_inquiry: [
                70
              ],
              is_pension_loan: true,
            
            },
            request:{
              definition_governor_file_ids: [
                70
              ],
              situational_file_ids: [
                70
              ]
            }
          });
          console.log(val,"this is");
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
            render: ({step,onSubmit}) => {
              return (
                <div className="flex justify-between items-center w-full">
                  <div>
                    {step !== 0 && (
                      <DefaultButton
                        icon={<img src={LeftIcon} />}
                        title={"Буцах"}
                        onClick={() => {
                          if (step > 0)
                            setCurrent(step - 1);
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
                      onClick={()=>{onSubmit && onSubmit({name:"jjj"})}}
                        extraIcon={<img src={ArrowRight} />}
                        title="Хүсэлт илгээх"
                      />
                    ) : (
                      <CustomButton
                        onClick={() => {
                          onSubmit && onSubmit()
                          if (step < 3)
                            setCurrent(step + 1);
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
              open={isStepModal}>
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
            title={<div className="text-[#344054] font-semibold mt-1">
            Асруулагчийн хувийн мэдээлэл
          </div>}
            onFinish={async (val)=>{
              return true;
            }}
          >
            <CaregiverInfoForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="documents"
            title={<div className="text-[#344054] font-semibold mt-1">
            Бүрдүүлэх бичиг баримт
          </div>}
            onFinish={async (values:any) => {
              console.log(Object.values(values)[0],"sda");
              files.runAsync({files:Object.values(values)})
              return true;
            }}
            >
            <RegistrationForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="health"
            title={<div className="text-[#344054] font-semibold mt-1">
            Эрүүл мэндийн байдал
          </div>}
            onFinish={async () => {
              return true;
            }}
            >
            <HealthForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="request"
            title={<div className="text-[#344054] font-semibold mt-1">
            Хүсэлт илгээх
          </div>}
            onFinish={async (values) => {
              files.runAsync({files:Object.values(values)})
              return true;
            }}
            >
            <SendForm />
          </StepsForm.StepForm>
        </StepsForm>
        <IModalForm open={isOpenModal} width={724} title="Асруулагч нэмэх" modalProps={{onCancel:cancelModal,onOk:nextModal}} okText={<div className="flex items-center gap-2"><img src={SearchIcon}/> <div>Хайх</div></div>}>
          <CreateForm/>
        </IModalForm>
        {/* 
        <CareGiverForm /> */}
      </Card>
    </div>
  );
};
