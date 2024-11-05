import { getCourseById } from "@/services/apiCourses";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

function useCourse(id: number) {
  const {
    data: course,
    isPending,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => await getCourseById(id),
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return { course, isPending };
}

export { useCourse };
