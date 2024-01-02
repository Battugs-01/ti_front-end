
import { FC } from "react";
import { keys } from "service/settings";
import { FaqModel } from "service/settings/types";
import { ActionComponentProps } from "types";
import { UpdateFAQModal } from "../modal/update";

export const UpdateCustomerFAQ: FC<ActionComponentProps<FaqModel>> = ({ ...rest }) => {
    return <UpdateFAQModal {...rest} type={keys.faqCustomer} />
}