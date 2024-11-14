"use server";

import { revalidatePath } from "next/cache";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  ICourse,
  updateCourse,
} from "./apiCourses";
import { createQuiz, Quiz } from "./apiQuiz";
import { createGetUser, updateUser, User } from "./apiUsers";
import supabase from "./supabase";
import { s3UploadFile } from "./s3Uploads";

// USER
async function createGetUserAction(userData: string) {
  const user: User = JSON.parse(userData);

  const data = await createGetUser(user);

  return data;
}

async function updateUserAction(formData: FormData) {
  const user: User = {
    walletAddress: String(formData.get("walletAddress")),
    displayName: String(formData.get("displayName")),
    bio: String(formData.get("bio")),
    profilePicture: formData.get("profilePicture") as File,
  };

  // console.log(user, formData);
  await updateUser(user);

  revalidatePath(`/settings/${user.walletAddress}`);
}

// COURSE
const TABLE_NAME = "creators";

async function createCourseAction(formData: FormData, videoName: string) {
  let data: ICourse = {
    creatorAddress: String(formData.get("creatorAddress")),
    title: String(formData.get("title")),
    fullText: String(formData.get("notes")),
    description: String(formData.get("description")),
    video: formData.get("video") as File,
    thumbnail: formData.get("thumbnail") as File,
    contractId: Number(formData.get("contractId")),
  };

  const creator = data.creatorAddress;

  console.log(data);

  const newUser: User = {
    walletAddress: creator,
  };

  let { data: user } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq("walletAddress", creator)
    .single();

  if (!user) {
    await supabase.from(TABLE_NAME).insert([{ newUser }]).select().single();
  }

  await s3UploadFile(data.video, videoName);

  const course = await createCourse(data, videoName);

  revalidatePath("/courses");

  return course;
}

async function updateCourseAction(
  updates: string,
  courseId: string,
  creator: string
) {
  const update = JSON.parse(updates);
  const course = await getCourseById(Number(courseId));

  if (course.creatorAddress !== creator)
    throw new Error("You are not allowed to update this course");

  await updateCourse(Number(courseId), update);
}

async function deleteCourseAction(courseId: string, creator: string) {
  const course = await getCourseById(Number(courseId));

  if (course.creatorAddress !== creator)
    throw new Error("You are not allowed to delete this course");

  await deleteCourse(Number(courseId));
}

// QUIZ
async function createQuizAction(
  quizData: string,
  courseId: string,
  creator: string
) {
  const quiz: Quiz[] = JSON.parse(quizData);

  const course = await getCourseById(Number(courseId));

  if (course.creatorAddress !== creator)
    throw new Error("You are not allowed to add quiz to this course");

  await createQuiz(quiz, Number(courseId));

  await updateCourse(Number(courseId), { quizAvailable: true });
  revalidatePath(`/courses/${courseId}/add-quiz`);
}

export {
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  createQuizAction,
  createGetUserAction,
  updateUserAction,
};
