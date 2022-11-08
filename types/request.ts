import { ILottery } from "@lacrypta/lottery/typechain-types";
import z from "zod";

export type ResponseDataType = {
  success: boolean;
  message?: string;
  data?: any;
};

export interface CreateLotteryRequest {
  name: string;
  config: ILottery.ConfigStruct;
}

export interface SetBlockNumber {
  password: string;
  blockNumber: number;
}

export const CreateLotterySchema = z.object({
  name: z.string(),
  config: z.object({
    seed: z.string(),
    numberOfWinners: z.number(),
    players: z.array(z.string()),
  }),
});

export const SetBlockNumberSchema = z.object({
  password: z.string(),
  blockNumber: z.number(),
});
