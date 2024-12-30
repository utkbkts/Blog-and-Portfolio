import { useQuery } from "@tanstack/react-query";
import BreadCrump from "./partials/BreadCrump";
import FeaturesBlogs from "./partials/FeaturesBlogs";
import FeaturesProjects from "./partials/FeaturesProjects";
import Introduction from "./partials/Introduction";
import MainCategories from "./partials/MainCategories";
import Slider from "./partials/Slider";
import axiosInstance from "../../utils/axios";
import PaginationPage from "../../components/pagination/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SkeletonText from "../../components/Skeleton";
const fetchCategory = async ({ category, page, search }) => {
  const res = await axiosInstance.get("/posts", {
    params: { category, page, search },
  });
  return res.data;
};

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("query") || "";
  const category = searchParams.get("category");

  //blogs
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", { category, page, search }],
    queryFn: () => fetchCategory({ category, page, search }),
  });
  if (error) return <p>Error: {error.message}</p>;

  const mainBlog = data?.blogPosts[0];
  const sideBlogs = data?.blogPosts?.slice(1, 4);
  //project
  const projectFilter = data?.posts?.filter(
    (item) => item.categoryHeader === "Project"
  );
  return (
    <div className="text-[#fff] pt-12">
      {/* BreadCrumb */}
      <div>
        <BreadCrump />
      </div>
      {/* Introduction */}
      <div>
        <Introduction />
      </div>
      {/* Main Category */}
      <div>
        <MainCategories />
      </div>
      {/* FeaturesBlogs */}
      <div className="pb-4">
        <h1 className="font-bold text-3xl p-8">My Blogs</h1>
        <FeaturesBlogs sideBlogs={sideBlogs} mainBlog={mainBlog} />
      </div>
      {/* FeaturesProjects */}
      <div>
        <Slider />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl p-8">My Projects</h1>
        {isLoading ? (
          <>
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
          </>
        ) : (
          projectFilter?.map((item) => (
            <FeaturesProjects key={item._id} post={item} />
          ))
        )}
        <PaginationPage
          resPerPage={4}
          filteredProductsCount={projectFilter?.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
