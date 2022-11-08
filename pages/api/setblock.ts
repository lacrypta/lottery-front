import type { NextApiRequest, NextApiResponse } from "next";
import { setBlockTarget } from "../../lib/firebaseAdmin";
import { SetBlockNumberSchema } from "../../types/request";

const request = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }
  let body;
  try {
    body = SetBlockNumberSchema.parse(req.body);
  } catch (e: any) {
    console.dir(e.message);
    res.status(405).json({ success: false, message: "Invalid schema" });
    return;
  }
  try {
    if (process.env.PASSWORD !== body.password) {
      throw new Error("Invalid Password");
    }

    await setBlockTarget(body.blockNumber);

    res.status(200).json({
      success: true,
    });
  } catch (e: any) {
    console.dir(e.message);
    res.status(405).json({ success: false, message: e.message });
    return;
  }
};

export default request;
