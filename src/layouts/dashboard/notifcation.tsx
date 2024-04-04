import React, { useState, useEffect } from "react";
import { Badge, Dropdown, Menu, notification, Spin } from "antd";
import { BellOutlined, StepBackwardOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import BellIcon from "assets/government/icons/notification.svg";
import governmentUser from "service/gov-settings/request";

const NotificationComponent = () => {
  //   const [notifications, setNotifications] = useState<any>([]);

  const [intervalId, setIntervalId] = useState(null);

  const list = useRequest(governmentUser.getUsers, {
    manual: true,
    onSuccess: (hello) => {},
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const fetchData = () => {
    list.run({});
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5000);
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderNotificationItem = (list: any, key: number) => (
    <Menu.Item key={key}>
      <div className="flex items-center justify-between space-x-2">
        <p className="text-base text-gray-700">Notfication</p>
        {/* <span className="text-sm text-gray-400">{list.timestamp}</span> */}
      </div>
    </Menu.Item>
  );

  const notificationMenu = (
    <Menu>{list?.data?.items.map(renderNotificationItem)}</Menu>
  );

  return (
    <Dropdown overlay={notificationMenu}>
      <div>
        {" "}
        {/* Wrap Badge and span in a single parent element */}
        <Badge
          count={list?.data?.total}
          //   overflowCount={99}
          //   className="mr-2 cursor-pointer"
        >
          <img src={BellIcon} alt="bell" />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationComponent;
