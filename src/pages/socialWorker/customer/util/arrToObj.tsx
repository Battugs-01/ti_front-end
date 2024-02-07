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

export const labFormat = (data: any, value: any) => {
  if (!data || !value) {
    return;
  }
  const arrId = data?.reduce((acc: any, obj: any) => {
    acc.push(obj.id);
    return acc;
  }, []);
  const lab = [
    {
      file_ids: arrId,
    },
  ];
  return lab;
};
