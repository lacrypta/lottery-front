import { Contract, ethers } from "ethers";
import LotteryJSON from "@lacrypta/lottery/deployments/matic/Lottery.json";
import { CreateLotteryRequest } from "../types/request";
import { formatUnits, parseUnits } from "ethers/lib/utils";

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
  const gasPrice = await (await provider.getGasPrice()).mul("1");

  const tx = await lotteryContract["create(string,bytes32,uint256,string[])"](
    lottery.name,
    lottery.config.seed,
    lottery.config.numberOfWinners,
    lottery.config.players,
    {
      gasPrice,
    }
  );

  return tx;
}
