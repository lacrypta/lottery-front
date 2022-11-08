import { ILottery } from "@lacrypta/lottery/typechain-types";
import z from "zod";

export interface CreateLotteryRequest {
  name: string;
  config: ILottery.ConfigStruct;
}

export const CreateLotterySchema = z.object({
  name: z.string(),
  config: z.object({
    seed: z.string(),
    numberOfWinners: z.number(),
    players: z.array(z.string()),
  }),
});
