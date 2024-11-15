import { Course } from "@/services/apiCourses";

import BreadCrumbs from "./BreadCrumbs";
import CourseBody from "./CourseBody";
import CourseTop from "./CourseTop";
import Creators from "./Creators";
import GoBack from "./GoBack";
import Rating from "./Rating";

const CourseDetails = ({ course }: { course: Course }) => {
  if (!course) return null;

  return (
    <div>
      <GoBack text="Course details" route="/courses" />
      <div className=" p-[1rem] border border-white rounded-2xl mt-[1rem] bg-[#192A41]">
        <BreadCrumbs text="Development" />

        <CourseTop text={course.title} />

        <p className=" text-sm text-[#aaaaaa] max-sm:text-[0.8rem]">
          {course.description}
        </p>

        <div className="flex justify-between items-center max-md:flex-col gap-3 max-md:items-start">
          <Creators creatorAddress={course.creatorAddress} />
          <Rating />
        </div>

        <div className=" relative w-full h-[20rem] my-[1rem]">
          <iframe
            src={String(course.video)}
            frameBorder={"0"}
            width={"100%"}
            height={"100%"}
          />
        </div>

        <h2 className=" text-xl text-white font-bold mb-[1rem]">Description</h2>
        <CourseBody courseText={course.fullText} />
      </div>
    </div>
  );
};

export default CourseDetails;
