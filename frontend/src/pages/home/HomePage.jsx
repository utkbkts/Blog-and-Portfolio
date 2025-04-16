import FeaturesBlogs from "./partials/FeaturesBlogs";
import FeaturesProjects from "./partials/FeaturesProjects";
import Introduction from "./partials/Introduction";
import MainCategories from "./partials/MainCategories";
import Slider from "./partials/Slider";
import PaginationPage from "../../components/pagination/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SkeletonText from "../../components/Skeleton";
import { useGetAllPostsQuery } from "../../redux/api/postApi";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");

  const params = { page, search };
  category !== null && (params.category = category);
  const { data, isLoading } = useGetAllPostsQuery(params);

  //blogs
  const sideBlogs = data?.blogPosts.slice(1, 4);
  const mainBlog = data?.blogPosts[0];
  return (
    <div className="text-[#fff] pt-12 ">
      {/* BreadCrumb */}
      {/* Introduction */}
      <div>
        <Introduction />
      </div>
      {/* Main Category */}
      <div>
        <MainCategories />
      </div>
      {/* FeaturesBlogs */}
      <div className="pb-4 ">
        <h1 className="font-bold mds:text-3xl text-xl pt-8 text-center uppercase">My Blogs</h1>
        <hr className="text-gray-500 mb-4"/>
        {isLoading ? (
          <SkeletonText />
        ) : (
          <FeaturesBlogs sideBlogs={sideBlogs} mainBlog={mainBlog} />
        )}
      </div>
      {/* FeaturesProjects */}
      <div>
        <Slider />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold  mds:text-3xl text-xl pt-8 text-center uppercase">My Projects</h1>
        <hr className="text-gray-500 mb-4"/>

        {isLoading ? (
          <>
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
          </>
        ) : (
          data?.projectPosts?.map((item) => (
            <FeaturesProjects key={item._id} post={item} />
          ))
        )}
        <PaginationPage
          resPerPage={5}
          filteredProductsCount={data?.filteredPostsCount}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
