import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { ITable } from "components/table";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import file from "service/file";
import {
  DefinitionGovernor,
  Documents,
} from "service/social-worker/customer/type";
import { formatKB, formatMB } from "utils/index";

type DocumentsType = {
  situationalData?: DefinitionGovernor[];
  governorData?: DefinitionGovernor[];
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
  isHave: any;
}

export const Contract: React.FC<DocumentsType> = ({
  situationalData,
  governorData,
}) => {
  const [isFileOpen, setFileOpen] = useState<any | undefined>(undefined);

  const documentList = [
    {
      name: "Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас",
      size: situationalData?.[0]?.file_size,
      path: situationalData?.[0]?.physical_path,
      isHave: situationalData?.length ?? 0 > 0,
    },
    {
      name: "Сум, хорооны Засаг даргын тодорхойлолт",
      size: governorData?.[0]?.file_size,
      path: governorData?.[0]?.physical_path,
      isHave: governorData?.length ?? 0 > 0,
    },
  ];

  return (
    <>
      <div className="mt-5">
        <ITable<DocumentList>
          scroll={false}
          dataSource={documentList ?? []}
          total={documentList.length}
          actionWidth={10}
          hidePagination
          columns={[
            {
              dataIndex: ["name"],
              title: "Нэр",
              align: "left",
              render: (value, record) => (
                <div className="flex flex-col justify-center">
                  <span
                    className={`text-base font-bold flex text-center ${
                      record.isHave ? "text-[#344054]" : "text-[#DD695C]"
                    }`}
                  >
                    {value || "-"}
                  </span>
                  <span className="font-normal text-sm text-gray-600">
                    Хэмжээ :{" "}
                    <span className="font-bold">
                      {formatKB(record?.size || 0, 1)}
                    </span>
                  </span>
                </div>
              ),
            },
            {
              dataIndex: ["isHave"],
              title: "Байгаа эсэх",
              align: "start",
              render: (value) => (
                <div className="flex flex-col justify-center">
                  <span className="text-base text-[#344054] font-bold flex text-center">
                    {value ? (
                      <FaCheck size={14} color="green" className="ml-1" />
                    ) : (
                      <IoAddCircleOutline size={20} color="gray" />
                    )}
                  </span>
                </div>
              ),
            },
          ]}
          customActions={(record) => {
            return (
              <div className="flex gap-2 items-center">
                <div className="p-4 cursor-pointer">
                  <AiOutlineEye
                    size={20}
                    className={" text-gray-700"}
                    onClick={() => setFileOpen(record)}
                  />
                </div>
                <Link
                  to={file.fileToUrl(record?.path as string)}
                  className="p-4 cursor-pointer  text-gray-700"
                  target="blank"
                  download
                >
                  <CloudDownloadOutlined
                    style={{
                      fontSize: 20,
                    }}
                    rev={undefined}
                  />
                </Link>
              </div>
            );
          }}
        />
        {isFileOpen && (
          <Modal
            title={
              <div className="p-6">
                <div className="font-semibold">{isFileOpen?.name}</div>
              </div>
            }
            open={isFileOpen}
            width={1144}
            onCancel={() => setFileOpen(undefined)}
            footer={
              <div
                className="flex items-center gap-2 p-6 justify-end"
                style={{ borderTop: "1px solid #D0D5DD" }}
              >
                <Button
                  icon={
                    <FaArrowLeft
                      accentHeight={11.67}
                      color="#344054"
                      size={12}
                      className="mx-2"
                    />
                  }
                  title="Буцах"
                  onClick={() => setFileOpen(undefined)}
                />
                <Button
                  icon={
                    <CloudDownloadOutlined
                      style={{
                        fontSize: 20,
                      }}
                      rev={undefined}
                    />
                  }
                  title="Татах"
                />
              </div>
            }
          >
            <div className="bg-[#F0F2F5] pt-5">
              <iframe
                style={{ border: "none" }}
                src={file.fileToUrl(isFileOpen?.path)}
                width={1050}
                height={850}
                className="mx-12"
              ></iframe>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
