import { ProFormInstance, StepsForm } from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Modal, notification } from "antd";
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
import { useEffect, useRef, useState } from "react";
import file from "service/file/index.js";
import laboratory from "service/laboratory_tests/index.js";
import orphanElderly from "service/social-worker/customer/index.js";
import {
  ElderlyInterface,
  ElderlyStatus,
} from "service/social-worker/customer/type.js";
import { CaregiverInfoForm } from "./caregiver-info-formation/index.js";
import { HealthForm } from "./health-condition/index.js";
import { RegistrationForm } from "./registration-document/index.js";
import { SendForm } from "./request-send/index.js";
import CareGiverBadge from "components/badge/caregiver.js";
import dayjs from "dayjs";
import { ConsoleSqlOutlined } from "@ant-design/icons";

type CaregiverType = {
  cancelStepModal?: () => void;
  data?: ElderlyInterface;
  id: number;
  refreshList?: () => void;
  status?: Number;
};

export const CareGiverUpdate: React.FC<CaregiverType> = ({
  cancelStepModal,
  data,
  id,
  status,
  refreshList,
}) => {
  const [sendRequest, setSendRequest] = useState(false);
  const [isSave, setSave] = useState(false);
  const [info, setInfo] = useState<any>({});
  const [documents, setDocuments] = useState<any>({});

  const elderlyEdit = useRequest(orphanElderly.elderlyEdit, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      cancelStepModal?.();
      isSave && refreshList?.();
    },
    onError: (err) => {
      notification.error({ message: err.message });
    },
  });

  const labTests = useRequest(laboratory.get, {
    manual: true,
  });

  const toDistrict = useRequest(orphanElderly.sendToDistrict, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хүсэлт илгээгдлээ.",
      });
      setSendRequest(false);
      refreshList?.();
    },
    onError: (err) => {
      // setLoading(false);
      notification.error({ message: err.message });
      // setSendRequest(false);
      // refreshList?.();
    },
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
    if (!files) return [];
    files.map((file) => {
      if (!file?.uid?.includes("rc-upload")) {
        oldFileIDs.push(parseInt(file.uid));
      }
    });

    const newFiles = files.filter((file) => file?.uid?.includes("rc-upload"));

    if (newFiles.length === 0) return oldFileIDs;

    const ids = await uploadMulti
      .runAsync({
        names: newFiles?.map((file) => file.fileName),
        files: newFiles,
      })
      .then((el: any) => el.map((el: any) => el.id));

    return oldFileIDs.concat(ids);
  };

  useEffect(() => {
    labTests?.run();
  }, []);

  const formRef = useRef<ProFormInstance>();
  const handleFinish = async (val: any) => {
    console.log("val", val);
    val.profile = await newFileUploads(val?.profile);
    val.documents.elderly_document_care_requet = await newFileUploads(
      val?.documents?.elderly_document_care_requet
    );
    val.documents.elderly_document_insurance_notebook = await newFileUploads(
      val?.documents?.elderly_document_insurance_notebook
    );
    val.documents.elderly_document_is_pension_inquiry = await newFileUploads(
      val?.documents?.elderly_document_is_pension_inquiry
    );
    val.documents["elderly_document_pension_loan;"] = await newFileUploads(
      val?.documents["elderly_document_pension_loan;"]
    );
    val.documents.elderly_document_is_disability_inquiry = await newFileUploads(
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
    val.documents.elderly_document_property_inquiry = await newFileUploads(
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
    val.documents.elderly_document_is_married_inquiry = await newFileUploads(
      val?.documents?.elderly_document_is_married_inquiry
    );
    val.documents.elderly_document_is_divorce_inquiry = await newFileUploads(
      val?.documents?.elderly_document_is_divorce_inquiry
    );

    val.request.situational_file_ids = await newFileUploads(
      val?.request?.situational_file_ids
    );
    val.request.definition_governor_file_ids = await newFileUploads(
      val?.request?.definition_governor_file_ids
    );

    if (val.laboratory_tests) {
      val.laboratory_tests.health_check_sheet = await newFileUploads(
        val?.laboratory_tests?.health_check_sheet || []
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
    }

    const healthData = labFormatUpdate(val?.laboratory_tests, labTests?.data);

    const elderlyData = await elderlyEdit.runAsync(
      {
        ...val,
        // profile_id: profile[0]?.id,
        profile_id: val?.profile[0],
        address: {
          ...val?.address,
        },
        laboratory_tests: healthData,
        documents: val?.documents,
        request: val?.request,
        birth_date: dayjs(val?.birth_date).toDate(),
      },
      id
    );
    sendRequest && toDistrict.run(elderlyData?.id);
    setTimeout(() => {
      refreshList?.();
    }, 500);
  };
  const documentsFinish = async (val: any) => {
    if (isSave) {
      info.profile = await newFileUploads(info?.profile);
      val.documents.elderly_document_care_requet = await newFileUploads(
        val?.documents?.elderly_document_care_requet
      );
      val.documents.elderly_document_insurance_notebook = await newFileUploads(
        val?.documents?.elderly_document_insurance_notebook
      );
      val.documents.elderly_document_is_pension_inquiry = await newFileUploads(
        val?.documents?.elderly_document_is_pension_inquiry
      );
      val.documents["elderly_document_pension_loan;"] = await newFileUploads(
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
      val.documents.elderly_document_property_inquiry = await newFileUploads(
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
      val.documents.elderly_document_is_married_inquiry = await newFileUploads(
        val?.documents?.elderly_document_is_married_inquiry
      );
      val.documents.elderly_document_is_divorce_inquiry = await newFileUploads(
        val?.documents?.elderly_document_is_divorce_inquiry
      );
      await elderlyEdit.runAsync(
        {
          ...val,
          ...info,
          // profile_id: profile[0]?.id,
          profile_id: info?.profile[0],
          address: {
            ...info?.address,
          },
          documents: val?.documents,
          birth_date: moment(info?.birth_date)?.toDate(),
        },
        id
      );
    } else {
      setDocuments(val);
    }
    return true;
  };
  const healthFinish = async (val: any) => {
    return true;
    // if (isSave) {
    //   info.profile = await newFileUploads(info?.profile);
    //   documents.documents.elderly_document_care_requet = await newFileUploads(
    //     documents?.documents?.elderly_document_care_requet
    //   );
    //   documents.documents.elderly_document_insurance_notebook =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_insurance_notebook
    //     );
    //   documents.documents.elderly_document_is_pension_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_is_pension_inquiry
    //     );
    //   documents.documents["elderly_document_pension_loan;"] =
    //     await newFileUploads(
    //       documents?.documents["elderly_document_pension_loan;"]
    //     );
    //   documents.documents.elderly_document_is_disability_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_is_disability_inquiry
    //     );
    //   documents.documents.elderly_document_other_welfare_services_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_other_welfare_services_inquiry
    //     );
    //   documents.documents.elderly_document_insurance_discounts_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_insurance_discounts_inquiry
    //     );
    //   documents.documents.elderly_document_care_center_discount_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_care_center_discount_inquiry
    //     );

    //   documents.documents.elderly_document_identity_card = await newFileUploads(
    //     documents?.documents?.elderly_document_identity_card
    //   );
    //   documents.documents.elderly_document_property_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_property_inquiry
    //     );
    //   documents.documents.elderly_document_is_have_children_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_is_have_children_inquiry
    //     );
    //   documents.documents.elderly_document_is_have_sibling_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_is_have_sibling_inquiry
    //     );
    //   documents.documents.elderly_document_is_married_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_is_married_inquiry
    //     );
    //   documents.documents.elderly_document_is_divorce_inquiry =
    //     await newFileUploads(
    //       documents?.documents?.elderly_document_is_divorce_inquiry
    //     );
    //   val.laboratory_tests.health_check_sheet = await newFileUploads(
    //     val?.laboratory_tests?.health_check_sheet
    //   );
    //   val.laboratory_tests.blood_test = await newFileUploads(
    //     val?.laboratory_tests?.blood_test
    //   );
    //   val.laboratory_tests.analysis_urine = await newFileUploads(
    //     val?.laboratory_tests?.analysis_urine
    //   );
    //   val.laboratory_tests.biochemical = await newFileUploads(
    //     val?.laboratory_tests?.biochemical
    //   );
    //   val.laboratory_tests.sputum = await newFileUploads(
    //     val?.laboratory_tests?.sputum
    //   );
    //   val.laboratory_tests.syphilis = await newFileUploads(
    //     val?.laboratory_tests?.syphilis
    //   );
    //   val.laboratory_tests.abdominal = await newFileUploads(
    //     val?.laboratory_tests?.abdominal
    //   );
    //   val.laboratory_tests.heart_recording = await newFileUploads(
    //     val?.laboratory_tests?.heart_recording
    //   );
    //   val.laboratory_tests.lungs = await newFileUploads(
    //     val?.laboratory_tests?.lungs
    //   );
    //   val.laboratory_tests.mental_health = await newFileUploads(
    //     val?.laboratory_tests?.mental_health
    //   );
    //   const healthData = labFormatUpdate(val?.laboratory_tests, labTests?.data);
    //   await elderlyEdit.runAsync(
    //     {
    //       ...val,
    //       ...info,
    //       // profile_id: profile[0]?.id,
    //       profile_id: info?.profile[0],
    //       address: {
    //         ...info?.address,
    //       },
    //       documents: documents?.documents,
    //       laboratory_tests: healthData,

    //       // lab test oruulj ireh
    //       birth_date: moment(info?.birth_date)?.toDate(),
    //     },
    //     id
    //   );
    // }
    // return true;
  };
  return (
    <div>
      {uploadMulti?.loading || toDistrict.loading ? (
        <PageLoading />
      ) : (
        <StepsForm
          formRef={formRef}
          onFinish={handleFinish}
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
                    {/* {step !== 0 && (
                    <DefaultButton
                      onClick={() => {
                        onSubmit && onSubmit();
                        setLoading(true);
                        setSave(true);
                      }}
                      loading={loading}
                      icon={<img src={SaveIcon} />}
                      title="Түр хадгалах"
                    />
                  )} */}
                    {step === 3 ? (
                      <CustomButton
                        onClick={() => {
                          onSubmit && onSubmit();
                          setSendRequest(true);
                        }}
                        loading={elderlyEdit.loading && toDistrict.loading}
                        extraIcon={<img src={ArrowRight} />}
                        title={
                          status === ElderlyStatus.ReturnSum
                            ? "Дахин хүсэлт илгээх"
                            : "Хүсэлт илгээх"
                        }
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
                    <div className="font-semibold flex items-center gap-3">
                      <div>Үйлчлүүлэгч засах ({data?.rd})</div>
                      <CareGiverBadge status={status} />
                    </div>
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
                open={!!data}
                maskClosable={false}
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
            // title={
            //   <div className="text-[#344054] font-semibold mt-1">
            //     Үйлчлүүлэгчийн хувийн мэдээлэл
            //   </div>
            // }
            title="Үйлчлүүлэгчийн хувийн мэдээлэл"
            onFinish={async (val) => {
              setInfo(val);
              return true;
            }}
          >
            {!data ? (
              <PageLoading />
            ) : (
              <CaregiverInfoForm
                data={data as ElderlyInterface}
                form={formRef.current}
              />
            )}
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="documents"
            // title={
            //   <div className="text-[#344054] font-semibold mt-1">
            //     Бүрдүүлэх бичиг баримт
            //   </div>
            // }
            title="Бүрдүүлэх бичиг баримт"
            onFinish={documentsFinish}
          >
            {!data ? (
              <PageLoading />
            ) : (
              <RegistrationForm data={data?.documents} />
            )}
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="health"
            title="Эрүүл мэндийн байдал"
            onFinish={healthFinish}
          >
            <HealthForm data={data as ElderlyInterface} />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="request"
            title="Хүсэлт илгээх"
            onFinish={async (values) => {
              return true;
            }}
          >
            <SendForm data={data} />
          </StepsForm.StepForm>
        </StepsForm>
      )}
    </div>
  );
};
