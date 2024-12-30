import { FaEdit, FaLinkedin, FaTrash } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchPage from "../../../components/search/Search";
import { Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Sidebar = ({ post }) => {
  const { getToken } = useAuth();
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const navigate = useNavigate();
  //likedPost
  const mutationLiked = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axiosInstance.put(
        `/user/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      setIsLiked((prev) => !prev);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //updatePost
  const mutationUpdate = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axiosInstance.put(
        `/posts/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      navigate(`/admin/create`, { state: { post } });
    },
    onError: (error) => {
      toast.error(`Failed to update the post: ${error.message}`);
    },
  });

  return (
    <div className="px-4 h-max sticky top-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center flex-col text-center gap-2">
          <img
            src={"/featured1.jpeg"}
            className="w-12 h-12 rounded-full object-cover"
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
      <div className="flex flex-col items-center gap-2 pt-4">
        <FaTrash size={20} className="text-red-600" />{" "}
        <span className="text-white cursor-pointer">Delete Post</span>
        <FaEdit
          onClick={() => mutationUpdate.mutate()}
          size={25}
          className="text-blue-600 pb-1 cursor-pointer"
        />
        <span className="text-white">Edit Post</span>
        {isLiked ? (
          <Heart
            onClick={() => mutationLiked.mutate()}
            size={25}
            className={`pb-1 cursor-pointer text-blue-400`}
          />
        ) : (
          <FaHeart
            onClick={() => mutationLiked.mutate()}
            size={25}
            className={`pb-1 cursor-pointer text-red-600`}
          />
        )}
        <span className="text-white cursor-pointer">Like Post</span>
      </div>
      <h1 className="mt-8 mb-4 text-center  font-medium text-xl text-white">
        Categories
      </h1>
      <div className="flex flex-col items-center gap-2 text-sm text-blue-400">
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
