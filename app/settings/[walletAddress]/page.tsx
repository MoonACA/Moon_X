import Settings from "@/components/Settings";
import { createGetUser } from "@/services/apiUsers";

async function page({ params }: { params: { walletAddress: string } }) {
  const user = await createGetUser({ walletAddress: params.walletAddress });
  return (
    <div>
      <Settings user={user} />
    </div>
  );
}

export default page;
