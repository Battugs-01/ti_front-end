import { Avatar, Popover } from "antd";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Bell01, XCloseIcon } from "untitledui-js-base";

export const Notification = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const data = {};
  return (
    <Popover
      placement="bottomRight"
      open={notification}
      arrow={false}
      trigger={["click"]}
      overlayInnerStyle={{
        padding: 0,
        width: "500px",
      }}
      content={
        <div className="flex flex-col">
          <div className="bg-primary-700 text-white px-4 py-6 flex items-center justify-between rounded-md">
            <div className="text-base">
              <FormattedMessage id="notifications" />
            </div>
            <XCloseIcon size="24" onClick={() => setNotification(false)} />
          </div>
          <div className="flex items-start justify-between px-4 py-6">
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
      }
    >
      <Bell01
        size="20"
        onClick={() => {
          setNotification(!notification);
        }}
        className="p-2 bg-white bg-opacity-10 rounded-full"
      />
    </Popover>
  );
};
