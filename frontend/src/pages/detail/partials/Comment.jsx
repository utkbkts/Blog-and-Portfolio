import Image from "../../../components/image/Image";
import { getDateLocal } from "../../../helpers/helpers";
import Response from "./Response";
import { Pencil, Trash } from "lucide-react";

const Comment = ({ comment }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src={comment?.user?.img || "/avatar.png"}
          className={"w-10 h-10 rounded-full object-cover"}
          w="40"
        />
        <span className="font-medium">{comment?.user?.username}</span>
        <span className="text-sm text-slate-500">
          {getDateLocal(comment?.createdAt)}
        </span>
        <div className="flex items-center gap-3">
          <Pencil size={20} className="cursor-pointer" />
          <Trash size={20} className="cursor-pointer" />
        </div>
      </div>
      <div className="mt-4">
        <p>{comment?.comment}</p>
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
