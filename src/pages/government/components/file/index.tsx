import FileIcon from "assets/government/icons/file.svg";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { formatKB } from "utils/index";

type FileType = {
  size?: number;
  file_name?: String;
  path?: String;
};

export const File: React.FC<FileType> = ({ file_name, size, path }) => {
  return (
    <Fragment>
      {path ? (
        <Link
          target="blank"
          to={`http://103.41.112.73:9000/${path}`}
          className="flex bg-[#F5F8F8] px-4 py-2 rounded-lg gap-3 text-[#344054]"
        >
          <img src={FileIcon} alt="file" />
          <div className="flex flex-col gap-1">
            <div className="font-medium">{file_name}</div>
            <div>{formatKB(size!, 1)}</div>
          </div>
        </Link>
      ) : (
        <div className="flex bg-[#F5F8F8] px-4 py-2 rounded-lg gap-3 text-[#344054]">
          <img src={FileIcon} alt="file" />
          <div className="font-medium">Файл байхгүй байна</div>
        </div>
      )}
    </Fragment>
  );
};
