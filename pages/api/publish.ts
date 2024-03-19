import type { NextApiRequest, NextApiResponse } from "next";
import { setTxHash } from "../../lib/firebaseAdmin";
import { sendEmail } from "../../lib/mail";
import { MailParams } from "../../types/mail";
import { CreateLotterySchema } from "../../types/request";

// Mocks functions
const exists = (str: string) => {
  return true;
};

const simulateLottery = (_any: any) => {
  return true;
};

const createLottery = (_any: any) => {
  return {
    hash: "string",
  };
};

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
    if (await exists(body.name)) {
      throw new Error("Lottery Already exists");
    }

    console.info("Simulate Lottery...");
    const winners: string[] = Object.values(await simulateLottery(body));

    const params: MailParams = {
      email: "agustin@lacrypta.com.ar",
      fullname: "Agustin Kassis",
      winners,
    };

    console.info("Creating Lottery...");
    const tx = await createLottery(body);

    await setTxHash(tx.hash);

    await sendEmail(params);

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
