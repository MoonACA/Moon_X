import supabase from "./supabase";

type OptionType = {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};

type CorrectAnswerType = keyof OptionType;

interface Quiz extends OptionType {
  id?: number;
  courseId: number;
  question: string;
  correctAnswer: CorrectAnswerType;
}

async function createQuiz(newQuizes: Quiz[], courseId: number) {
  const { data: quizes, error } = await supabase
    .from("quizes")
    .insert([...newQuizes])
    .select();

  if (error) {
    throw new Error("Error creating quiz");
  }

  return quizes;
}

async function getQuizes(courseId: number) {
  const { data: quizes, error } = await supabase
    .from("quizes")
    .select("*")
    .eq("courseId", courseId);

  if (error) {
    throw new Error("Error fetching quizes");
  }
}

export { createQuiz, getQuizes };
