import { useMutation } from "@tanstack/react-query";
import { createCourse as createCourseApi } from "@/services/apiCourses";

export function useCreateCourse() {
  const { isPending: isCreating, mutate: createCourse } = useMutation({
    mutationFn: createCourseApi,

    onSuccess: () => {
      console.log("Course created successfully");
    },

    onError: (error) => console.log(error.message),
  });

  return { isCreating, createCourse };
}
