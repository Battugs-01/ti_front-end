
import { ActionComponentProps } from "types";
import { FC } from "react";
import { FaqModel } from "service/settings/types";
import { CreateFAQModal } from "../modal/create";
import { keys } from "service/settings";

export const CreateMerchantFAQ: FC<ActionComponentProps<FaqModel>> = ({ ...rest }) => {
    return <CreateFAQModal {...rest} type={keys.faq} />
}