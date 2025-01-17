import { useState } from "react";
import PostList from "./partials/PostList";
import Sidebar from "./Sidebar";
import Button from "../../ui/Button";
import Loading from "../../components/Loading";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllPostsQuery } from "../../redux/api/postApi";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const params = { category };
  const { data, isLoading } = useGetAllPostsQuery(params);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto pt-12">
      <Button
        className="bg-blue-800 text-white rounded-xl md:hidden"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Filter or Search"}
      </Button>
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        {/* Main Post List */}
        <div className="w-full">
          <InfiniteScroll
            dataLength={data?.posts?.length}
            loader={<h4>Loading more posts...</h4>}
            endMessage={
              <p className="text-white text-center">
                <b>All posts loaded!</b>
              </p>
            }
          >
            {data?.posts?.map((post) => (
              <PostList key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        </div>

        {/* Sidebar */}
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
