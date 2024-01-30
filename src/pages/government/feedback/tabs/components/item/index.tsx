import { Avatar, Badge, Collapse } from "antd";
import { Link } from "react-router-dom";
import PhoneIcon from "assets/government/icons/phone.svg";
import MailIcon from "assets/government/icons/mail.svg";
import EditIcon from "assets/government/icons/editButton.svg";
import { CustomButton } from "pages/government/components/button";
import IBadge from "components/badge";
import LoomIcon from "assets/government/icons/loom.svg";
import CheckIcon from "assets/icons/check.svg";

type ItemType = {
  data: any;
};

const Item: React.FC<ItemType> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="flex items-center flex-col">
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex items-center gap-4 w-1/2">
            <Avatar size={36} style={{ background: "#144E5A" }} shape="circle">
              {"BA"}
            </Avatar>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <Link to={`${data?.id}`}>
                  <div className="font-bold text-base text-gray-900 uppercase">
                    {"Battulga"}
                  </div>
                </Link>
                <div className="font-bold text-base">{"Enkhtur"}</div>
                <IBadge title={"Гомдол"} color="red" />
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  Илгээсэн огноо:{" "}
                  <span className="font-bold">{"28/10/2012"}</span>
                </div>
                <Badge status="default" />
                <div className="flex items-center gap-1">
                  <img src={PhoneIcon} />
                  <div>{"99703101"}</div>
                </div>
                <Badge status="default" />
                <div className="flex items-center gap-1">
                  <img src={MailIcon} />
                  <div>{"mail@gmail.com"}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-1/2 justify-end">
            <div className="flex items-center gap-1">
              <img src={LoomIcon} alt="loom" />
              <div className="font-bold">
                {"Батсүмбэрийн Улсын асрамжийн газар"}
              </div>
            </div>
            <div className="flex items-center">
              <CustomButton
                title="Хариуцсан байгууллагад шилжүүлэх"
                icon={<img src={CheckIcon} />}
              />
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 mr-4 ml-20 custom-ant-collapse-feedback font-bold text-[#475467]">
          <Collapse
            expandIconPosition="end"
            items={[
              {
                label:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel congue metus. Aliquam quis ultrices tortor. Vivamus quis metus convallis, suscipit enim ac, posuere nibh. Curabitur nunc ligula, convallis vel eros et, interdum euismod mi.",
                children:
                  "Nunc vel maximus risus, nec fringilla erat. Curabitur placerat efficitur massa quis aliquet. Nunc dictum faucibus tellus, at facilisis mi vestibulum eget. Etiam bibendum sem justo, a ultricies justo dignissim vitae. Quisque malesuada non ante a posuere. Nulla semper dolor dui, consequat vehicula quam ullamcorper et.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
export default Item;
