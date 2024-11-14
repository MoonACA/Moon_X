import one from "@/public/assets/creator1.png";
import Image from "next/image";
import { truncateAddr } from "@/utils/helpers";
import { getUserByWalletAddress } from "@/services/apiUsers";

type CreatorType = {
  creatorAddress: string;
};

const Creators = async ({ creatorAddress }: CreatorType) => {
  const { user: userData } = await getUserByWalletAddress(creatorAddress);

  const truncatedAddress = truncateAddr(userData?.walletAddress) || "";

  return (
    <div>
      <div className=" mt-[1rem] flex items-center max-md:flex-col max-md:items-start">
        <div className=" flex items-center">
          <div className=" rounded-full border border-white w-[3rem] h-[3rem] relative">
            <Image
              src={one}
              alt=""
              layout="fill"
              objectFit="cover"
              className=" rounded-full"
            />
          </div>
        </div>

        <div className=" text-[#aaaaaa] text-sm font-medium ml-2">
          <p className="">Created by:</p>
          <ul className=" flex items-center gap-10">
            <li className="">
              {userData?.displayName ? userData.displayName : truncatedAddress}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Creators;
