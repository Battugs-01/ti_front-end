import { StepsForm } from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Modal, message, notification } from "antd";
import ArrowRight from "assets/government/icons/arrow-right.svg";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import LeftIcon from "assets/government/icons/left-icon.svg";
import SaveIcon from "assets/government/icons/save.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
import moment from "moment";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button/index.js";
import { labFormatUpdate } from "pages/socialWorker/customer/util/arrToObj.js";
import { useEffect, useState } from "react";
import file from "service/file/index.js";
import laboratory from "service/laboratory_tests/index.js";
import orphanElderly from "service/social-worker/customer/index.js";
import { ElderlyInterface } from "service/social-worker/customer/type.js";
import { CaregiverInfoForm } from "./caregiver-info-formation/index.js";
import { HealthForm } from "./health-condition/index.js";
import { RegistrationForm } from "./registration-document/index.js";
import { SendForm } from "./request-send/index.js";

type CaregiverType = {
  cancelStepModal?: () => void;
  data?: ElderlyInterface;
  id: number;
};

export const CareGiverUpdate: React.FC<CaregiverType> = ({
  cancelStepModal,
  data,
  id,
}) => {
  const [sendRequest, setSendRequest] = useState(false);

  // const elderly = useRequest(async () => orphanElderly.getElderly(id));
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
  const toDistrict = useRequest(orphanElderly.sendToDistrict, {
    manual: true,
    onSuccess() {
      notification.success({
        message: "Амжилттай хүсэлт илгээгдлээ.",
      });
      setSendRequest(false);
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
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  const uploadMulti = useRequest(file.uploadsMulti, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const newFileUploads = async (files: any[]) => {
    const oldFileIDs: number[] = [];
    console.log(files, "this is files");
    files.map((file) => {
      if (!file?.uid.includes("rc-upload")) {
        oldFileIDs.push(parseInt(file.uid));
      }
    });

    const ids = await uploadMulti
      .runAsync({
        names: files?.reduce<string[]>((acc, record) => {
          if (record?.uid) {
            if (record?.uid?.includes("rc-upload")) {
              acc.push(record.fileName || "");
              return acc;
            }
          }
          return acc;
        }, []),
        files: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record);
            return acc;
          }
          return acc;
        }, []),
      })
      .then((el: any) => el.map((el: any) => el.id));

    return oldFileIDs.concat(ids);
  };
  const labFileUploads = async (files: any[]) => {
    const oldFileIDs: number[] = [];
    console.log(files, "this is files");
    files.map((file) => {
      if (!file?.uid.includes("rc-upload")) {
        oldFileIDs.push(parseInt(file.uid));
      }
    });

    const ids = await uploadMulti
      .runAsync({
        names: files?.reduce<string[]>((acc, record) => {
          if (record?.uid) {
            if (record?.uid?.includes("rc-upload")) {
              acc.push(record.fileName || "");
              return acc;
            }
          }
          return acc;
        }, []),
        files: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record);
            return acc;
          }
          return acc;
        }, []),
      })
      .then((el: any) => el.map((el: any) => el.id));

    return oldFileIDs.concat(ids);
  };
  useEffect(() => {
    labTests?.run();
  }, []);
  return (
    <div>
      <StepsForm
        // initialValues={{
        //   name: data.anem
        //   upload: adkjaskld
        // }}
        onFinish={async (val) => {
          const reqData: any = {};
          console.log(val, "this is value");
          const profile = await uploadProfile.runAsync({
            file: val?.profile?.[0]?.originFileObj,
          });
          val.documents.elderly_document_care_requet = await newFileUploads(
            val?.documents?.elderly_document_care_requet
          );
          val.documents.elderly_document_insurance_notebook =
            await newFileUploads(
              val?.documents?.elderly_document_insurance_notebook
            );
          val.documents.elderly_document_is_pension_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_is_pension_inquiry
            );
          val.documents["elderly_document_pension_loan;"] =
            await newFileUploads(
              val?.documents["elderly_document_pension_loan;"]
            );
          val.documents.elderly_document_is_disability_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_is_disability_inquiry
            );
          val.documents.elderly_document_other_welfare_services_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_other_welfare_services_inquiry
            );
          val.documents.elderly_document_insurance_discounts_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_insurance_discounts_inquiry
            );
          val.documents.elderly_document_care_center_discount_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_care_center_discount_inquiry
            );

          val.documents.elderly_document_identity_card = await newFileUploads(
            val?.documents?.elderly_document_identity_card
          );
          val.documents.elderly_document_property_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_property_inquiry
            );
          val.documents.elderly_document_is_have_children_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_is_have_children_inquiry
            );
          val.documents.elderly_document_is_have_sibling_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_is_have_sibling_inquiry
            );
          val.documents.elderly_document_is_married_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_is_married_inquiry
            );
          val.documents.elderly_document_is_divorce_inquiry =
            await newFileUploads(
              val?.documents?.elderly_document_is_divorce_inquiry
            );

          val.request.situational_file_ids = await newFileUploads(
            val?.request?.situational_file_ids
          );
          val.request.definition_governor_file_ids = await newFileUploads(
            val?.request?.definition_governor_file_ids
          );
          console.log(val?.documents, "this is val documents");

          val.laboratory_tests.health_check_sheet = await newFileUploads(
            val?.laboratory_tests?.health_check_sheet
          );
          val.laboratory_tests.blood_test = await newFileUploads(
            val?.laboratory_tests?.blood_test
          );
          val.laboratory_tests.analysis_urine = await newFileUploads(
            val?.laboratory_tests?.analysis_urine
          );
          val.laboratory_tests.biochemical = await newFileUploads(
            val?.laboratory_tests?.biochemical
          );
          val.laboratory_tests.sputum = await newFileUploads(
            val?.laboratory_tests?.sputum
          );
          val.laboratory_tests.syphilis = await newFileUploads(
            val?.laboratory_tests?.syphilis
          );
          val.laboratory_tests.abdominal = await newFileUploads(
            val?.laboratory_tests?.abdominal
          );
          val.laboratory_tests.heart_recording = await newFileUploads(
            val?.laboratory_tests?.heart_recording
          );
          val.laboratory_tests.lungs = await newFileUploads(
            val?.laboratory_tests?.lungs
          );
          val.laboratory_tests.mental_health = await newFileUploads(
            val?.laboratory_tests?.mental_health
          );
          console.log(val?.laboratory_tests, "this is lab tests");
          console.log(
            Object.values(val?.laboratory_tests),
            "this is lab tests object"
          );
          console.log(
            Object.keys(val?.laboratory_tests),
            "this is lab tests keys"
          );
          console.log(labTests?.data, "this is lab tests data");
          const healthData = labFormatUpdate(
            val?.laboratory_tests,
            labTests?.data
          );
          // const uploadedRequest = uploadedFiles(
          //   Object.values(val?.request || {})
          // );
          // const uploadedDocument = uploadedFiles(
          //   Object.values(val?.documents || {})
          // );
          // const uploadedLab = uploadedFiles(
          //   Object.values(val?.laboratory_tests || {})
          // );
          // const data = await filesDoc.runAsync({
          //   files: Object.values(document || {}),
          // });
          // const healthData = await filesHealth.runAsync({
          //   files: Object.values(lab || {}),
          // });
          // const requestData = await filesRequest.runAsync({
          //   files: Object.values(requestFile || {}),
          // });
          // // const arrData = [];
          // // const arrHealth = [];
          // // const arrRequest = [];
          // console.log(data, "data");
          // console.log(healthData, "health data");
          // console.log(requestData, "request data");
          // const docs = arrToObj(
          //   uploadedDocument.push(arrData.push(data)),
          //   val?.documents
          // );
          // const request = arrToObj(
          //   uploadedRequest.push(arrRequest.push(requestData)),
          //   val?.request
          // );
          // const health = labFormat(
          //   uploadedLab.push(arrHealth.push(healthData)),
          //   val?.laboratory_tests,
          //   labTests?.data
          // );
          // console.log(docs, "docs");
          // console.log(request, "request");
          // console.log(health, "health");
          const elderlyData = await elderlyEdit.runAsync(
            {
              ...val,
              // profile_id: profile[0]?.id,
              profile_id: 637,
              address: {
                ...val?.address,
              },
              laboratory_tests: healthData,
              documents: val?.documents,
              request: val?.request,
              birth_date: moment(val?.birth_date)?.toDate(),
            },
            id
          );
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
                        setSendRequest(true);
                      }}
                      extraIcon={<img src={ArrowRight} />}
                      title="Дахин хүсэлт илгээх"
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
              open={!!data}
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          initialValues={{
            family_name: data?.family_name,
          }}
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
          {!data ? (
            <PageLoading />
          ) : (
            <CaregiverInfoForm data={data as ElderlyInterface} />
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
          {!data ? (
            <PageLoading />
          ) : (
            <RegistrationForm data={data?.documents} />
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
          <HealthForm data={data?.laboratory_tests || []} />
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
          <SendForm data={data} />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};
