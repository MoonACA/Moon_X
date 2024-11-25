import Skeleton from "react-loading-skeleton";

function CardSkeleton() {
  return (
    <div>
      <div className=" bg-[#192A41] border rounded-xl border-[#FFFFFF] p-[1rem] grid gap-2">
        <div>
          <div className=" relative w-full h-[10rem] mx-auto z-[0] mb-[0.5rem]">
            <Skeleton height={"160px"} />
          </div>
          <h3 className=" text-[1rem] text-[#FFFFFF] font-medium h-[3rem]">
            <Skeleton />
          </h3>
          <p className=" text-[#aaaaaa] text-[12px]">
            <Skeleton />
          </p>
          <Skeleton height={"40px"} />
          <div className=" flex justify-between items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
