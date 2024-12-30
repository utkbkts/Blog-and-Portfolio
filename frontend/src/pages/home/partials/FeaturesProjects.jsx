import { Link } from "react-router-dom";
import Button from "../../../ui/Button";
import { generateSlug, getDateLocal } from "../../../helpers/helpers";

const FeaturesProjects = ({ post }) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 overflow-hidden">
      <img
        src={post?.img?.url}
        alt={post?.title}
        className="rounded-xl object-cover md:w-1/3 w-full aspect-video shadow-md transition-transform duration-300 hover:scale-105"
        title={post?.title}
      />
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-center gap-4">
          <span className="text-slate-300">By {post?.user?.username}</span>{" "}
          <span className="text-slate-300">
            {getDateLocal(post?.createdAt)}
          </span>
          <Link
            to={`/postList?category=${post?.category}`}
            className="text-blue-400 hover:underline pt-[1px]"
          >
            {post?.category}
          </Link>
        </div>
        <h1 className="font-bold text-3xl">{post?.title}</h1>
        <p className="text-slate-300">{post?.desc}</p>
        <Link to={`/${generateSlug(post?.title)}/${post?._id}`}>
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

export default FeaturesProjects;
