import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import PostList from "../posts/partials/PostList";
import SkeletonText from "../../components/Skeleton";
import PaginationPage from "../../components/pagination/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async ({ page }) => {
  const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: {
      page,
    },
  });
  return res.data;
};

const TrendingBlogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const { isLoading, status, data } = useQuery({
    queryKey: ["trendBlogs", page],
    queryFn: () => fetchPosts({ page }),
    keepPreviousData: true,
  });

  if (status === "error") return "Something went wrong !!";
  return (
    <div className="container mx-auto pt-12">
      <div className="flex flex-col-reverse gap-8 md:flex-row  justify-between ">
        <div className="w-full">
          <h1 className="text-white font-bold pb-4 pt-4 text-2xl">
            ({data?.blogPostsCount}) Trending Blog Find
          </h1>
          {isLoading ? (
            <>
              <SkeletonText /> <SkeletonText /> <SkeletonText />
            </>
          ) : (
            data?.blogPosts?.map((item) => (
              <PostList key={item._id} post={item} />
            ))
          )}
          <PaginationPage
            resPerPage={4}
            filteredProductsCount={data?.blogPostsCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingBlogs;
