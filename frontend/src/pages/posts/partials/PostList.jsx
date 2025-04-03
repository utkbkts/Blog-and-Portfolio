import { Link } from "react-router-dom";
import { generateSlug, getDateLocal } from "../../../helpers/helpers";
import Button from "../../../ui/Button";
import { Eye } from "lucide-react";

const PostList = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-2 mb-12 text-white" >
      {/* image */}
      <div className="xl:w-1/3">
        <img
          src={post?.img?.url}
          alt={post?.title}
          title={post?.title}
          className="mds:w-[400px] w-full h-[300px] object-cover"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          to={`/detay/${generateSlug(post?.title)}/${post?._id}`}
          className="mds:text-4xl text-xl font-semibold"
        >
          {post?.title}
        </Link>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <span className="text-blue-400">{post?.user?.username}</span>
          <span>By</span>
          {Array.isArray(post?.category) ? (
            post.category.map((cat, index) => (
              <Link
                key={index}
                to={`/postList?category=${encodeURIComponent(cat)}`}
                className="text-blue-400 mr-2"
              >
                {cat}
                {index !== post.category.length - 1 && ", "}
              </Link>
            ))
          ) : (
            <Link
              to={`/postList?category=${encodeURIComponent(
                post?.category || ""
              )}`}
              className="text-blue-400"
            >
              {post?.category}
            </Link>
          )}

          <span>{getDateLocal(post?.createdAt)}</span>
          <span className="flex items-center gap-1">
            <Eye size={15} />
            <span>({post?.visit ? post?.visit : 0})</span>
          </span>
        </div>
        <p>{post?.desc.slice(0,200)}...</p>
        <Link to={`/detail/${generateSlug(post?.title)}/${post?._id}`}>
          <Button
            className={
              "sm:w-1/3 w-full hover:bg-opacity-60 transition-all duration-300 mt-auto"
            }
          >
           Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostList;
