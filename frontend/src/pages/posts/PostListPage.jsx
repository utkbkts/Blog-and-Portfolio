import { useState } from "react";
import PostList from "./partials/PostList";
import Sidebar from "./Sidebar";
import Button from "../../ui/Button";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const fetchPosts = async (pageParams) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: {
      page: pageParams?.page,
      search: pageParams?.search,
      category: pageParams?.category,
    },
  });
  return res.data;
};
const PostListPage = () => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "pending") return <Loading />;

  if (status === "error") return "Something went wrong !!";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
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
              <p className="text-white">
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
