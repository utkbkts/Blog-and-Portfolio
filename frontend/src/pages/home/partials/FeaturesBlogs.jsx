import { Link } from "react-router-dom";
import Button from "../../../ui/Button";
import { generateSlug, getDateLocal } from "../../../helpers/helpers";
import { Eye, Heart } from "lucide-react";
const FeaturesBlogs = ({ mainBlog, sideBlogs }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 px-4 lg:px-12">
      {/* First Section - Main Blog */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 overflow-hidden">
        {/* Image */}
        <img
          className="rounded-3xl object-cover shadow-lg transition-transform duration-300 hover:scale-105 h-[400px]"
          src={mainBlog?.img?.url}
        />
        {/* Details */}
        <div className="flex items-center gap-2  text-sm text-gray-500 flex-wrap">
          <h1 className="font-semibold text-gray-700 text-lg">01.</h1>
          {Array.isArray(mainBlog?.category) ? (
            mainBlog.category.map((cat, index) => (
              <Link
                key={index}
                to={`/postList?category=${encodeURIComponent(cat)}`}
                className="text-blue-400 mr-2"
              >
                {cat}
                {index !== mainBlog.category.length - 1 && ", "}
              </Link>
            ))
          ) : (
            <Link
              to={`/postList?category=${encodeURIComponent(
                mainBlog?.category || ""
              )}`}
              className="text-blue-400"
            >
              {mainBlog?.category}
            </Link>
          )}

          <span>{getDateLocal(mainBlog?.createdAt)}</span>
          <span>By {mainBlog?.user?.username}</span>
          <span className="flex items-center gap-1">
            <Heart size={15} />
            <span>({mainBlog?.likedCount ? mainBlog?.likedCount : 0})</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye size={15} />
            <span>({mainBlog?.visit ? mainBlog?.visit : 0})</span>
          </span>
        </div>
        {/* Title */}
        <Link
          to={`/detay/${generateSlug(mainBlog?.title)}/${mainBlog?._id}`}
          className="text-xl lg:text-3xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-200 sm:text-left text-center"
        >
          {mainBlog?.title}
        </Link>
        <p className="text-slate-300">{mainBlog?.desc.slice(0, 200)}</p>
      </div>

      {/* Other Blogs */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8 h-[550px] ">
        {sideBlogs?.map((sideBlog, index) => (
          <div
            key={sideBlog?._id}
            className="flex gap-4  overflow-hidden rounded-xl "
          >
            <img
              src={sideBlog?.img?.url}
              className="rounded-xl object-cover w-1/3 aspect-video shadow-md transition-transform duration-300 hover:scale-105 "
            />
            {/* Blog Details */}
            <div className="w-2/3 flex flex-col gap-3 flex-grow">
              {/* Details */}
              <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                <h1 className="font-semibold text-gray-700">0{index + 2}.</h1>
                {Array.isArray(sideBlog?.category) ? (
                  sideBlog.category.map((cat, index) => (
                    <Link
                      key={index}
                      to={`/postList?category=${encodeURIComponent(cat)}`}
                      className="text-blue-400 mr-2"
                    >
                      {cat}
                      {index !== sideBlog.category.length - 1 && ", "}
                    </Link>
                  ))
                ) : (
                  <Link
                    to={`/postList?category=${encodeURIComponent(
                      sideBlog?.category || ""
                    )}`}
                    className="text-blue-400"
                  >
                    {sideBlog?.category}
                  </Link>
                )}
                <span>{getDateLocal(sideBlog?.createdAt)}</span>
                <span className="flex items-center gap-1">
                  <Heart size={15} />

                  <span>
                    ({sideBlog?.likedCount ? sideBlog?.likedCount : 0})
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={15} />
                  <span>({sideBlog?.visit ? sideBlog?.visit : 0})</span>
                </span>
              </div>
              {/* Title */}
              <Link
                className="font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200"
                to={`/detay/${generateSlug(sideBlog?.title)}/${sideBlog?._id}`}
              >
                {sideBlog?.title}
              </Link>
              <p className="text-slate-300">{sideBlog?.desc.slice(0, 200)}</p>
              <Link to={`/${generateSlug(sideBlog?.title)}/${sideBlog?._id}`}>
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
        ))}
      </div>
    </div>
  );
};

export default FeaturesBlogs;
