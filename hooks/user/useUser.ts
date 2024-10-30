import { createGetUser } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return { user, isPending, error };
}

export { useUser };
