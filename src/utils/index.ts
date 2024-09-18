import dayjs, { QUnitType } from "dayjs";
import { HTMLAttributes } from "react";
import file from "service/file";
import { FilterDeadline } from "types";

export const calculateTableRowSpan = (
  index: number,
  record: any,
  list: any[],
  dest_field: string
): { rowSpan: number } => {
  let obj = {
    rowSpan: 1,
  };
  if (list.length === 0) return obj;

  // If index equal to zero  , then need to calculate total task which dest field is the same.
  if (index == 0 && list)
    obj.rowSpan = list?.reduce<number>(
      (pre, curr) => (record[dest_field] == curr[dest_field] ? pre + 1 : pre),
      0
    );

  // If current dest field is equal to previous dest field
  // then rowSpan should be zero in order to merge the column
  if (index != 0 && list && list[index - 1][dest_field] == record[dest_field])
    obj.rowSpan = 0;

  // If index isn't zero and current dest field is different from the previous dest field ,
  // then calculate the new total task number
  if (index != 0 && list && list[index - 1][dest_field] != record[dest_field])
    obj.rowSpan = list?.reduce<number>(
      (pre, curr) => (record[dest_field] == curr[dest_field] ? pre + 1 : pre),
      0
    );
  return obj;
};
export const tableCellFixed: (width: number) => {
  width: number;
  onCell: () => HTMLAttributes<HTMLElement>;
} = (width) => ({
  width,
  onCell: () => ({ style: { maxWidth: width, minWidth: width } }),
});

export const firstLastNames = (lastName?: string, firstName?: string) => {
  if (!firstName || !lastName) return "";

  let sliced_name =
    (firstName || "").charAt(0).toUpperCase() + (firstName || "").slice(1);
  return `${lastName?.substring(0, 1).toUpperCase()}. ${sliced_name}`;
};

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
export const tablePagination: (
  params: Partial<{
    pageSize?: number;
    current?: number;
    [x: string]: any;
  }>,
  sort: any
) => { limit: number; page: number; sorter: any; [x: string]: any } = (
  { pageSize, current, ...rest },
  sort
) => {
  return {
    limit: pageSize || 20,
    page: (current || 1) - 1,
    sorter: sort,
    ...rest,
  };
};

export const isStringValid = (value?: string) => {
  if (!value) return false;
  if (!value.trim()) return false;
  if (value.length <= 0) return false;
  return true;
};

export const isDateValid = (date?: Date) => {
  if (!date) return false;
  if (dayjs(date).year() <= 1) return false;
  return true;
};

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

export const getImageSeperate = (
  files?: any[]
): { unChangedImages?: any[]; changedImages?: any[] } => {
  let unChangedImages = files
    ?.filter((el: any) => el.isBefore)
    .map((el) => el.uid);
  let changedImages = files?.filter((el: any) => !el.isBefore);
  return { unChangedImages, changedImages };
};
// export const
export const formatTimeToDate = (str: string) => {
  let value = str.split(":");
  if (!value || value?.length !== 3) return undefined;
  return dayjs()
    .set("hour", parseInt(value[0].trim()))
    .set("minute", parseInt(value[1].trim()))
    .set("second", parseInt(value[2].trim()));
};

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

export const calculatePreviousDeadline = (
  deadline?: FilterDeadline,
  dates?: dayjs.Dayjs[]
) => {
  if (!dates || dates.length <= 0 || (deadline && deadline < 0))
    return undefined;

  let date = dates[0].add(-1, "day");
  switch (deadline) {
    case FilterDeadline.FullHours:
      return [date.add(-1, "day"), date];
    case FilterDeadline.Week:
      return [date.add(-1, "week"), date];

    case FilterDeadline.Month:
      return [date.add(-30, "day"), date];

    case FilterDeadline.ThreeMonth:
      return [date.add(-2, "month"), date];

    case FilterDeadline.SixMonth:
      return [date.add(-5, "month"), date];

    case FilterDeadline.Year:
      return [date.add(-1, "year"), date];

    case FilterDeadline.OneMonth:
      return [date.add(-1, "month"), date];

    default:
      return [date.add(-6, "month"), date];
  }
};

