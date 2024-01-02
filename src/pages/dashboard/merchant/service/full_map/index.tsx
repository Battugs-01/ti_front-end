import { useRequest } from "ahooks";
import { Image, Spin, notification } from "antd";
import { RenderServiceStatus } from "components/index";
import LeafletMap from "components/map";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { FaMapPin, FaStar } from "react-icons/fa";
import file from "service/file";
import merchantService from "service/merchantService";
import {
  ServiceStatusRequestType,
  ServiceStatusType,
} from "service/merchantService/type";
import { atomServiceForm } from "../store";

export const FullMap = ({ type }: { type: String }) => {
  const [form] = useAtom(atomServiceForm);
  const list = useRequest(merchantService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = (values?: any) => {
    const sendJSON = {
      ...form,
      is_all: true,
      is_tourist_friendly: form.is_tourist_friendly
        ? form.is_tourist_friendly === "yes"
          ? true
          : false
        : undefined,
      ...values,
      created_at: form.full_date,
    };

    switch (type) {
      case ServiceStatusRequestType.pending:
        sendJSON.status_request = type;
        sendJSON.status = ServiceStatusType.initial;
        break;
      case ServiceStatusRequestType.cancelled:
        sendJSON.status_request = type;
        sendJSON.status = ServiceStatusType.initial;
        break;
      case "all":
        sendJSON.status = undefined;
        break;
      default:
        sendJSON.status = type;
        break;
    }

    list.run(sendJSON);
  };

  useEffect(() => {
    run();
  }, [form, type]);

  const markers = list.data?.items.reduce((acc, el) => {
    if (el.location) {
      acc.push({
        latitude: el.location?.[0],
        longitude: el.location?.[1],
        name: el.name,
        iconUrl: merchantService.getMapIconUrl(el.operation_types),
        customPopup: (
          <div className="grid grid-cols-3 gap-4 min-w-[250px] min-h-[100px]">
            <div className="col-span-1 rounded-md h-[90px]">
              <Image
                src={
                  el?.logo
                    ? file.fileToUrl(el?.logo || "")
                    : "/images/default.png"
                }
                alt=""
                className="w-[80px] h-[90px] object-cover rounded-md"
              />
            </div>
            <div className="col-span-2">
              <div className="flex gap-1">
                <FaStar className="text-yellow-400" size={12} />
                {el.total_rating} ({el.reviews?.length || 0}){" • "}
                {el.price_range
                  ? Array.from(
                      { length: el.price_range },
                      (_, index) => index + 1
                    )
                      ?.map(() => "$")
                      .join("")
                  : null}
              </div>
              <div className="text-lg font-bold">{el.name}</div>
              <div className="text-sm text-gray-500">
                <FaMapPin className="inline-block mr-1" size={12} />
                {el.address}
              </div>
              <RenderServiceStatus status={el.status} />
            </div>
          </div>
        ),
      });
    }
    return acc;
  }, [] as any[]);

  return (
    <div
      style={{
        height: "calc(100vh - 120px)",
        width: "100%",
        position: "relative",
      }}
    >
      {list.loading && (
        <div className="w-full h-full absolute top-0 right-0 flex justify-center items-center z-[1000] bg-gray-800 bg-opacity-10">
          <Spin />
        </div>
      )}
      <LeafletMap markers={markers} />
    </div>
  );
};
