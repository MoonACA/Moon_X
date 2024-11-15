import AddQuiz from "@/components/AddQuiz";
import { getCourseById } from "@/services/apiCourses";
export const revalidate = 0;
const page = async ({ params }: { params: { course: string } }) => {
  const courseId = params.course;
  const course = await getCourseById(Number(courseId));
  return (
    <div>
      <AddQuiz course={course} />
    </div>
  );
};

export default page;
