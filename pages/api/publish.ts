import type { NextApiRequest, NextApiResponse } from "next";
import { createLottery } from "../../lib/blockchain";
import { setTxHash } from "../../lib/firebaseAdmin";
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
    res.status(406).json({ success: false, message: "Invalid schema" });
    return;
  }
  try {
    console.info("Creating Lottery...");
    const tx = await createLottery(body);

    await setTxHash(tx.hash);
    res.status(200).json({
      success: true,
      data: {
        hash: tx.hash,
      },
    });
  } catch (e: any) {
    console.dir(e.message);
    res.status(500).json({ success: false, message: "Tx unprocessed" });
    return;
  }
};

export default request;
