import { Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { parseEther } from "viem";
import MoonxABI from "../abi/moonx.json";

const moonXContractAddress = "0x520D318254F38823109a1333269D1F2088c0c56A";

async function createCourse(
  writeContractFunc: WriteContractMutate<Config, unknown>,
  args: { metadataUri: string }
) {
  try {
    writeContractFunc({
      address: moonXContractAddress,
      abi: MoonxABI.abi,
      functionName: "createCourse",
      args: [args.metadataUri],
      value: parseEther("0.75"),
    });
  } catch (error) {
    console.log("Error create course - createCourse()", error);
  }
}

export { createCourse };
