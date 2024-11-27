import supabase, { supabaseUrl } from "./supabase";
import uppy from "./uppy";

export interface ICourse {
  creatorAddress: string;
  title: string;
  description: string;
  contractId: number;
  category?: string;
  thumbnail: File;
  fullText: string;
  video: File;
}

export type Course = {
  id: number;
  creatorAddress: string;
  title: string;
  description: string;
  contractId: number;
  category: string;
  thumbnail: File | string;
  fullText: string;
  video: string;
  approved: boolean;
  quizAvailable: boolean;
  created_at: string;
  creators: {
    displayName: string | null;
    fullName: string | null;
    profifilePicture: string | null;
  };
};

async function createCourse(
  newCourse: ICourse,
  videoName: string
): Promise<Course> {
  const videoPath = `${supabaseUrl}/storage/v1/object/public/videos/${videoName}`;

  const thumbnailName = `${Math.random()}-${newCourse.thumbnail.name}`
    .replaceAll("/", "")
    .replaceAll(" ", "");

  const thumbnailPath = `${supabaseUrl}/storage/v1/object/public/thumbnails/${thumbnailName}`;

  const { data: course, error } = await supabase
    .from("courses")
    .insert([{ ...newCourse, video: videoPath, thumbnail: thumbnailPath }])
    .select()
    .single();

  if (error) {
    await supabase.storage
      .from(process.env.SUPABASE_BUCKET_ID || "")
      .remove([videoName]);
    throw new Error(`Error creating course: ${error.message}`);
  }

  await uploadThumbnail(newCourse, course, thumbnailName);

  return course;
}

async function uploadThumbnail(
  newCourse: ICourse,
  course: Course,
  thumbnailName: string
) {
  const { error: storageError } = await supabase.storage
    .from("thumbnails")
    .upload(thumbnailName, newCourse.thumbnail);

  if (storageError) {
    await deleteCourse(course.id!);
    throw new Error("Error uploading thumbnail ");
  }
}

export type FilterType = {
  field: string;
  value: boolean;
};

async function getCourses(filter?: FilterType): Promise<Course[]> {
  let query = supabase
    .from("courses")
    .select("*, creators(fullName, displayName, profilePicture)");

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  const { data: courses, error } = await query;

  if (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }

  return courses;
}

async function getCourseById(id: number): Promise<Course> {
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching course #${id}: ${error.message}`);
  }

  return course;
}

async function getCoursesByIds(ids: number[] | undefined): Promise<Course[]> {
  if (!ids) return [];
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .in("id", [ids]);

  if (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }

  return courses;
}

async function getUserCourses(walletAddress: string): Promise<Course[]> {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("creatorAddress", walletAddress);

  if (error) {
    throw new Error(`Error get user created courses: ${error}`);
  }

  return courses;
}

async function deleteCourse(id: number) {
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting course id: ${id}`);
  }
}

async function updateCourse(id: number, updates: {}) {
  const { error } = await supabase.from("courses").update(updates).eq("id", id);

  if (error) {
    throw new Error(`Error updating course id: ${id}`);
  }
}

export {
  createCourse,
  getCourses,
  getCourseById,
  getCoursesByIds,
  getUserCourses,
  deleteCourse,
  updateCourse,
};
