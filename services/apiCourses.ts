import supabase, { supabaseUrl } from "./supabase";
import uppy from "./uppy";

export interface Course {
  id?: number;
  creatorAddress: string;
  title: string;
  description: string;
  category?: string;
  thumbnail: File | string;
  fullText: string;
  videoUrl: File | string;
  approved?: boolean;
  created_at: string;
  creators?: {
    displayName: string | null;
    fullName: string | null;
    profifilePicture: string | null;
  };
}

async function createCourse(
  newCourse: Course,
  videoName: string
): Promise<Course> {
  if (
    typeof newCourse.videoUrl == "string" ||
    typeof newCourse.thumbnail == "string"
  )
    throw new Error("video must be of type File");

  const videoPath = `${supabaseUrl}/storage/v1/object/public/videos/${videoName}`;

  const thumbnailName = `${Math.random()}-${newCourse.thumbnail.name}`
    .replaceAll("/", "")
    .replaceAll(" ", "");

  const thumbnailPath = `${supabaseUrl}/storage/v1/object/public/thumbnails/${thumbnailName}`;

  const { data: course, error } = await supabase
    .from("courses")
    .insert([{ ...newCourse, videoUrl: videoPath, thumbnail: thumbnailPath }])
    .select()
    .single();

  if (error) {
    throw new Error("Error creating course");
  }

  await uploadThumbnail(newCourse, course, thumbnailName);

  await uppy.upload(); // upload video

  return course;
}

async function uploadThumbnail(
  newCourse: Course,
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

async function getCourses(filter: FilterType | undefined): Promise<Course[]> {
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

async function deleteCourse(id: number) {
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting course id: ${id}`);
  }
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

export { createCourse, getCourses, deleteCourse };
