import supabase from "./supabase";

export type OptionType = {
  A: string;
  B: string;
  C: string;
  D: string;
};

type CorrectAnswerType = keyof OptionType;

export interface Quiz extends OptionType {
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
