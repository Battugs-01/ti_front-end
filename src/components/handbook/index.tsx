import { Button, Drawer, Radio, Tooltip } from "antd";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { useIntl } from "react-intl";

export const Handbooks = () => {
  const data = [
    {
      role: "admin",
      url: "/handbooks/Admin.pdf",
      name: "Нүүр хуудас",
    },
    {
      role: "case_manager",
      url: "/handbooks/Case_manager.pdf",
      name: "Байгууллагын мэдээлэл",
    },
    {
      role: "doctor",
      url: "/handbooks/Doctor.pdf",
      name: "Тайлан мэдээ",
    },
    {
      role: "operation_manager",
      url: "/handbooks/Operation_manager.pdf",
      name: "Магадлан итгэмжлэл",
    },
    {
      role: "senior_case_manager",
      url: "/handbooks/Senior_Casemanager.pdf",
      name: "Санхүү",
    },
    {
      role: "stack_holder",
      url: "/handbooks/Stakeholder.pdf",
      name: "Ажилчдын жагсаалт",
    },
    {
      role: "super_admin",
      url: "/handbooks/Super_Admin.pdf",
      name: "Ажилчдын жагсаалт",
    },
  ];

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user] = useContext(AuthContext);
  const intl = useIntl();
  const found = data.find((el) => user?.user?.role === el.role);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 content-center">
        <Tooltip
          title={
            <p className="text-xs">{intl.formatMessage({ id: "hand_book" })}</p>
          }
          placement="leftBottom"
        >
          <Button
            icon={<MdEditDocument size={25} color="#fff" />}
            color="#144E5A"
            className="bg-[#144E5A] rounded-none rounded-l-lg z-20"
            size="large"
            onClick={showDrawer}
          />
        </Tooltip>
      </div>
      {found?.role !== UserRoleType.case_manager ? (
        <Drawer
          title={intl.formatMessage({ id: "hand_book" })}
          onClose={onClose}
          open={open}
          width={850}
        >
          {found?.url && (
            <iframe src={found?.url} className="w-full h-full"></iframe>
          )}
        </Drawer>
      ) : (
        <Drawer
          title={intl.formatMessage({ id: "hand_book" })}
          onClose={onClose}
          open={open}
          width={850}
        >
          <Radio.Group
            optionType="button"
            value={isMobile}
            onChange={(e) => {
              setIsMobile(e.target.value);
            }}
            size="large"
            className="mb-4"
          >
            <Radio.Button value={false}>
              {intl.formatMessage({ id: "web_case" })}
            </Radio.Button>
            <Radio.Button value={true}>
              {intl.formatMessage({ id: "mobile_case" })}
            </Radio.Button>
          </Radio.Group>

          {isMobile ? (
            <iframe
              src="/handbooks/Mobile_Casemanagers.pdf"
              className="w-full h-full"
            ></iframe>
          ) : (
            found?.url && (
              <iframe src={found?.url} className="w-full h-full"></iframe>
            )
          )}
        </Drawer>
      )}
    </>
  );
};
