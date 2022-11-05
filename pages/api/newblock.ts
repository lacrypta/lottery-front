import type { NextApiRequest, NextApiResponse } from "next";

const request = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  // TODO: Limit user order creation by time
  //   if (req.method !== "POST") {
  //     res
  //       .status(405)
  //       .json({ success: false, message: "Only POST method is allowed" });
  //     return;
  //   }

  console.info("req.method:");
  console.dir(req.method);
  console.info("req.body:");
  console.dir(req.body);
  res.status(200).json({
    success: true,
    data: {
      hola: "hola",
    },
  });
};

export default request;
