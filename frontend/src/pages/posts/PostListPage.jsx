import { useState } from "react";
import PostList from "./partials/PostList";
import Sidebar from "./Sidebar";
import Button from "../../ui/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/posts`);
  return res.data;
};
const PostListPage = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <Button
        className={"bg-blue-800 text-white rounded-xl md:hidden"}
        type={"button"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Filter or Search"}
      </Button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
