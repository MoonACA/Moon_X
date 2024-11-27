import UserProfile from "@/components/usertabs/UserProfile";
import {
  getCourses,
  getCoursesByIds,
  getUserCourses,
} from "@/services/apiCourses";
import { createGetUser } from "@/services/apiUsers";

async function Page({ params }: { params: { walletAddress: string } }) {
  const user = await createGetUser({ walletAddress: params.walletAddress });
  const enrolledCourses = await getCoursesByIds(user.enrolledCourses);
  const myCourses = await getUserCourses(params.walletAddress);

  return (
    <div>
      <UserProfile
        params={params}
        user={user}
        enrolledCourses={enrolledCourses}
        myCourses={myCourses}
      />
    </div>
  );
}

export default Page;
