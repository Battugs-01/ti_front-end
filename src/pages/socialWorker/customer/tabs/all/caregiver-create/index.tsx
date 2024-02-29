import { StepsForm } from "@ant-design/pro-form";
import { Modal, message, notification } from "antd";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
import { CaregiverInfoForm } from "./caregiver-info-form.tsx";
import { RegistrationForm } from "./registration-document/index.js";
import { HealthForm } from "./health-condition/index.js";
import { SendForm } from "./request-send/index.js";
import {
  arrToObj,
  labFormat,
} from "pages/socialWorker/customer/util/arrToObj.js";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer/index.js";
import file from "service/file/index.js";
import dayjs from "dayjs";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button/index.js";
import ArrowRight from "assets/government/icons/arrow-right.svg";
import SaveIcon from "assets/government/icons/save.svg";
import LeftIcon from "assets/government/icons/left-icon.svg";
import laboratory from "service/laboratory_tests/index.js";
import { useEffect, useState } from "react";

type CaregiverType = {
  cancelStepModal?: () => void;
  isStepModal?: boolean;
};

export const CareGiverCreate: React.FC<CaregiverType> = ({
  cancelStepModal,
  isStepModal,
}) => {
  const toDistrict = useRequest(orphanElderly.sendToDistrict, {
    manual: true,
    onSuccess() {
      notification.success({
        message: "Амжилттай хүсэлт илгээгдлээ.",
      });
      setSendRequest(false);
    },
  });
  const elderly = useRequest(orphanElderly.create, {
    manual: true,
    onSuccess() {
      notification.success({
        message: "Амжилттай",
      });
      cancelStepModal?.();
    },
    onError() {
      notification.success({
        message: "Алдаа гарлаа",
      });
      cancelStepModal?.();
    },
  });
  const [sendRequest, setSendRequest] = useState(false);
  const labTests = useRequest(laboratory.get, {
    manual: true,
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
  useEffect(() => {
    labTests?.run();
  }, []);
  console.log(labTests?.data, "test");
  return (
    <div>
      <StepsForm
        onFinish={async (val) => {
          const data = await filesDoc.runAsync({
            files: Object.values(val.documents || {}),
          });
          const healthData = await filesHealth.runAsync({
            files: Object.values(val.laboratory_tests || {}),
          });
          console.log(healthData, "health sda");
          const requestData = await filesRequest.runAsync({
            files: Object.values(val.request || {}),
          });
          const docs = arrToObj(data, val?.documents);
          const request = arrToObj(requestData, val?.request);
          // health yvahguu bgaa uchraas laboratory_tests bolgovol boloh yostoi
          const health = labFormat(
            healthData,
            val?.laboratory_tests,
            labTests?.data
          );
          const elderlyData = await elderly.runAsync({
            ...val,
            profile_id: 70,
            address: {
              ...val?.address,
            },
            laboratory_tests: health,
            documents: docs,
            request: request,
            birth_date: dayjs(val?.birth_date).toDate(),
          });
          sendRequest && toDistrict.run(elderlyData?.id);
        }}
        stepsProps={{
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
          render: ({ step, onSubmit, onPre }) => {
            return (
              <div className="flex justify-between items-center w-full">
                <div>
                  {step !== 0 && (
                    <DefaultButton
                      icon={<img src={LeftIcon} />}
                      title={"Буцах"}
                      onClick={() => {
                        onPre();
                      }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <DefaultButton
                    onClick={() => {
                      onSubmit && onSubmit();
                    }}
                    icon={<img src={SaveIcon} />}
                    title="Түр хадгалах"
                  />
                  {step === 3 ? (
                    <CustomButton
                      onClick={() => {
                        onSubmit && onSubmit();
                      }}
                      extraIcon={<img src={ArrowRight} />}
                      title="Хүсэлт илгээх"
                    />
                  ) : (
                    <CustomButton
                      onClick={() => {
                        onSubmit && onSubmit();
                        setSendRequest(true);
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
              title={
                <div className="p-6">
                  <div className="font-semibold">
                    Үйлчлүүлэгч нэмэх (РЕ96124578)
                  </div>
                </div>
              }
              footer={
                <div className="p-6" style={{ borderTop: "1px solid #D0D5DD" }}>
                  {submitter}
                </div>
              }
              onCancel={cancelStepModal}
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
              Үйлчлүүлэгчийн хувийн мэдээлэл
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
          onFinish={async (values: any) => {
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
            return true;
          }}
        >
          <SendForm />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};
