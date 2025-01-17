import PostList from "../posts/partials/PostList";
import SkeletonText from "../../components/Skeleton";
import PaginationPage from "../../components/pagination/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllPostsQuery } from "../../redux/api/postApi";

const TrendingProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const params = { page };
  const { data, isLoading } = useGetAllPostsQuery(params);

  return (
    <div className="container mx-auto pt-12">
      <div className="flex flex-col-reverse gap-8 md:flex-row  justify-between ">
        <div className="w-full">
          <h1 className="text-white font-bold pb-4 pt-4 text-2xl">
            ({data?.projectPostsCount}) Trending Project Find
          </h1>
          {isLoading ? (
            <>
              <SkeletonText /> <SkeletonText /> <SkeletonText />
            </>
          ) : (
            data?.projectPosts?.map((item) => (
              <PostList key={item._id} post={item} />
            ))
          )}
          <PaginationPage
            resPerPage={3}
            filteredProductsCount={data?.projectPostsCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingProjects;
