import { LaboratoryType } from "service/laboratory_tests/type";
import { LaboratoryTests } from "service/social-worker/customer/type";

export const arrToObj = (data: any, value: any) => {
  if (!data || !value) {
    return;
  }
  const array = Object.keys(value)?.map((el, i) => {
    return {
      [el]: [data[i].id],
    };
  });
  const docsObject = array.reduce((acc, obj) => {
    return Object.assign(acc, obj);
  }, {});
  return docsObject;
};

export const labFormat = (data: any, value: any, labTest: any) => {
  if (!data || !value) {
    return;
  }
  let count = 0;
  const struct = Object?.values(value)?.reduce(
    (acc: any, el: any, key: number) => {
      acc.push({
        file_ids: el?.reduce((acc: any, obj: any) => {
          acc.push(data[count]?.id);
          count++;
          return acc;
        }, []),
        laboratory_test_id: labTest[key]?.id,
      });
      return acc;
    },
    []
  );
  return struct;
};

export const labFormatUpdate = (data: any, labTests: any) => {
  const values = Object.values(data || {});
  const result = values?.reduce((acc: any, obj: any, index: number) => {
    // if
    acc.push({
      file_ids: obj?.map((val: any) => val),
      laboratory_test_id: labTests?.[index]?.id,
    });
    return acc;
  }, []);
  return result;
};

export const filterLabTest = (id: number, data: LaboratoryTests[]) => {
  let result = data
    ?.find((value, index) => value?.laboratory_test_id === id)
    ?.files?.map((val, index) => ({
      uid: `${val?.id}`,
      name: val?.original_name || "",
      status: "done",
      url: `https://adb-view.qpartners.tech/${val?.physical_path}`,
      size: val?.file_size || 0,
    }));
  return result;
  // return (
  //   result || [
  //     { uid: "0", name: "file.pdf", status: "done", url: "", size: 123 },
  //   ]
  // );
};
