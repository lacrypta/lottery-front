import type { NextApiRequest, NextApiResponse } from "next";
import { createLottery } from "../../lib/blockchain";
import { CreateLotterySchema } from "../../types/request";

const request = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }
  let body;
  try {
    body = CreateLotterySchema.parse(req.body);
  } catch (e: any) {
    console.dir(e.message);
    res.status(405).json({ success: false, message: "Invalid schema" });
    return;
  }

  console.info("Body:");
  console.dir(body);

  const tx = await createLottery(body);

  res.status(200).json({
    success: true,
    data: {
      hash: tx.hash,
    },
  });
};

export default request;
