import React, { FormEvent, useState } from "react";
import { BtnCancel, BtnSubmit } from "./Btn";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { CorrectAnswerType, Quiz } from "@/services/apiQuiz";
import { useCreateQuiz } from "@/hooks/quiz/useCreateQuiz";
import { useCourse } from "@/hooks/course/useCourse";
import { ClipLoader } from "react-spinners";
import { useUpdateCourse } from "@/hooks/course/useUpdateCourse";
const AddQuiz = () => {
  const [questions, setQuestions] = useState(
    Array(5).fill({ question: "", options: ["", "", "", ""], answer: "A" })
  );
  const [refetchstatus, setRefetchStatus] = useState(false);
  const { course: courseId } = useParams();
  const { address } = useAccount();

  const { createQuiz, isPending: isCreating } = useCreateQuiz();
  const { course, isPending: isLoading } = useCourse(Number(courseId));
  const { updatingCourse } = useUpdateCourse(setRefetchStatus);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!address) return toast.error("wallet not connected");
    if (!course) return toast.error(`Failed to fetch course #${courseId}`);

    if (!courseId)
      return toast.error("trying to submit outside the course route");

    if (course.quizAvailable)
      return toast.success("Quiz has been added for this course");

    const quizes: Quiz[] = questions.map((question, index) => {
      const newObj: Quiz = {
        question: question.question,
        courseId: Number(courseId),
        A: question.options[0],
        B: question.options[1],
        C: question.options[2],
        D: question.options[3],
        correctAnswer: question.answer,
      };

      return newObj;
    });

    createQuiz(quizes);
  }

  const handleQuestionChange = (id: number, value: string) => {
    const newQuestions = questions.map((question, index) =>
      index == id ? { ...question, question: value } : question
    );
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuizes = questions.map((question, index) => {
      if (index == questionIndex) {
        const options = question.options.map((op: any, i: number) =>
          i == optionIndex ? value : op
        );

        return { ...question, options };
      }
      return question;
    });
    setQuestions(newQuizes);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newQuestions = questions.map((question, i) =>
      i == index ? { ...question, answer: value } : question
    );
    setQuestions(newQuestions);
  };

  return (
    <div className="bg-[#192A41] p-[1rem] rounded-xl border border-white">
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mt-5">
            <label
              className="text-white block mb-1"
              htmlFor={`question-${index}`}
            >
              Question {index + 1}
            </label>
            <input
              type="text"
              id={`question-${index}`}
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg w-full"
              placeholder="Enter question"
              required
            />
            <label className="text-white block mb-1 mt-2">Options</label>
            {question.options.map((option: string, optionIndex: number) => (
              <input
                key={optionIndex}
                type="text"
                id={`option-${optionIndex}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
                className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg w-full mt-1"
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
            ))}
            <label className="text-white block mb-1 mt-2">Correct Answer</label>

            <select
              value={question.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="bg-transparent border-[1px] text-gray-500 w-[50px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 focus:ring-offset-[#192A41]"
              required
            >
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"C"}>C</option>
              <option value={"D"}>D</option>
            </select>
          </div>
        ))}

        <div className="flex items-center justify-between mt-[1rem]">
          <BtnCancel text="Cancel" />

          <BtnSubmit
            text={
              !isCreating && !isLoading && !updatingCourse && !refetchstatus ? (
                "Submit Quiz Questions"
              ) : (
                <ClipLoader color="#fff" size={20} />
              )
            }
            disabled={
              isCreating || updatingCourse || isLoading || refetchstatus
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
