import { notification } from "antd";
import { RcFile } from "antd/lib/upload";
import { ExportButton, ImportButton } from "components/index";
import { SERVICE_CATEGORY_TYPES, SERVICE_OPERATION_TYPES } from "config";
import { useState } from "react";
import { Schema } from "read-excel-file";
import { MerchantService } from "service/merchantService/type";
import { exportFromTable } from "utils/export";
import { excelToJson } from "utils/import_export";
import {
  formatServiceHours,
  isServiceDataValid,
  validateHours,
} from "utils/merchantService";
import { ImportService } from "../modals/import";

const SCHEMA: Schema = {
  Address: {
    prop: "address",
    type: String,
    required: true,
    parse: (value) => {
      if (!value) throw Error("Хаяг оруулаагүй байна.");
      return value;
    },
  },
  Timetable: {
    prop: "hours",
    type: String,
    required: true,

    parse: (value) => {
      if (!value)
        throw Error("Цагийн хуваарь оруулаагүй эсвэл буруу бүтэцтэй байна.");
      let splittedValue = value
        .toString()
        .replaceAll(`\n`, "")
        .replaceAll("am", "")
        .replaceAll("AM", "")
        .replaceAll("PM", "")
        .replaceAll("pm", "")
        .split(",");
      if (!validateHours(splittedValue)) {
        throw Error("Цагийн хуваарь оруулаагүй эсвэл буруу бүтэцтэй байна.");
      }
      let formattedValue = formatServiceHours(splittedValue);
      if (!formattedValue)
        throw Error("Цагийн хуваарь оруулаагүй эсвэл буруу бүтэцтэй байна.");

      return formattedValue;
    },
  },
  "Description Eng": {
    prop: "description",
    type: String,
  },
  "Description Mon": {
    prop: "description_mn",
    type: String,
  },
  Email: {
    prop: "email",
    type: String,
  },
  "Tourist Friendly": {
    prop: "is_tourist_friendly",
    type: String,
    parse: (value) => (value === "Yes" ? true : false),
  },
  "Location (lat, long)": {
    prop: "location",
    type: String,
    required: true,
    parse: (value) =>
      value
        .toString()
        ?.split(",")
        .map((el) => parseFloat(el)),
  },
  Name: {
    prop: "name",
    type: String,
    required: true,
  },
  "Operation type": {
    prop: "operation_types",
    type: String,
    required: true,
    parse: (value) => {
      let splittedValue = value.toString().replaceAll(`\n`, "").split(",");
      let formattedValue = splittedValue?.map((item) => {
        let vl = SERVICE_OPERATION_TYPES.find(
          (el) => el.label.trim() === item.trim()
        )?.value;
        return vl;
      });

      return formattedValue;
    },
  },
  "Phone number": {
    prop: "phone",
    type: String,
    required: true,
  },
  Price: {
    prop: "price_range",
    type: String,
    required: true,
    parse: (value) => value.toString().length,
  },
  "Tags #": {
    prop: "tags",
    type: String,
    parse: (value) => value?.toString()?.trim().split(",") ?? [],
  },
  Website: {
    prop: "website",
    type: String,
  },
  Category: {
    prop: "categories",
    type: String,
    parse: (value) => {
      let splittedValue = value.toString()?.trim()?.split(",") ?? [];
      let formattedValue = splittedValue?.map((item) => {
        let vl = SERVICE_CATEGORY_TYPES.find(
          (el) => el.label.trim() === item.trim()
        )?.value;
        return vl;
      });

      return formattedValue;
    },
  },
};

type Props = {
  run: () => void;
};
export const Toolbar = ({ run }: Props) => {
  const [importedData, setImportedData] = useState<MerchantService[]>([]);
  const [loading, setLoading] = useState(false);

  const importFile = async (file: RcFile) => {
    if (!file) return "";
    const json = await excelToJson<MerchantService>(file, SCHEMA);
    if (json?.some((item: MerchantService) => !isServiceDataValid(item))) {
      notification.warning({
        message: "Мэдээллээ бүрэн оруулна уу!",
      });
      return null;
    }
    setImportedData(json || []);
  };

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <ImportButton
          size="large"
          importFile={async (file) => {
            setLoading(true);
            await importFile(file);
            setLoading(false);
          }}
          loading={loading}
        />
        <ExportButton
          onClick={async () => {
            await exportFromTable(
              ["Manually added"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
        <a href="/file/merchant-template.xlsx">
          <ExportButton title="Download template" />
        </a>
      </div>
      <ImportService
        open={importedData.length > 0}
        onCancel={() => setImportedData([])}
        details={importedData}
        onFinish={() => {
          setImportedData([]);
          run();
        }}
      />
    </>
  );
};
