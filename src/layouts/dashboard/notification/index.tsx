import { useRequest } from "ahooks";
import { Badge, Checkbox, Dropdown, Empty, Menu, notification } from "antd";
import ellipse from "assets/img/ellipse.svg";
import notifactionSvg from "assets/img/notification.svg";
import warning from "assets/img/warning.svg";
import { useLevelContext } from "components/custom-detail/selected-level";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import notificationsWeb from "service/notifaction";
import { ListType } from "service/notifaction/types";
import { XCloseIcon } from "untitledui-js-base";
export const Notification = () => {
  const [notifications, setNotification] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [reading, setReading] = useState<number>();
  const [readingAll, setReadingAll] = useState<boolean>(false);
  const { selectedLevel, setSelectedLevel } = useLevelContext();
  const intl = useIntl();
  const [user] = useContext(AuthContext);

  const list = useRequest(notificationsWeb.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const onNotificationIsRead = useRequest(notificationsWeb.read, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
    onSuccess: () => {
      setReading(undefined);
      fetchData();
    },
  });

  const onNotificationIsReadAll = useRequest(notificationsWeb.readALl, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
    onSuccess: () => {
      setReadingAll(false);
      fetchData();
    },
  });

  const fetchData = () => {
    list.run();
  };

  useEffect(() => {
    if (user?.authorized) {
      fetchData();
      const id = setInterval(fetchData, 50000);
      setIntervalId(id);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  useEffect(() => {
    if (reading) {
      onNotificationIsRead.run(reading);
    }
  }, [reading]);

  useEffect(() => {
    if (readingAll) {
      onNotificationIsReadAll.run();
    }
  }, [readingAll]);

  const renderNotificationItem = (item: ListType, key: number) => (
    <>
      <Menu.Item
        key={key}
        className={`h-[117px] rounded-b-lg ${
          !item.is_read ? "bg-[#f5f8f8]" : "bg-[#fff]"
        }`}
        onClick={() => {
          setReading(item?.id);
        }}
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-start gap-3 col-span-2 w-[250px]">
              <img src={warning} alt="warning" className="mt-1" />
              <div className="flex flex-col gap-1">
                <div
                  className={`font-normal" ${
                    !item?.is_read ? "text-gray-700" : "text-gray-500"
                  }`}
                >
                  {item?.notification?.title}
                </div>
                <div
                  className="text-primary-700 font-bold underline"
                  onClick={() => {
                    setSelectedLevel(item?.notification?.assessment_id);
                    window.location.href = `/dashboard/screening-list/detail?customer_id=${item?.notification?.customer_id}`;
                  }}
                >
                  <FormattedMessage id="detail" />
                </div>
              </div>
            </div>
            <div className="text-gray-600 font-normal text-xs col-span-1 mt-1">
              {dayjs(item?.notification?.date).format("YYYY-MM-DD HH:mm:ss")}
              {!item?.is_read && (
                <img src={ellipse} alt="ellipse" className="mt-1 pl-1" />
              )}
            </div>
          </div>
        </div>
      </Menu.Item>
      <div className="bg-[#dee1e1] w-full h-[1px]" />
    </>
  );

  const notificationMenu = (
    <>
      <div className="bg-primary-700 h-[40px] text-white px-3 pt-2 pb-8 flex items-start justify-between rounded-t-lg  mt-5">
        <div className="flex gap-3 flex-col text-white ">
          <div className="text-base">
            <FormattedMessage id="notifications" />
          </div>
          <Checkbox className="text-white" onClick={() => setReadingAll(true)}>
            <FormattedMessage id="all_read" />
          </Checkbox>
        </div>
        <XCloseIcon size="24" onClick={() => setNotification(false)} />
      </div>
      {/* <Empty /> */}
      {list?.data?.length ? (
        <Menu className="overflow-y-auto max-h-[500px] w-[459px] rounded-b-lg">
          {list?.data?.map((item, key) => renderNotificationItem(item, key))}
        </Menu>
      ) : (
        <Menu className="overflow-y-auto max-h-[500px] w-[459px] rounded-b-lg">
          <Empty
            className="my-4"
            description={intl.formatMessage({ id: "noData" })}
          />
        </Menu>
      )}
    </>
  );

  return (
    <Dropdown
      overlay={notificationMenu}
      trigger={["click"]}
      open={notifications}
      className="flex items-center justify-center p-0 custom-ant-dropdown"
      onOpenChange={() => setNotification(!notifications)}
      rootClassName="custom-ant-dropdown p-0 h-9"
    >
      <Badge
        count={list?.data?.filter((item) => !item?.is_read).length}
        className="cursor-pointer"
        color="#A0B6BA"
      >
        <div className="p-2 rounded-full bg-[#fff] bg-opacity-10 ">
          <img
            src={notifactionSvg}
            alt=""
            className="bg-opacity-10 rounded-full"
          />
        </div>
      </Badge>
    </Dropdown>
  );
};
