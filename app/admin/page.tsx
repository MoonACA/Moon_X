import AdminBoard from "@/components/AdminBoard";
import { Course, getCourses } from "@/services/apiCourses";

export const revalidate = 0;
async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let courses: Course[];
  if (searchParams["status"] == "active")
    courses = await getCourses({ field: "approved", value: true });
  else if (searchParams["status"] == "pending")
    courses = await getCourses({ field: "approved", value: false });
  else courses = await getCourses();
  return (
    <div>
      <AdminBoard courses={courses} />
    </div>
  );
}

export default page;
