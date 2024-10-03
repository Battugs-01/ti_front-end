import { useRequest } from "ahooks";
import { Avatar, Badge, Dropdown, Menu, notification } from "antd";
import notifactionSvg from "assets/img/Notification.svg";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { XCloseIcon } from "untitledui-js-base";
export const Notification = () => {
  const [notifications, setNotification] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>(null);

  const fetchProduct = async () => {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const list = useRequest(fetchProduct, {
    manual: true,
    onSuccess: (hello) => {
      console.log(hello, "hello");
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const fetchData = () => {
    list.run();
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 50000);
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderNotificationItem = (list: any, key: number) => (
    <>
      <Menu.Item key={key} className="h-[117px]">
        <div className="flex flex-col">
          <div className="flex items-start justify-between  py-6">
            <div className="flex items-center gap-4">
              <Avatar size={40}>CA</Avatar>
              <div>
                <div className="text-primary-700 font-semibold">
                  <FormattedMessage id="case_assigned" />
                </div>
                <div className="text-gray-400">
                  <FormattedMessage id="case_assigned_description" />
                </div>
              </div>
            </div>
            <div className="text-gray-400">2 days ago</div>
          </div>
        </div>
      </Menu.Item>
      <div className="bg-[#dee1e1] w-full h-[1px]" />
    </>
  );

  const notificationMenu = (
    <>
      <div className="bg-primary-700 h-[50px] text-white px-4 py-6 flex items-center justify-between rounded-t-lg  mt-5">
        <div className="text-base">
          <FormattedMessage id="notifications" />
        </div>
        <XCloseIcon size="24" onClick={() => setNotification(false)} />
      </div>
      <Menu className="overflow-y-auto h-[500px] w-[439px]">
        {list?.data?.products.map(renderNotificationItem)}
      </Menu>
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
        count={list?.data?.total}
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
