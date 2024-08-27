import { useRequest } from "ahooks";
import { Button, Divider, Flex } from "antd";
import { PageCard } from "components/card";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import screenList from "service/screening_list";
import { ChevronLeft, Edit05, Trash01 } from "untitledui-js-base";

const Info: React.FC = () => {
  const location = useLocation();
  const customerId = location.search?.split("=")[1];
  const { data } = useRequest(() => screenList.customerDetail(customerId));
  return (
    <PageCard>
      <div className="flex items-center justify-between">
        <Link to="/dashboard/development-plan">
          <Button
            type="default"
            icon={<ChevronLeft />}
            className="flex items-center"
          >
            <FormattedMessage id="back" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button type="link" danger icon={<Trash01 />} />
          <Button type="default" icon={<Edit05 />} />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <div className="text-xl text-gray-500 uppercase">
          {data?.first_name}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="register" />
          </div>
          <div className="text-lg font-bold uppercase">{data?.rd}</div>
        </div>
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="age" />
          </div>
          <div className="text-lg font-bold uppercase">{data?.age}</div>
        </div>
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="gender" />
          </div>
          <div className="text-lg font-bold">{data?.gender}</div>
        </div>
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="cfs_score" />
          </div>
          <div className="text-lg font-bold">3/9</div>
        </div>
        <div>
          <div className="text-gray-500">
            <FormattedMessage id="resident_address" />
          </div>
          <div className="text-lg font-bold">
            {`${data?.address?.city?.name}, ${data?.address?.district?.name}, ${data?.address?.khoroo?.name}, ${data?.address?.desc}`}
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-500">
          <FormattedMessage id="caregiver" />
        </div>
        <div className="text-lg font-bold">3/9</div>
      </div>
      <div>
        <div className="text-gray-500">
          <FormattedMessage id="phone" />
        </div>
        <div className="text-lg font-bold">{data?.phone}</div>
      </div>
    </PageCard>
  );
};

export default Info;
