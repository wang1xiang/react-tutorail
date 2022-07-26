const quickToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDc1NDAwNTQ3NzUwMjYwNzM3IiwiZXhwIjoxNjU4NDExNTc0LCJzdG9yZUlkIjo1ODMsImlhdCI6MTY1ODM2ODM3NCwidXNlcklkIjoxNDc1NDAwNTQ3NzUwMjYwNzM3LCJzdGFmZklkIjoxNTMzNzcyNTMxMzgxMjMxNjE4fQ.QWhFH3w3CqHnSk1giQcRAOKRYE4xteYEA1UiRdCqE0I";
export default quickToken;
const SYSTEM_PARAMS_PREFIX = 'account';
export const generateSystemParam = (sourceData: any) => {
  const systemObj: any = {};
  if (!Array.isArray(sourceData) || !sourceData.length) {
    return new Set();
  };
  sourceData.forEach(item => {
    const { fieldName, fieldDesc: name } = item;
    systemObj[fieldName] = { value: `[${SYSTEM_PARAMS_PREFIX}.${fieldName}]`, name };
  });
  return systemObj;
}

export const uploadImage = (file: File | Blob, done: Function) => {
  const data = new FormData();
  data.append("file", file);
  data.append("mainModule", "ma");
  data.append("subModule", "template");
  data.append("feature", "");
  uploadFile(data, done);
};
export const uploadFile = async (data: FormData, done: Function) => {
  return fetch("/robot-configuration/api/file/uploadFile", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "quick-token": quickToken
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => done({ progress: 100, url: res.data }));
};
export const getSystemParam = async () => {
  return fetch("https://app-test.quickcep.com/cdp-analysis/api/store/user/prop/setting/get/583", {
    method: "get",
    headers: {
      Accept: "application/json",
      "quick-token": quickToken
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => res?.data);
};