import { Link } from "react-router-dom";
import Image from "../../../components/image/Image";
import Button from "../../../ui/Button";

const FeaturesBlogs = () => {
  return (
    <div className=" flex flex-col lg:flex-row gap-12 px-4 lg:px-12">
      {/* First Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 overflow-hidden ">
        {/* Image */}
        <Image
          className="rounded-3xl object-cover shadow-lg transition-transform duration-300 hover:scale-105 "
          src="/featured1.jpeg"
        />
        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap sm:justify-start justify-center">
          <h1 className="font-semibold text-gray-700 text-lg">01.</h1>
          <Link className="text-blue-500 font-medium hover:underline">
            Web Design
          </Link>
          <span>2 days ago</span>
          <span>By Utku Toygun Bektasoglu</span>
        </div>
        {/* Title */}
        <Link
          to={"/test"}
          className="text-xl lg:text-3xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-200 sm:text-left text-center"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
        <p className="text-slate-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      {/* Other Blogs */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        {/* Second Blog */}
        <div className="flex gap-4 overflow-hidden rounded-xl">
          <Image
            src="/featured1.jpeg"
            className="rounded-xl object-cover w-1/3 aspect-video shadow-md transition-transform duration-300 hover:scale-105"
          />
          {/* Blog Details */}
          <div className="w-2/3 flex flex-col gap-3 flex-grow">
            {/* Details */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <h1 className="font-semibold text-gray-700">02.</h1>
              <Link className="text-blue-500 font-medium hover:underline">
                Web Design
              </Link>
              <span>2 days ago</span>
            </div>
            {/* Title */}
            <Link
              className="font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200"
              to={"/test"}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.Lorem
              ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
            <p className="text-slate-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Button
              className={
                "w-1/3 hover:bg-opacity-60 transition-all duration-300 mt-auto"
              }
            >
              Read More
            </Button>
          </div>
        </div>
        {/* third Blog */}
        <div className="flex gap-4">
          <Image
            src="/featured1.jpeg"
            className="rounded-xl object-cover w-1/3 aspect-video shadow-md transition-transform duration-300 hover:scale-105"
          />
          {/* Blog Details */}
          <div className="w-2/3 flex flex-col gap-2">
            {/* Details */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <h1 className="font-semibold text-gray-700">03.</h1>
              <Link className="text-blue-500 font-medium hover:underline">
                Web Design
              </Link>
              <span>2 days ago</span>
            </div>
            {/* Title */}
            <Link
              className="font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200"
              to={"/test"}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Link>
          </div>
        </div>
        {/* Second Blog */}
        <div className="flex gap-4">
          <Image
            src="/featured1.jpeg"
            className="rounded-xl object-cover w-1/3 aspect-video shadow-md transition-transform duration-300 hover:scale-105"
          />
          {/* Blog Details */}
          <div className="w-2/3 flex flex-col gap-2">
            {/* Details */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <h1 className="font-semibold text-gray-700">04.</h1>
              <Link className="text-blue-500 font-medium hover:underline">
                Web Design
              </Link>
              <span>2 days ago</span>
            </div>
            {/* Title */}
            <Link
              className="font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200"
              to={"/test"}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBlogs;
