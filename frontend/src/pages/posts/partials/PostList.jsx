import { Link } from "react-router-dom";
import { generateSlug, getDateLocal } from "../../../helpers/helpers";
import Button from "../../../ui/Button";

const PostList = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12 text-white">
      {/* image */}
      <div className="xl:w-1/3">
        <img
          src={post?.img?.url}
          alt={post?.title}
          title={post?.title}
          className="w-[400px] h-[300px] object-cover"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          to={`/details/${generateSlug(post?.title)}/${post?._id}`}
          className="text-4xl font-semibold"
        >
          {post?.title}
        </Link>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <span>Written by</span>
          <span className="text-blue-400">{post?.user?.username}</span>
          <span>on</span>
          <Link
            to={`/postList?category=${post?.category}`}
            className="text-blue-400"
          >
            {post?.category}
          </Link>
          <span>{getDateLocal(post?.createdAt)}</span>
        </div>
        <p>{post?.desc}</p>
        <Link to={`/details/${generateSlug(post?.title)}/${post?._id}`}>
          <Button
            className={
              "w-1/3 hover:bg-opacity-60 transition-all duration-300 mt-auto"
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
