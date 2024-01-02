import { useRequest } from "ahooks";
import { ExportButton, ITable } from "components/index";
import { FC } from "react";
import settings, { keys } from "service/settings";
import { Config, FaqModel } from "service/settings/types";
import { CreateCustomerFAQ } from "./create";
import { UpdateCustomerFAQ } from "./update";
import { LANGUAGES } from "config";

const FaqCustomersTab: FC = ({ }) => {
    const { data, refresh, loading } = useRequest(async () =>
        settings.get<Config>(keys.faqCustomer)
    );
    const faq = JSON.parse(data?.value || "[]") as FaqModel[];

    return (
        <>
            <ITable<FaqModel>
                toolBarRender={() => [<ExportButton />]}
                total={faq?.length || 0}
                dataSource={faq}
                columns={[
                    {
                        dataIndex: "title",
                        valueType: "string",
                        title: "Question",
                    },
                    {
                        dataIndex: "content",
                        valueType: "string",
                        title: "Answer",
                        render: (_, record) => {
                            return (
                                <div dangerouslySetInnerHTML={{ __html: record.content }} />
                            );
                        },
                    },
                    {
                        dataIndex: "language",
                        valueType: "string",
                        title: "Language",
                        render: (_, record) => {
                            return <div>{LANGUAGES.find((el) => el.value === record.language)?.label}</div>
                        },
                    },
                ]}
                loading={loading}
                CreateComponent={CreateCustomerFAQ}
                UpdateComponent={UpdateCustomerFAQ}
                RemoveModelConfig={{
                    action: async (id) => {
                        return settings.set(keys.faqCustomer, faq?.filter((x) => x.id !== id))
                    },
                    config: (record) => {
                        return {
                            uniqueKey: record?.id,
                            display: record?.title
                        }
                    }
                }}
                details={faq}
                refresh={refresh}
            />
        </>
    );
};

export default FaqCustomersTab;
