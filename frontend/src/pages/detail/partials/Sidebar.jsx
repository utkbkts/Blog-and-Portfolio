import { FaEdit, FaLinkedin, FaTrash } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import Image from "../../../components/image/Image";
import SearchPage from "../../../components/search/Search";

const Sidebar = () => {
  return (
    <div className="px-4 h-max sticky top-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center flex-col text-center gap-2">
          <Image
            src={"/featured1.jpeg"}
            className="w-12 h-12 rounded-full object-cover"
            w="48"
            h="48"
          />
          <Link className="text-white">utku toygun bektasoglu</Link>
        </div>
        <div className="flex gap-2">
          <Link>
            <FaLinkedin size={35} className="text-blue-600" />
          </Link>
          <Link>
            <FaGithubSquare size={35} className="text-slate-400" />
          </Link>
        </div>
      </div>
      <div className="flex  gap-2 pt-4">
        <FaTrash size={20} className="text-red-600" />{" "}
        <span className="text-white cursor-pointer">Delete Post</span>
        <FaEdit size={25} className="text-blue-600 pb-1" />{" "}
        <span className="text-white cursor-pointer">Edit Post</span>
      </div>
      <h1 className="mt-8 mb-4 text-center  font-medium text-xl text-white">
        Categories
      </h1>
      <div className="flex flex-col gap-2 text-sm text-blue-400">
        <Link className="underline">All</Link>
        <Link className="underline" to="/">
          Web Design
        </Link>
        <Link className="underline" to="/">
          Development
        </Link>
        <Link className="underline" to="/">
          Databases
        </Link>
        <Link className="underline" to="/">
          Search Engines
        </Link>
        <Link className="underline" to="/">
          Marketing
        </Link>
      </div>
      <div className="pt-8">
        <SearchPage />
      </div>
    </div>
  );
};

export default Sidebar;
