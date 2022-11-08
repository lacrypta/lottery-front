import { ResponseDataType } from "../types/request";

const ajaxCall = async (path: string, data: any): Promise<ResponseDataType> => {
  const res = await fetch("/api/" + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export { ajaxCall };
