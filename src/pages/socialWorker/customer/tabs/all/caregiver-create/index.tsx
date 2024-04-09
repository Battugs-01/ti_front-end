import { ProFormInstance, StepsForm } from "@ant-design/pro-form";
import { Modal, notification } from "antd";
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
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button/index.js";
import ArrowRight from "assets/government/icons/arrow-right.svg";
import SaveIcon from "assets/government/icons/save.svg";
import LeftIcon from "assets/government/icons/left-icon.svg";
import laboratory from "service/laboratory_tests/index.js";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

type CaregiverType = {
  cancelStepModal?: () => void;
  isStepModal?: boolean;
  refreshList?: () => void;
};

export const CareGiverCreate: React.FC<CaregiverType> = ({
  cancelStepModal,
  isStepModal,
  refreshList,
}) => {
  const [info, setInfo] = useState<any>({});
  const [documents, setDocuments] = useState<any>({});
  const [isSave, setSave] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
      setSave(false);
      cancelStepModal?.();
      setSubmitting(false);
    },
    onError() {
      notification.error({
        message: "Алдаа гарлаа",
      });
      setSubmitting(false);
      setSave(false);
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
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  useEffect(() => {
    labTests?.run();
  }, []);
  const formRef = useRef<ProFormInstance>();
  return (
    <div>
      <StepsForm
        formRef={formRef}
        onFinish={async (val) => {
          const profile = await uploadProfile.runAsync({
            file: val?.profile?.[0]?.originFileObj,
          });
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
          // health yvahguu bgaa uchraas laboratory_tests bolgovol boloh yostoi
          const sortedLabTests = labTests?.data?.sort((a, b) => a.id - b.id);
          const health = labFormat(
            healthData,
            val?.laboratory_tests,
            sortedLabTests
          );
          const elderlyData = await elderly.runAsync({
            ...val,
            profile_id: profile[0]?.id,
            address: {
              ...val?.address,
            },
            laboratory_tests: health,
            documents: docs,
            request: request,
            birth_date: moment(val?.birth_date).toDate(),
          });
          sendRequest && toDistrict.run(elderlyData?.id);
          setTimeout(() => {
            refreshList?.();
          }, 500);
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
                  {step !== 0 && (
                    <DefaultButton
                      loading={submitting}
                      onClick={() => {
                        onSubmit && onSubmit();
                        setSubmitting(true);
                        setSave(true);
                      }}
                      icon={<img src={SaveIcon} />}
                      title="Түр хадгалах"
                    />
                  )}
                  {step === 3 ? (
                    <CustomButton
                      loading={submitting}
                      onClick={() => {
                        onSubmit && onSubmit();
                        setSubmitting(true);
                        setSendRequest(true);
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
                  <div className="font-semibold">Үйлчлүүлэгч нэмэх</div>
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
            setInfo(val);
            return true;
          }}
        >
          <CaregiverInfoForm form={formRef.current} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="documents"
          title={
            <div className="text-[#344054] font-semibold mt-1">
              Бүрдүүлэх бичиг баримт
            </div>
          }
          onFinish={async (values: any) => {
            if (isSave) {
              const profile = await uploadProfile.runAsync({
                file: info?.profile?.[0]?.originFileObj,
              });
              const data = await filesDoc.runAsync({
                files: Object.values(values.documents || {}),
              });
              const docs = arrToObj(data, values?.documents);
              elderly.runAsync({
                ...info,
                ...values,
                profile_id: profile[0]?.id,
                address: {
                  ...info?.address,
                },
                documents: docs,
                birth_date: moment(info?.birth_date).toDate(),
              });
            } else {
              setDocuments(values);
            }
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
            if (isSave) {
              const profile = await uploadProfile.runAsync({
                file: info?.profile?.[0]?.originFileObj,
              });
              const data = await filesDoc.runAsync({
                files: Object.values(documents.documents || {}),
              });
              const healthData = await filesHealth.runAsync({
                files: Object.values(values.laboratory_tests || {}),
              });
              const health = labFormat(
                healthData,
                values?.laboratory_tests,
                labTests?.data
              );
              const docs = arrToObj(data, documents?.documents);
              elderly.runAsync({
                ...info,
                ...values,
                profile_id: profile[0]?.id,
                address: {
                  ...info?.address,
                },
                laboratory_tests: health,
                documents: docs,
                birth_date: moment(info?.birth_date).toDate(),
              });
            }

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
