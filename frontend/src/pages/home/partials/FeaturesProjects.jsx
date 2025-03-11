import { Link } from "react-router-dom";
import Button from "../../../ui/Button";
import { generateSlug, getDateLocal } from "../../../helpers/helpers";
import { Eye, Heart } from "lucide-react";

const FeaturesProjects = ({ post }) => {
  return (
    <div className="flex mds:flex-row flex-col gap-4 overflow-hidden">
      <img
        src={post?.img?.url}
        alt={post?.title}
        className="rounded-xl object-cover mds:w-1/3 w-full aspect-video shadow-md transition-transform duration-300 hover:scale-105"
        title={post?.title}
      />
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-center gap-4 sm:flex-row flex-wrap">
          <span className="text-slate-300">By {post?.user?.username}</span>{" "}
          <span className="text-slate-300">
            {getDateLocal(post?.createdAt)}
          </span>
          {Array.isArray(post?.category) ? (
            post.category.map((cat, index) => (
              <Link
                key={index}
                to={`/postList?category=${encodeURIComponent(cat)}`}
                className="text-blue-400"
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
          <span className="flex items-center gap-1">
            <Heart size={15} />
            <span>({post?.likedCount ? post?.likedCount : 0})</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye size={15} />
            <span>({post?.visit ? post?.visit : 0})</span>
          </span>
        </div>
        <h1 className="font-bold mds:text-3xl text-xl">{post?.title}</h1>
        <p className="text-slate-300">{post?.desc.slice(0, 500)}...</p>
        <Link to={`/detay/${generateSlug(post?.title)}/${post?._id}`}>
          <Button
            className={
              "sm:w-1/3 w-full hover:bg-opacity-60 transition-all duration-300 mt-auto"
            }
          >
            Daha fazla
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturesProjects;
