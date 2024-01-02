import { useEffect } from "react";
import { useRequest } from "ahooks";
import { Button, Divider, Image, notification } from "antd";
import { Star } from "components/index";
import file from "service/file";
import merchantService from "service/merchantService";
import { RiHome6Line } from "react-icons/ri";
import { BsChevronRight } from "react-icons/bs";

type Props = {
  id?: number;
};
export const CompanyInfo = ({ id }: Props) => {
  const detail = useRequest(merchantService.get, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (id) detail.run(id);
  }, [id]);

  return (
    <>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={
              detail.data?.logo
                ? file.fileToUrl(detail.data.logo)
                : "/background/login.png"
            }
            height={56}
            width={56}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold leading-7 text-lg text-gray-900">
              {detail.data?.name}
            </div>
            <div className="flex items-center text-sm leading-5 gap-1">
              <Star value={detail.data?.total_rating || 0} />
              <div className="text-gray-600 ">
                ({detail.data?.review_count})
              </div>
            </div>
          </div>
        </div>
        <Button type="default" className="h-10 text-gray-800 font-semibold ">
          Info & Settings
        </Button>
      </div>
    </>
  );
};
