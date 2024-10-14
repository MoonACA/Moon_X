import { Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { parseEther } from "viem";
import MoonxABI from "../abi/moonx.json";

const moonXContractAddress = "0xe6074354ae7529D6C9f301BE217440bF098Ee799";

async function createCourse(
  writeContractFunc: WriteContractMutate<Config, unknown>,
  args: { metadataUri: string }
) {
  try {
    writeContractFunc({
      address: moonXContractAddress,
      abi: MoonxABI.output.abi,
      functionName: "createCourse",
      args: [args.metadataUri],
      value: parseEther("0.75"),
    });
  } catch (error) {
    console.log("Error create course - createCourse()", error);
  }
}

export { createCourse };
