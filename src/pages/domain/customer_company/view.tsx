import { Modal, notification, Spin } from "antd";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { UpdateUser } from "../user/update";
import { UpdateCustomerCompany } from "pages/dashboard/financiar/pages/CustomerCompany/actions/update";
import UpdateLedger from "../ledger.tsx/update";
import { UpdatePass } from "pages/dashboard/employ-registration/update-pass";
import { CompanyDetailsCard, UserAccountCard, LedgerCard } from "./components";
import { useAuthContext } from "context/auth";

interface Props {
  open?: boolean;
  detail?: CustomerCompanyType;
  onCancel: () => void;
  onFinish?: () => void;
}

/**
 * CustomerCompanyView component displays detailed information about a customer company
 * including company details, user account, and ledger information
 */
const CustomerCompanyView = ({
  open,
  detail,
  onCancel,
  onFinish = () => {},
}: Props) => {
  const getDetail = useRequest(customerCompany.getDetail, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const [isEditUser, setIsEditUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditLedger, setIsEditLedger] = useState(false);
  const [changePass, setChangePass] = useState<any>(null);

  useEffect(() => {
    if (open && detail?.id) {
      getDetail.run(detail.id);
    }
  }, [open]);

  const reload = () => {
    if (detail?.id) {
      getDetail.run(detail?.id);
    }
  };

  if (getDetail.loading) {
    return <Spin />;
  }

  if (!getDetail.data) {
    return <div>Мэдээлэл олдсонгүй</div>;
  }

  return (
    <>
      <Modal
        title="Харилцагч компанийн мэдээлэл"
        width={1000}
        open={!!open}
        onCancel={onCancel}
        footer={null}
      >
        <div className="my-6">
          <CompanyDetailsCard 
            data={getDetail.data} 
            onEdit={() => setIsEdit(true)} 
          />
          
          <UserAccountCard 
            data={getDetail.data}
            onEdit={() => setIsEditUser(true)}
            onChangePassword={(user) => setChangePass(user)}
            onCancel={() => {}}
            onFinish={reload}
          />
          
          <LedgerCard 
            data={getDetail.data}
            onEdit={() => setIsEditLedger(true)}
            onCancel={onCancel}
            onFinish={reload}
          />
        </div>
      </Modal>

      <UpdateUser
        open={isEditUser}
        detail={getDetail.data?.user}
        onCancel={() => setIsEditUser(false)}
        onFinish={() => {
          setIsEditUser(false);
          reload();
        }}
      />
      <UpdateCustomerCompany
        open={isEdit}
        detail={getDetail.data}
        onCancel={() => setIsEdit(false)}
        onFinish={() => {
          setIsEdit(false);
          reload();
        }}
      />
      <UpdateLedger
        open={isEditLedger}
        detail={getDetail.data?.ledger}
        onCancel={() => setIsEditLedger(false)}
        onFinish={() => {
          setIsEditLedger(false);
          reload();
        }}
      />
      {changePass && (
        <UpdatePass
          open={changePass}
          detail={changePass}
          onCancel={() => setChangePass(null)}
          onFinish={() => {
            setChangePass(null);
            reload();
          }}
        />
      )}
    </>
  );
};

export default CustomerCompanyView;
