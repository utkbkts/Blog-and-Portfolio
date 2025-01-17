import { useState } from "react";
import { getDateLocal } from "../../../helpers/helpers";
import Response from "./Response";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";

const Comment = ({ comment, mutationDelete, mutationUpdate, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment?.comment);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const isUserComment = currentUser && comment?.user?._id === currentUser.id;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-2">
        <img
          src={comment?.user?.img || "/avatar.png"}
          className={"w-10 h-10 rounded-full object-cover"}
        />
        <span className="font-medium">{comment?.user?.username}</span>
        <span className="text-sm text-slate-500">
          {getDateLocal(comment?.createdAt)}
        </span>
        {isUserComment && (
          <div className="flex items-center gap-3">
            <Pencil
              size={20}
              className="cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            />
            <Trash
              size={20}
              className="cursor-pointer"
              onClick={() => mutationDelete.mutate(comment?._id)}
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        {isEditing ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 rounded-lg border"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>
          </form>
        ) : (
          <p>{comment?.comment}</p>
        )}
      </div>
      {comment?.adminReply && (
        <div className="mt-8 mx-12">
          <Response />
        </div>
      )}
    </div>
  );
};

export default Comment;
