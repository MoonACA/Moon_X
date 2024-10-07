import { Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { parseEther } from "viem";
import decentralLearningABI from "../abi/decentralLarning.json";

const moonXContractAddress = "0x099551b20834FF484f83925700e4411348258328";

async function createCourse(
  writeContractFunc: WriteContractMutate<Config, unknown>,
  args: { metadataUri: string }
) {
  try {
    writeContractFunc({
      address: moonXContractAddress,
      abi: decentralLearningABI.output.abi,
      functionName: "createCourse",
      args: [args.metadataUri],
      value: parseEther("0.75"),
    });
  } catch (error) {
    console.log("Error create course - createCourse()", error);
  }
}

export { createCourse };
