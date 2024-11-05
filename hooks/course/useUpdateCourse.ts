import { updateCourse as updateCourseApi } from "@/services/apiCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export function useUpdateCourse(
  setQueryRefetchStatus?: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  const { mutate: updateCourse, isPending: updatingCourse } = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: {} }) =>
      updateCourseApi(id, updates),

    onSuccess: () => {
      setQueryRefetchStatus?.(true);
      queryClient
        .invalidateQueries()
        .then(() => setQueryRefetchStatus?.(false));
    },

    onError: (error) => toast.error(error.message),
  });

  return { updateCourse, updatingCourse };
}
