import { Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";

import decentralLearningABI from "../abi/decentralLarning.json";
import { Abi } from "viem";

async function createCourse(
  writeContractFunc: WriteContractMutate<Config, unknown>,
  args: { metadataUri: string }
) {
  try {
    await writeContractFunc({
      address: "0x099551b20834FF484f83925700e4411348258328",
      abi: decentralLearningABI as unknown as Abi,
      functionName: "createCourse",
      args: [args.metadataUri],
    });
  } catch (error) {
    console.log("Error create course - createCourse()", error);
  }
}

export { createCourse };
