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
import {
  createGetUser,
  getUserByWalletAddress,
  updateUser,
  User,
} from "./apiUsers";
import supabase from "./supabase";
import { s3MiniUploadFile } from "./s3UploadsMini";
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

  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_ID || "")
    .upload(videoName, data.video, {
      cacheControl: "3600",
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

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

// ENROLL

async function getEnrolledCoursesAction(creator: string) {
  const { user, error } = await getUserByWalletAddress(creator);

  if (error) throw new Error(error.message);

  return user.enrolledCourses;
}

async function updateEnrollCoursesAction(creator: string, courseId: string) {
  const { user, error } = await getUserByWalletAddress(creator);

  if (error) throw new Error(error.message);

  const enroll = user.enrolledCourses ? user.enrolledCourses : [];
  if (!enroll.includes(Number(courseId))) {
    await supabase
      .from("creators")
      .update({
        enrolledCourses: [...enroll, Number(courseId)],
      })
      .eq("walletAddress", creator);

    revalidatePath("/courses");
    revalidatePath(`/userprofile/${creator}`);
  }
}

export {
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  createQuizAction,
  createGetUserAction,
  updateUserAction,
  getEnrolledCoursesAction,
  updateEnrollCoursesAction,
};
