import { useRequest } from "ahooks";
import { CreateButton, DeleteButton } from "components/index";
import { RemoveModal } from "components/modal";
import { FC, useState } from "react";
import file from "service/file";
import settings, { keys } from "service/settings";
import { Config } from "service/settings/types";
import Create from "./create";

export const AvatarsTab: FC = ({}) => {
  const { data, refresh } = useRequest(async () =>
    settings.get<Config>(keys.avatars)
  );
  const avatars = JSON.parse(data?.value || "[]") as string[];

  const [hovered, setHovered] = useState<string>();
  const [remove, setRemove] = useState<string>();
  const [create, setCreate] = useState<boolean>(false);
  return (
    <>
      <div className="w-full flex justify-between items-center pb-6">
        <span className="text-gray-900 text-lg font-medium">Avatars</span>

        <CreateButton size="large" onClick={() => setCreate(true)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {avatars.map((avatar, key) => (
          <div
            key={"avatar-" + key}
            className="flex justify-center items-center flex-col relative"
          >
            <img
              width={150}
              height={150}
              className=" object-cover rounded-full"
              src={file.fileToUrl(avatar)}
            />
            <div
              className={`flex items-center justify-center gap-2 absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-full bg-black bg-opacity-70 ease-in rounded-full transition-opacity duration-100 ${
                hovered === avatar ? "opacity-100" : "opacity-0"
              }`}
              onMouseEnter={() => setHovered(avatar)}
              onMouseLeave={() => setHovered(undefined)}
            >
              <DeleteButton onClick={() => setRemove(avatar)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <RemoveModal
        open={!!remove}
        onCancel={() => {
          setRemove(undefined);
        }}
        onRequest={async (_) => {
          return settings.set(
            keys.avatars,
            avatars?.filter((item) => item !== remove)
          );
        }}
        onDone={() => {
          setRemove(undefined);
          refresh();
        }}
        remove
        display={"Avatar"}
      />
      <Create
        open={create}
        onCancel={() => {
          setCreate(false);
        }}
        onFinish={() => {
          setCreate(false);
          refresh();
        }}
        details={avatars || []}
      />
    </>
  );
};
