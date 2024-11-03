import { Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { parseEther } from "viem";
import MoonxABI from "../abi/moonx.json";

const moonXContractAddress = "0x520D318254F38823109a1333269D1F2088c0c56A";

function writeToContract(
  writeContractFunc: WriteContractMutate<Config, unknown>,
  options: {
    functionName: string;
    args?: any[];
    value?: string;
  }
) {
  writeContractFunc({
    address: moonXContractAddress,
    abi: MoonxABI.abi,
    functionName: options.functionName,
    args: options.args || [],
    value: parseEther(options.value || ""),
  });
}

export { writeToContract, moonXContractAddress };
