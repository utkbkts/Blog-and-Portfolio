import FeaturesBlogs from "./partials/FeaturesBlogs";
import FeaturesProjects from "./partials/FeaturesProjects";
import Introduction from "./partials/Introduction";
import MainCategories from "./partials/MainCategories";
import Slider from "./partials/Slider";
import PaginationPage from "../../components/pagination/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SkeletonText from "../../components/Skeleton";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("query") || "";
  const category = searchParams.get("category");

  //blogs

  return (
    <></>
    // <div className="text-[#fff] pt-12">
    //   {/* BreadCrumb */}
    //   {/* Introduction */}
    //   <div>
    //     <Introduction />
    //   </div>
    //   {/* Main Category */}
    //   <div>
    //     <MainCategories />
    //   </div>
    //   {/* FeaturesBlogs */}
    //   <div className="pb-4">
    //     <h1 className="font-bold text-3xl p-8">My Blogs</h1>
    //     <FeaturesBlogs sideBlogs={sideBlogs} mainBlog={mainBlog} />
    //   </div>
    //   {/* FeaturesProjects */}
    //   <div>
    //     <Slider />
    //   </div>
    //   <div className="flex flex-col gap-3">
    //     <h1 className="font-bold text-3xl p-8">My Projects</h1>
    //     {isLoading ? (
    //       <>
    //         <SkeletonText />
    //         <SkeletonText />
    //         <SkeletonText />
    //         <SkeletonText />
    //       </>
    //     ) : (
    //       data?.projectPosts?.map((item) => (
    //         <FeaturesProjects key={item._id} post={item} />
    //       ))
    //     )}
    //     <PaginationPage
    //       resPerPage={3}
    //       filteredProductsCount={data?.projectPostsCount}
    //       setCurrentPage={setCurrentPage}
    //       currentPage={currentPage}
    //     />
    //   </div>
    // </div>
  );
};

export default HomePage;
