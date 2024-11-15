import { getCourses } from "@/services/apiCourses";
import Card from "./Card";

async function CourseList() {
  const courses = await getCourses();
  return (
    <div className=" grid grid-cols-4 mx-auto gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
      {courses &&
        courses.map((course, index) => <Card course={course} key={index} />)}
    </div>
  );
}

export default CourseList;
