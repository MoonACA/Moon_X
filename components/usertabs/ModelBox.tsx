'use client';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { Dialog } from '@mui/material';
import { CiWarning } from 'react-icons/ci';
import { data } from '@/public/assets/data';
import Badge from '@/public/assets/Badge.png';
import Image from 'next/image';
// Define the type for the data structure
type QuestionData = {
  question: string;
  options: string[];
  ans?: number;
};

type CourseDialogProps = {
  open: boolean;
  onClose: () => void;
};

const CourseDialog: React.FC<CourseDialogProps> = ({ open, onClose }) => {
  // State to keep track of the current question index
  const [index, setIndex] = useState<number>(0);
  // State to keep track of the current question
  const [question, setQuestion] = useState<QuestionData>(data[index]);
  // State to store the selected answers
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  // State to handle completion modal
  const [completed, setCompleted] = useState<boolean>(false);
  // State to handle the confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleOptionClick = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextClick = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setQuestion(data[index + 1]);
    } else {
      setCompleted(true);
    }
  };

  const handleReviewQuiz = () => {
    setCompleted(false);
    setIndex(0);
    setQuestion(data[0]);
  };

  const handleCloseAttempt = () => {
    setConfirmOpen(true);
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setQuestion(data[index - 1]);
    }
  };
  const handleConfirmClose = () => {
    // Here, you could save the user's progress if needed
    setConfirmOpen(false);
    onClose(); // Close the dialog and submit the progress
  };

  const handleCancelClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseAttempt}
        PaperProps={{
          sx: {
            width: { xs: '500px', md: '400px' }, // Adjust the width to make it more square-like
            maxHeight: { xs: '600px', md: '600px' }, // Adjust the height
            borderRadius: '16px', // Optional: round the corners
          },
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <IoIosArrowBack
              className={`text-blue-600 h-5 w-5 text-sm cursor-pointer rounded-full ${
                index === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handlePrev}
            />
            <IoIosClose
              className="text-blue-600 h-5 w-5 text-lg cursor-pointer rounded-full"
              onClick={handleCloseAttempt}
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">{`Question ${
              index + 1
            }`}</h2>
            <p className="text-gray-700">{question.question}</p>
          </div>
          <div className="mb-4">
            <ul className="space-y-2 text-sm text-gray-800">
              {question.options.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`border p-2 rounded-md cursor-pointer ${
                    selectedAnswers[index] === idx
                      ? 'bg-orange-500 text-white'
                      : 'hover:text-white hover:bg-orange-500'
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              className="py-2 rounded-lg px-6 text-white bg-gradient-to-r from-[#EB7568] via-[#FAB142] to-[#FAB142]"
              onClick={handleNextClick}
            >
              {index < data.length - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={completed}
        onClose={onClose}
        PaperProps={{
          sx: { borderRadius: '16px' },
        }}
      >
        <div className="p-9">
          <div className="text-center text-black font-semibold text-base">
            <div className="flex items-center justify-center mb-2">
              <Image src={Badge} alt={'Badge'} />
            </div>
            <h3 className="">Congratulations you passed</h3>
            <p>You have been rewarded with 10 mands</p>
          </div>
          <div className="flex justify-between items-center mt-5 ">
            <button
              className="border border-[#EB7568] rounded-md py-2 px-2 text-[#EB7568] bg-white"
              onClick={handleReviewQuiz}
            >
              Review Quiz
            </button>
            <button
              className="py-2 rounded-lg px-8 text-white bg-gradient-to-r from-[#EB7568] via-[#FAB142] to-[#FAB142]"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={handleCancelClose}
        PaperProps={{
          sx: { borderRadius: '16px' },
        }}
      >
        <div className="p-4 relative grid place-items-center">
          <CiWarning className="md:mt-5 text-[#EB7568] text-6xl" />
          <div className="mt-4">
            <p className="md:px-5 text-center text-black font-semibold text-base">
              Are You Sure you want to submit the Quiz?
            </p>
          </div>

          <button className="mt-4 w-[90%] py-1 text-white rounded-md bg-gradient-to-r from-[#EB7568] via-[#FAB142] to-[#FAB142]">
            Submit
          </button>

          <div
            onClick={handleConfirmClose}
            className="absolute top-[10%] left-[85%]"
          >
            <IoIosClose
              className="text-blue-600 h-5 w-5 text-lg cursor-pointer rounded-full"
              onClick={handleCancelClose}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CourseDialog;
