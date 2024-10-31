import { useQuery } from "@tanstack/react-query";
import { FilterType, getCourses } from "@/services/apiCourses";
import { useSearchParams } from "next/navigation";

export function useCourses() {
  const params = useSearchParams();
  const statusRaw = params.get("status");

  const status = statusRaw == "pending" ? false : true;

  const filterObject: FilterType = {
    field: "approved",
    value: status,
  };

  const filter = statusRaw !== null ? filterObject : undefined;

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses", filter],
    queryFn: () => getCourses(filter),
  });

  return { courses, isLoading, error };
}
