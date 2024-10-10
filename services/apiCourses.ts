import supabase, { supabaseUrl } from "./supabase";

export interface Course {
  id?: number;
  creatorId: number;
  title: string;
  description: string;
  thumbnail: File | string;
  fullText: string;
  videoUrl: File | string;
}

async function createCourse(newCourse: Course): Promise<Course> {
  if (
    typeof newCourse.videoUrl == "string" ||
    typeof newCourse.thumbnail == "string"
  )
    throw new Error("video must be of type File");

  const videoName = `${Math.random()}-${newCourse.videoUrl.name}`
    .replaceAll("/", "")
    .replaceAll(" ", "");

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

  await uploadVideo(newCourse, course, videoName);

  return course;
}

async function uploadVideo(
  newCourse: Course,
  course: Course,
  videoName: string
) {
  const { error: storageError } = await supabase.storage
    .from("videos")
    .upload(videoName, newCourse.videoUrl);

  if (storageError) {
    await supabase.from("courses").delete().eq("id", course.id);
    throw new Error(`Error uploading video ${storageError}`);
  }
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
    await supabase.from("courses").delete().eq("id", course.id);
    throw new Error("Error uploading thumbnail ");
  }
}

async function getCourses() {
  const { data: courses, error } = await supabase.from("courses").select("*");
  if (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
  return courses;
}

export { createCourse, getCourses };
