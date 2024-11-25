import { getEnrolledCoursesAction } from "@/services/actions";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

function useEnrolledCourses() {
  const { address } = useAccount();

  const {
    data: enrolledCourses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enrolledCourses", address],
    queryFn: async () => {
      if (!address) throw new Error("Please connect your wallet");

      return await getEnrolledCoursesAction(address);
    },
  });

  return { enrolledCourses, error, isLoading };
}

export { useEnrolledCourses };
