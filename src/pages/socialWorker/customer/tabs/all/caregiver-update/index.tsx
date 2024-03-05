import { StepsForm } from "@ant-design/pro-form";
import { Modal, message } from "antd";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
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
import { CaregiverInfoForm } from "./caregiver-info-formation/index.js";
import { RegistrationForm } from "./registration-document/index.js";
import { PageLoading } from "@ant-design/pro-layout";
import {
  Documents,
  ElderlyInterface,
} from "service/social-worker/customer/type.js";
import laboratory from "service/laboratory_tests/index.js";
import { useEffect } from "react";

type CaregiverType = {
  cancelStepModal?: () => void;
  isStepModal?: boolean;
  id: number;
};

export const CareGiverUpdate: React.FC<CaregiverType> = ({
  cancelStepModal,
  isStepModal,
  id,
}) => {
  const elderly = useRequest(async () => orphanElderly.getElderly(id));
  const elderlyEdit = useRequest(orphanElderly.elderlyEdit, {
    manual: true,
    onSuccess() {
      message.success("Амжилттай");
      cancelStepModal?.();
    },
    onError() {
      message.error("Амжилтгүй");
      cancelStepModal?.();
    },
  });
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
          const requestData = await filesRequest.runAsync({
            files: Object.values(val.request || {}),
          });
          const docs = arrToObj(data, val?.documents);
          const request = arrToObj(requestData, val?.request);
          const health = labFormat(
            healthData,
            val?.laboratory_tests,
            labTests?.data
          );
          elderlyEdit.runAsync(
            {
              ...val,
              profile_id: 70,
              address: {
                ...val?.address,
              },
              laboratory_tests: health,
              documents: docs,
              request: request,
              birth_date: dayjs(val?.birth_date).toDate(),
            },
            id
          );
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
                    Үйлчлүүлэгч засах (РЕ96124578)
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
          {elderly?.loading ? (
            <PageLoading />
          ) : (
            <CaregiverInfoForm data={elderly?.data as ElderlyInterface} />
          )}
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
          {elderly?.loading ? (
            <PageLoading />
          ) : (
            <RegistrationForm data={elderly?.data?.documents} />
          )}
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
