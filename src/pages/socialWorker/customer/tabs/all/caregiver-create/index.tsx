import { ProFormInstance, StepsForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Modal, Spin, notification } from "antd";
import ArrowRight from "assets/government/icons/arrow-right.svg";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import LeftIcon from "assets/government/icons/left-icon.svg";
import SaveIcon from "assets/government/icons/save.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
import dayjs from "dayjs";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button/index.js";
import {
  arrToObj,
  labFormat,
} from "pages/socialWorker/customer/util/arrToObj.js";
import { useEffect, useRef, useState } from "react";
import file from "service/file/index.js";
import laboratory from "service/laboratory_tests/index.js";
import orphanElderly from "service/social-worker/customer/index.js";
import { CaregiverInfoForm } from "./caregiver-info-form.tsx";
import { HealthForm } from "./health-condition/index.js";
import { RegistrationForm } from "./registration-document/index.js";
import { SendForm } from "./request-send/index.js";

type CaregiverType = {
  cancelStepModal?: () => void;
  isStepModal?: boolean;
  registerNumber?: any;
  refreshList?: () => void;
};

export const CareGiverCreate: React.FC<CaregiverType> = ({
  cancelStepModal,
  isStepModal,
  registerNumber,
  refreshList,
}) => {
  const [info, setInfo] = useState<any>({});
  const [isSave, setSave] = useState(false);
  const [isValidDoc, setValidDoc] = useState(false);
  const [isValidTest, setValidLabTest] = useState(false);
  console.log(isValidDoc, "sda2");
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
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      setSave(false);
      cancelStepModal?.();
    },
    onError: (err) => {
      notification.error({
        message: err?.message,
      });
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

  console.log(
    formRef.current?.getFieldValue(["request", "definition_governor_file_ids"]),
    "vall"
  );

  // const isFormValid =
  //   formRef.current?.getFieldValue(["request", "situational_file_ids"]) &&
  //   formRef.current?.getFieldValue(["request", "definition_governor_file_ids"]);

  console.log(
    formRef.current?.getFieldValue("documents"),
    "formRef.current?.getFieldsValue()"
  );
  return (
    <div>
      {elderly.loading ||
      uploadProfile.loading ||
      filesRequest.loading ||
      filesDoc.loading ||
      filesHealth.loading ? (
        <Spin className="flex justify-center items-center" />
      ) : (
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

            const health: any = labFormat(
              healthData,
              val?.laboratory_tests,
              labTests?.data
            );

            const elderlyData = await elderly.runAsync({
              ...val,
              profile_id: profile[0]?.id,
              address: {
                ...val?.address,
              },
              laboratory_tests: health ? health.slice(1) : [],
              documents: docs || {},
              request: request,
              birth_date: dayjs(val?.birth_date).toDate(),
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
            render: ({ step, onSubmit, onPre, form }) => {
              const isValidDocument =
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_is_pension_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_pension_loan;",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_is_disability_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_other_welfare_services_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_insurance_discounts_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_care_center_discount_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_insurance_notebook",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_care_requet",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_identity_card",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_property_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_is_have_children_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_is_have_sibling_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_is_married_inquiry",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "documents",
                  "elderly_document_is_divorce_inquiry",
                ])?.length > 0;

              const isValidlabTest =
                formRef.current?.getFieldValue(["laboratory_tests", 1])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 2])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 3])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 4])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 5])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 6])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 7])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 8])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 9])
                  ?.length > 0 &&
                formRef.current?.getFieldValue(["laboratory_tests", 10])
                  ?.length > 0;

              const isValidRequest =
                formRef.current?.getFieldValue([
                  "request",
                  "situational_file_ids",
                ])?.length > 0 &&
                formRef.current?.getFieldValue([
                  "request",
                  "definition_governor_file_ids",
                ])?.length > 0;

              console.log(form?.getFieldValue([]), "sda");

              // const DocumentsNumber = Object?.keys(
              //   form?.getFieldValue("documents")
              // )?.length; // 14
              // console.log(DocumentsNumber, "sda2");
              return (
                <div className="flex justify-between items-center w-full flex-wrap xl:flex-nowrap">
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
                    {step === 3 && (
                      <DefaultButton
                        loading={elderly.loading}
                        onClick={() => {
                          onSubmit && onSubmit();
                          setSave(true);
                        }}
                        icon={<img src={SaveIcon} />}
                        title="Түр хадгалах"
                      />
                    )}
                    {step === 3 ? (
                      <CustomButton
                        loading={elderly.loading}
                        onClick={() => {
                          onSubmit && onSubmit();
                          setSendRequest(true);
                        }}
                        disabled={
                          isValidTest === false && isValidDoc === false
                          // isValidRequest === false
                        }
                        extraIcon={<img src={ArrowRight} />}
                        title="Хүсэлт илгээх"
                      />
                    ) : (
                      <CustomButton
                        onClick={() => {
                          onSubmit && onSubmit();
                          setValidDoc(isValidDocument);
                          setValidLabTest(isValidlabTest);
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
                maskClosable={false}
                width={1064}
                title={
                  <div className="p-6">
                    <div className="font-semibold">Үйлчлүүлэгч нэмэх</div>
                  </div>
                }
                footer={
                  <div
                    className="p-6"
                    style={{ borderTop: "1px solid #D0D5DD" }}
                  >
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
            title="Үйлчлүүлэгчийн хувийн мэдээлэл"
            onFinish={async (val) => {
              setInfo(val);
              return true;
            }}
          >
            <CaregiverInfoForm
              form={formRef.current}
              registerNumber={registerNumber}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="documents"
            title="Бүрдүүлэх бичиг баримт"
            onFinish={async (values: any) => {
              return true;
            }}
          >
            <RegistrationForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="health"
            title="Эрүүл мэндийн байдал"
            onFinish={async (values: any) => {
              return true;
            }}
            initialValues={{
              is_disability: false,
            }}
          >
            <HealthForm />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="request"
            title="Хүсэлт илгээх"
            onFinish={async (values) => {
              return true;
            }}
          >
            <SendForm />
          </StepsForm.StepForm>
        </StepsForm>
      )}
    </div>
  );
};