export const diffDates = (start?: Date, end?: Date, field?: QUnitType) => {
  return dayjs(start).diff(end, field);
};

export const capitalizate = (value?: string) =>
  value ? value?.charAt(0).toUpperCase() + value?.slice(1, value?.length) : "";

export const fillDollar = (value?: number) =>
  value ? new Array(value).fill("$").join("") : "";

export const validateEmail = (value?: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value || "")
    ? true
    : false;

export const isValidDate = (value?: Date) =>
  value ? new Date(value).getFullYear() > 1 : false;

export const renderEnDate = (value?: Date | string, withTime?: boolean) => {
  if (!value) return "";
  if (dayjs(value).year() <= 1) return "";
  if (withTime) return dayjs(value).format("MMM DD, YYYY HH:mm");
  return dayjs(value).format("MMM DD, YYYY");
};

export const getDeadlineType = (type: FilterDeadline) => {
  switch (type) {
    case FilterDeadline.FullHours:
      return "hour";
    case FilterDeadline.Week:
      return "day";
    case FilterDeadline.Month:
      return "day";
    case FilterDeadline.ThreeMonth:
      return "month";
    case FilterDeadline.SixMonth:
      return "month";
    case FilterDeadline.Year:
      return "month";
    case FilterDeadline.OneMonth:
      return "day";
    default:
      return "";
  }
};

export const getDateByDeadline = (type?: FilterDeadline, date?: string) => {
  switch (type) {
    case FilterDeadline.FullHours:
      return dayjs(date).format("HH:00");
    case FilterDeadline.Week:
      return dayjs(date).format("ddd");
    case FilterDeadline.Month:
      return dayjs(date).format("D");
    case FilterDeadline.ThreeMonth:
      return dayjs(date).format("MMM");
    case FilterDeadline.SixMonth:
      return dayjs(date).format("MMM");
    case FilterDeadline.Year:
      return dayjs(date).format("MMM");
    case FilterDeadline.OneMonth:
      return dayjs(date).format("D");
    default:
      return "";
  }
};

export const getTitleByDeadline = (
  type?: FilterDeadline,
  current?: boolean
) => {
  switch (type) {
    case FilterDeadline.FullHours:
      return current ? "Today" : "Yesterday";
    case FilterDeadline.Week:
      return current ? "This week" : "Last week";
    case FilterDeadline.Month:
      return current ? "This month" : "Last month";
    case FilterDeadline.ThreeMonth:
      return current ? "This 3 months" : "Last 3 months";
    case FilterDeadline.SixMonth:
      return current ? "This 6 months" : "Last 6 months";
    case FilterDeadline.Year:
      return current ? "This year" : "Last year";
    case FilterDeadline.OneMonth:
      return current ? "This month" : "Last month";
    default:
      return "";
  }
};

export const formatNumber = (value?: number) => {
  if (!value) return 0;
  if (value < 1000) return value.toFixed(1);
  if (value > 1000 && value < 1000000) {
    return (value / 1000).toFixed(1) + "K";
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

export const getDatePeriodType = (gapDays?: number) => {
  if (!gapDays) return "";
  if (gapDays <= 1) return "hour";
  if (gapDays <= 7) return "day";
  if (gapDays <= 31) return "day";
  return "month";
};

export const getDeadlineByRangeDate = (fullDate?: string[]) => {
  if (!fullDate || fullDate?.length <= 0) return "";
  let gapDays = diffDates(
    dayjs(fullDate[1]).toDate(),
    dayjs(fullDate[0]).toDate(),
    "days"
  );

  if (gapDays <= 1) return FilterDeadline.FullHours;
  if (gapDays <= 7) return FilterDeadline.Week;
  if (gapDays <= 31) return FilterDeadline.Month;
  if (gapDays <= 90) return FilterDeadline.ThreeMonth;
  if (gapDays <= 6 * 30) return FilterDeadline.SixMonth;
  return FilterDeadline.Year;
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
  pageSize: 10,
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
