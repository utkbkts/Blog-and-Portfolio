import { useState } from "react";
import PostList from "./partials/PostList";
import Sidebar from "./Sidebar";
import Button from "../../ui/Button";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "../../utils/axios";

const fetchPosts = async ({ page, category, search }) => {
  const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: {
      search,
      page,
      category,
    },
  });
  return res.data;
};

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
    queryKey: ["posts", category, search],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({ page: pageParam, search, category }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if (status === "pending") return <Loading />;

  if (status === "error") {
    console.error("Error fetching data", error);
    return "Something went wrong !!";
  }

  return (
    <div className="container mx-auto pt-12">
      <Button
        className={"bg-blue-800 text-white rounded-xl md:hidden"}
        type={"button"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Filter or Search"}
      </Button>
      <div className="flex flex-col-reverse gap-8 md:flex-row  justify-between ">
        <div className="w-full ">
          <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more posts...</h4>}
            endMessage={
              <p className="text-white text-center">
                <b>All posts loaded!</b>
              </p>
            }
          >
            {allPosts.map((post) => (
              <PostList key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        </div>
        <div className={`${open ? "block" : "hidden"} md:block `}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
