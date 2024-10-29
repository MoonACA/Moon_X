import { createGetUser } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";

function useUser(walletAddress: string | undefined) {
  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", walletAddress],
    queryFn: () => {
      if (!walletAddress) throw new Error("Please connect yout waller");

      return createGetUser({ walletAddress });
    },
  });

  return { user, isPending, error };
}

export { useUser };
