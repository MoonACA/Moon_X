import { deleteCourse as deleteCourseApi } from "@/services/apiCourses";
import { useMutation } from "@tanstack/react-query";

function useDeleteCourse() {
  const { isPending, mutate: deleteCourse } = useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => console.log("Deletion successfull"),
    onError: (error) => console.log(error),
  });

  return { deleteCourse };
}

export default useDeleteCourse;
