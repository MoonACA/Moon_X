import { updateCourse as updateCourseApi } from "@/services/apiCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  const { mutate: updateCourse, isPending: updatingCourse } = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: {} }) =>
      updateCourseApi(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (error) => toast.error(error.message),
  });

  return { updateCourse, updatingCourse };
}
