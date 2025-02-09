import { FaEdit, FaLinkedin, FaTrash } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Categories from "./Categories";
import { useSelector } from "react-redux";
import { useLikedPostMutation } from "../../../redux/api/userApi";

const Sidebar = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const [liked, { isSuccess, data,isError,error }] = useLikedPostMutation();
  const navigate = useNavigate();
  const isLikedByUser = post?.liked?.some(
    (like) => like?.user?.toString() === user?._id?.toString()
  );
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  //likedPost
  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      setIsLiked((prev) => !prev);
    }
    if(isError){
      toast.error(error.data.message)
    }
  }, [isSuccess, data,error,isError]);

  const handleLike = async () => {
    try {
      await liked({ postId: post?._id });
    } catch (err) {
      toast.error(err.message)
    }
  };

  //updatePost

  const handlePost = async () => {
    try {
      navigate(`/admin/create?update=${post?._id}`, {
        state: { post: post },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4 h-max sticky top-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center flex-col text-center gap-2">
          <img
            src={post?.user?.img?.url || "/avatar.png"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <Link className="text-white">{post?.user?.username}</Link>
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
        {user?.role === "admin" && (
          <>
            <FaTrash size={20} className="text-red-600" />
            <span className="text-white cursor-pointer">Delete Post</span>
            <FaEdit
              onClick={handlePost}
              size={25}
              className="text-blue-600 pb-1 cursor-pointer"
            />
            <span className="text-white">Edit Post</span>
          </>
        )}
        {isLiked ? (
          <FaHeart
            onClick={handleLike}
            size={25}
            className={`pb-1 cursor-pointer text-red-600`}
          />
        ) : (
          <Heart
            onClick={handleLike}
            size={25}
            className={`pb-1 cursor-pointer text-blue-400`}
          />
        )}
        <span className="text-white cursor-pointer">Like Post</span>
      </div>
      <h1 className="mt-8 mb-4 text-center  font-medium text-xl text-white">
        Categories
      </h1>
      <div className="flex flex-col items-center text-center gap-2 text-sm text-blue-400">
        <Categories />
      </div>
    </div>
  );
};

export default Sidebar;
