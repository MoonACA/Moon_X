import { useReadContract } from "wagmi";
import moonXAbi from "../abi/moonx.json";
import { moonXContractAddress } from "@/services/moonXContract";

function useContract(functionName: string) {
  const { refetch, data, isError } = useReadContract({
    abi: moonXAbi.abi,
    address: moonXContractAddress,
    functionName,
    query: { notifyOnChangeProps: ["data"] },
  });

  return { data, isError, refetch };
}

export { useContract };
