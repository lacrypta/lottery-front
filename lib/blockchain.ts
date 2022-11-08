import { Contract, ethers } from "ethers";
import LotteryJSON from "@lacrypta/lottery/deployments/matic/Lottery.json";
import { CreateLotteryRequest } from "../types/request";

// contract details
const RPC_ADDRESS = process.env.NEXT_PUBLIC_RPC_ADDRESS || "";
const CALLER_PRIVATE_KEY = process.env.CALLER_PRIVATE_KEY || "";

const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS);
const signer = new ethers.Wallet(CALLER_PRIVATE_KEY, provider);

// Token Contract
const lotteryContract = new Contract(
  LotteryJSON.address,
  LotteryJSON.abi,
  signer
);

export async function createLottery(lottery: CreateLotteryRequest) {
  const gasPrice = await (await provider.getGasPrice()).mul("2");

  const tx = await lotteryContract.create(lottery.name, lottery.config, {
    gasPrice,
  });
  return tx;
}
