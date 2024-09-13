import { Avatar, Descriptions, Modal } from "antd"
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import file from "service/file"
import { PermissionList } from "service/settings/permission/type";
import { ActionComponentProps } from "types";

const color = "#144E5A";

const labelStyle={
    color:"#101828",
    fontWeight:"bolder",
}

export const Detail: React.FC<ActionComponentProps<PermissionList>> = ({detail,onCancel,open}) => {
    return (
        <Modal
        title={
            <div className="flex items-center gap-2 flex-wrap 2xl:flex-nowrap">
          <Avatar
            size={36}
            src={file.fileToUrl(detail?.profile?.physical_path || "")}
            style={{ background: color }}
            shape="circle"
            className="uppercase"
          >
            {detail?.first_name.substring(0, 2)}
          </Avatar>
          <div>
            <FormattedMessage id="detail_title" />
          </div>
          </div>
        }
        footer={null}
        styles={{
            header:{
                padding:"1.2rem",
                borderBottom:"1px solid #EAECF0",
            },
            content:{
                padding:"0"
            },
            body:{
                padding:"1.2rem",
            },
        }}
        onCancel={onCancel}
        open={open}
        width={560}
        >
            <Descriptions className="flex flex-col" column={1}>
                <Descriptions.Item label={<FormattedMessage id="last_name" />} labelStyle={labelStyle}>
                    {detail?.last_name}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="first_name" />} labelStyle={labelStyle}>
                    {detail?.first_name}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="agency" />} labelStyle={labelStyle}>
                    {detail?.agency?.name}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="date_of_birth" />} labelStyle={labelStyle}>
                    {dayjs(detail?.birth_date).format("YYYY-MM-DD")}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="gender" />} labelStyle={labelStyle}>
                    {detail?.gender}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="phone" />} labelStyle={labelStyle}>
                    {detail?.phone}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="address" />} labelStyle={labelStyle}>
                    {detail?.address?.desc}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="permission" />} labelStyle={labelStyle}>
                    {detail?.address?.desc}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="email" />} labelStyle={labelStyle}>
                    {detail?.email}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    )
}