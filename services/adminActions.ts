"use server";

import { revalidatePath } from "next/cache";
import { getCourseById, updateCourse } from "./apiCourses";

async function updateCourseAction(updates: string, courseId: string) {
  // check if user is an admin

  //. ....

  const update = JSON.parse(updates);
  const course = await getCourseById(Number(courseId));

  await updateCourse(Number(courseId), update);
  revalidatePath("/admin");
}

export { updateCourseAction };
