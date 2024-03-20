import { StepsForm } from "@ant-design/pro-form";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button/index.js";
import ArrowRight from "assets/government/icons/arrow-right.svg";
import SaveIcon from "assets/government/icons/save.svg";
import LeftIcon from "assets/government/icons/left-icon.svg";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
import { Modal } from "antd";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { UnderReview } from "./under_review";
import { Distribute } from "./distribute";

type FormModalProps = {
  visibleDetail?: boolean;
  cancelDetail?: () => void;
  id?: number;
};

export const FormModal: React.FC<FormModalProps> = ({
  visibleDetail,
  cancelDetail,
  id,
}) => {
  // ? TODO
  const elderlyDetail = useRequest(() => orphanElderly.getElderly(id));
  return (
    <div>
      <StepsForm
        onFinish={async (values) => {
          console.log("this is finish function", values);
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
              <div className="flex gap-2 items-center justify-end">
                {step === 2 ? (
                  <>
                    <DefaultButton
                      icon={<img src={LeftIcon} />}
                      title={"Буцах"}
                      onClick={() => {
                        onPre();
                      }}
                    />
                    <CustomButton
                      onClick={() => {
                        onSubmit && onSubmit();
                      }}
                      extraIcon={<img src={ArrowRight} />}
                      title="Хуваарилах"
                    />
                  </>
                ) : (
                  <>
                    <DefaultButton
                      icon={<img src={SaveIcon} />}
                      title="Нийгмийн ажилтанруу буцаах"
                    />
                    <DefaultButton
                      icon={<img src={SaveIcon} />}
                      title="Хүлээлэгт оруулах"
                    />
                    <CustomButton
                      onClick={() => {
                        onSubmit && onSubmit();
                      }}
                      extraIcon={<img src={ArrowRight} />}
                      title="Хуваарилах"
                    />
                  </>
                )}
              </div>
            );
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              width={1330}
              open={visibleDetail}
              onCancel={cancelDetail}
              title={
                <div className="p-6">
                  <div className="font-semibold">
                    Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл (РЕ96124578)
                  </div>
                </div>
              }
              footer={
                <div className="p-6" style={{ borderTop: "1px solid #D0D5DD" }}>
                  {submitter}
                </div>
              }
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="registered"
          title={
            <div className="text-[#344054] font-semibold mt-2 ml-8">
              Бүртгэсэн
            </div>
          }
          onFinish={async (values: any) => {
            return true;
          }}
        >
          Бүртгэсэн
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="under_review"
          title={
            <div className="text-[#344054] font-semibold mt-2 ml-5">
              Хянаж байгаа
            </div>
          }
          onFinish={async (values: any) => {
            return true;
          }}
        >
          <UnderReview data={elderlyDetail?.data} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="distribute"
          title={
            <div className="text-[#344054] font-semibold mt-2 ml-6">
              Хуваарилах
            </div>
          }
          onFinish={async (values: any) => {
            return true;
          }}
        >
          <Distribute />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};