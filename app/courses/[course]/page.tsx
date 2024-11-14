import CourseDetails from "@/components/CourseDetails";
import { getCourseById } from "@/services/apiCourses";
export const revalidate = 0;

async function page({ params }: { params: { course: string } }) {
  const courseId = +params.course;
  const course = await getCourseById(courseId);
  return (
    <div>
      <CourseDetails course={course} />
    </div>
  );
}

export default page;
