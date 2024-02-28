import { LaboratoryType } from "service/laboratory_tests/type";

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
  console.log(data, "data");
  console.log(Object?.values(value), "value");
  console.log(labTest, "labTest");

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
  console.log(struct, "struct");
  // const arrId = data?.reduce((acc: any, obj: any) => {
  //   acc.push(obj.id);
  //   return acc;
  // }, []);
  // const lab = [
  //   {
  //     file_ids: arrId,
  //   },
  // ];
  return struct;
};
