import dayjs, { QUnitType } from "dayjs";
import file from "service/file";
import { FilterDeadline } from "types";

export interface ISorter {
  //method to list all the keys of the object
  toList: () => SortOption[];
}

export interface SortOption {
  selector: string;
  direction: "asc" | "desc";
}

export interface DataLoadRequest {
  pageNumber?: number;
  pageSize?: number;
  orders?: Array<SortOption>;
}

export const moneyFormat: (
  money?: number | null,
  currency?: string
) => string = (money, currency) => {
  if (!money) return "0";
  let format = new Intl.NumberFormat().format(money);
  if (currency) return `${format} ${currency === "mnt" ? "₮" : "$"}`;
  return format;
};

export const generateUniqueID = () => new Date().getTime().toString();

export const convertFileToUploadFile = (path?: string): any[] | undefined =>
  path
    ? [
        {
          uid: path,
          status: "done",
          response: "",
          url: file.fileToUrl(path),
          name: path,
          isBefore: true,
        },
      ]
    : undefined;

export const calculateDeadlineDate = (deadline: FilterDeadline) => {
  switch (deadline) {
    case FilterDeadline.FullHours:
      return [dayjs().add(-1, "day"), dayjs()];
    case FilterDeadline.Week:
      return [dayjs().add(-1, "week"), dayjs()];
    case FilterDeadline.Month:
      return [dayjs().add(-30, "day"), dayjs()];
    case FilterDeadline.ThreeMonth:
      return [dayjs().add(-2, "month"), dayjs()];
    case FilterDeadline.SixMonth:
      return [dayjs().add(-5, "month"), dayjs()];
    case FilterDeadline.Year:
      return [dayjs().add(-1, "year"), dayjs()];
    case FilterDeadline.OneMonth:
      return [dayjs().add(-1, "month"), dayjs()];

    default:
      return undefined;
  }
};

export const diffDates = (start?: Date, end?: Date, field?: QUnitType) => {
  return dayjs(start).diff(end, field);
};

/*************  ✨ Codeium Command 🌟  *************/

export const formatNumber = (value?: number) => {
  // Return the formatted value with the appropriate unit (B, KB, MB, etc.)
  if (!value) return 0;
  if (value < 1000) return value.toFixed(1);
  if (value > 1000 && value < 1000000) {
    /**
     * Format a number of bytes as a human-readable string
     * @param value - The value to format
     * @param decimals - The number of decimal places to round to
     * @returns The formatted string
     */
    return (value / 1000).toFixed(1) + "K";
    /******  8c3ee646-1364-4211-9401-1461885a92af  *******/
  }
  if (value > 1000000 && value < 1000000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value > 1000000000 && value < 1000000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  }
  return value.toFixed(1);
};

export const formatKB = (value: number, decimals = 1) => {
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (value === 0) return "0";
  const k: number = 1024;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const tmp = k ** i;
  const dm = decimals < 0 ? 0 : decimals;
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`;
};

export const formatMB = (value = 0, decimals = 2) => {
  const sizes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (value === 0) return "0";
  const k: number = 1024;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const tmp = k ** i;
  const dm = decimals < 0 ? 0 : decimals;
  return `${parseFloat((value / tmp).toFixed(dm))} ${sizes[i]}`;
};

export const newFileUploads = async (files: any[], uploadMulti: any) => {
  const oldFileIDs: number[] = [];

  files.map((file) => {
    if (!file?.uid.includes("rc-upload")) {
      oldFileIDs.push(parseInt(file.uid));
    }
  });

  const ids = await uploadMulti
    .runAsync({
      names: files?.reduce<string[]>((acc, record) => {
        if (record?.uid.includes("rc-upload")) {
          acc.push(record.fileName || "");
          return acc;
        }
        return acc;
      }, []),
      files: files?.reduce<string[]>((acc, record) => {
        if (record?.uid.includes("rc-upload")) {
          acc.push(record);
          return acc;
        }
        return acc;
      }, []),
    })
    .then((el: any) => el.map((el: any) => el.id));

  return oldFileIDs.concat(ids);
};

export const initFilter = {
  current: 1,
  pageSize: 10,
  sortDate: {
    start_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[0],
    end_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[1],
  },
};
export const initPagination = {
  current: 1,
  pageSize: 20,
};

export const settingsFilter = {
  current: 1,
  pageSize: 20,
  start_date: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
  end_date: dayjs().format("YYYY-MM-DD"),
};

export const reportFilter = {
  current: 1,
  pageSize: 20,
  start_date: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
  end_date: dayjs().format("YYYY-MM-DD"),
};

export const reportFilterYear = {
  current: 1,
  pageSize: 20,
  year: dayjs().year(),
};

export const parseMongolianID = (id: any) => {
  const yearPart = id.slice(2, 4);
  const monthPart = id.slice(4, 6);
  const dayPart = id.slice(6, 8);
  const year = parseInt(yearPart, 10);
  let month = parseInt(monthPart, 10);
  const day = parseInt(dayPart, 10);

  let fullYear;
  if (month > 12) {
    fullYear = year + 2000;
    month -= 20;
  } else {
    fullYear = year + 1900;
  }

  const date = new Date(fullYear, month - 1, day);

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  return age || 0;
};
