import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { BtnCancel, BtnSubmit } from "./Btn";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import { Course } from "@/services/apiCourses";
import { createGetUser } from "@/services/apiUsers";
import { useCreateCourse } from "@/hooks/course/useCreateCourse";
import { toast } from "react-toastify";
import { useUppyState } from "@uppy/react";
import uppy from "@/services/uppy";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddQuiz = () => {
  const [questions, setQuestions] = useState(
    Array(5).fill({ question: "", options: ["", "", "", ""], answer: "" })
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | string>();
  const [videoFile, setVideoFile] = useState<File>();
  const { address } = useAccount();
  const totalProgress = useUppyState(uppy, (state) => state.totalProgress);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) return toast.error("wallet not connected");

    const user = await createGetUser({ walletAddress: address });
    if (!user) return toast.error("user not found");
    if (!thumbnailFile || !videoFile)
      return toast.error("Add a thumbnail and the course video");
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const {
    isCreating,
    isPending,
    isSuccess,
    isError,
    error: concError,
    createCourse,
    createdCourse,
  } = useCreateCourse(setOpenUploadModal);

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
            />
            <label className="text-white block mb-1 mt-2">Options</label>
            {question.options.map((option: string, optionIndex: number) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
                className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg w-full mt-1"
                placeholder={`Option ${optionIndex + 1}`}
              />
            ))}
            <label className="text-white block mb-1 mt-2">Correct Answer</label>
            <input
              type="text"
              value={question.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg w-full"
              placeholder="Enter correct answer"
            />
          </div>
        ))}

        <div className="flex items-center justify-between mt-[1rem]">
          <BtnCancel text="Cancel" />
          {isCreating ? (
            <div className="w-52 mb-5 rounded-lg text-white text-center">
              <p className="text-sm z-50">Creating...</p>
              <progress max={100} value={totalProgress} />
            </div>
          ) : (
            <BtnSubmit text="Submit Quiz Questions" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
function setOpenUploadModal(value: SetStateAction<boolean>): void {
  throw new Error("Function not implemented.");
}
