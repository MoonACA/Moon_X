"use client";
import DOMPurify from "dompurify";
function CourseBody({ courseText }: { courseText: string }) {
  const safeLecture = DOMPurify.sanitize(courseText);
  return (
    <div
      className=" text-white text-sm max-md:text-[0.8rem]"
      dangerouslySetInnerHTML={{ __html: safeLecture }}
    />
  );
}

export default CourseBody;
