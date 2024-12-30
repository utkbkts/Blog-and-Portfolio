import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonText = () => {
  return (
    <div className="flex md:flex-row flex-col gap-4 overflow-hidden">
      {/* Skeleton for Image */}
      <Skeleton
        count={1}
        height={200}
        width={250}
        className="rounded-xl object-cover md:w-1/3 w-full aspect-video shadow-md"
      />

      {/* Skeleton for Text Content */}
      <div className="flex flex-col gap-4 flex-grow">
        {/* Skeleton for User Info */}
        <div className="flex items-center gap-4">
          <Skeleton width={80} height={20} />
          <Skeleton width={100} height={20} />
          <Skeleton width={70} height={20} />
        </div>

        {/* Skeleton for Title */}
        <Skeleton width={250} height={30} className="font-bold text-3xl" />

        {/* Skeleton for Description */}
        <Skeleton count={3} className="text-slate-300" />

        {/* Skeleton for Button */}
        <Skeleton width={150} height={40} className="mt-auto" />
      </div>
    </div>
  );
};

export default SkeletonText;
