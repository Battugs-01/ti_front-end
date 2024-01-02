import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { CheckButton } from "components/button/action";
import { ExportButton, ITable, RenderStatusRequest } from "components/index";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import merchantService from "service/merchantService";
import {
    MerchantService,
    ServiceStatusRequestType,
    ServiceStatusType,
} from "service/merchantService/type";
import { exportFromTable } from "utils/export";
import { tableCellFixed } from "utils/index";
import {
    ServiceBaseColumns,
    ServiceColumnPrice,
    ServiceColumnTimeTable,
    ServiceColumnTourisFriendly,
} from "../column";
import { UpdateServiceRequest } from "../modals/update_request";
import { atomServiceForm } from "../store";

export const CancelledList = ({
    updateNumbers,
}: {
    updateNumbers: () => void;
}) => {
    const [update, setUpdate] = useState<MerchantService>();
    const [form] = useAtom(atomServiceForm);

    const list = useRequest(merchantService.list, {
        manual: true,
        onError: (err) =>
            notification.error({
                message: err.message,
            }),
    });

    const run = (values?: any) => {
        list.run({
            ...form,
            created_at: form.full_date,
            status_request: ServiceStatusRequestType.cancelled,
            status: ServiceStatusType.initial,
            ...values,
        });
    };

    const debounceRun = useDebounceFn(() => run(), {
        wait: 500,
    });

    useEffect(() => {
        debounceRun.run();
    }, [form]);

    return (
        <>
            <ITable<MerchantService>
                hideCreateButton
                dataSource={list.data?.items}
                loading={list.loading}
                total={list.data?.total}
                refresh={(values) => {
                    run(values);
                    updateNumbers();
                }}
                toolbarItems={
                    <ExportButton
                        onClick={() => {
                            exportFromTable(
                                ["Request"],
                                window.document.getElementById("main-table") as HTMLElement,
                                window
                            );
                        }}
                    />
                }
                customActions={(record) => (
                    <>
                        <CheckButton onClick={() => setUpdate(record)} />
                    </>
                )}
                columns={[
                    ...ServiceBaseColumns,
                    {
                        ...tableCellFixed(100),
                        dataIndex: "status_request",
                        title: "Status",
                        render: (_, record) => (
                            <RenderStatusRequest status={record.status_request} />
                        ),
                    },
                    ServiceColumnPrice,
                    ServiceColumnTourisFriendly,
                    ServiceColumnTimeTable,
                ]}
            />

            <UpdateServiceRequest
                open={!!update}
                detail={update}
                onCancel={() => setUpdate(undefined)}
                onFinish={() => {
                    run();
                    setUpdate(undefined);
                    updateNumbers();
                }}
            />
        </>
    );
};
