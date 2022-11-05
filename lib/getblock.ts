const url = "https://btc.getblock.io/mainnet/";

const request = async (method: string, params: any[], apiKey: string) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      method,
      params,
    }),
  };
  const response = await fetch(url, options);
  return (await response.json()).result;
};

export const getBlockCount = async (apiKey: string): Promise<number> => {
  console.info("getBlockCount");
  return await request("getblockcount", [], apiKey);
};

export const getBlockHash = async (
  blockHeight: number,
  apiKey: string
): Promise<string> => {
  console.info("getBlockHash");
  return await request("getblockhash", [blockHeight], apiKey);
};
