import { useMutation } from "@tanstack/react-query";
import { createQuiz as createQuizApi, Quiz } from "@/services/apiQuiz";
import { toast } from "react-toastify";
import { useUpdateCourse } from "../course/useUpdateCourse";
import { useParams } from "next/navigation";

function useCreateQuiz() {
  const { updateCourse } = useUpdateCourse();
  const { course } = useParams();
  const { mutate: createQuiz, isPending } = useMutation({
    mutationFn: (quizes: Quiz[]) => createQuizApi(quizes, Number(course)),

    onSuccess: () => {
      updateCourse(
        { id: Number(course), updates: { quizAvailable: true } },
        { onSuccess: () => toast.success("Quizes added successfully") }
      );
    },

    onError: () => toast.error("Error adding quizes"),
  });

  return { createQuiz, isPending };
}

export { useCreateQuiz };
