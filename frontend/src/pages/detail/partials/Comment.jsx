import { useEffect, useState } from "react";
import { getDateLocal } from "../../../helpers/helpers";
import Response from "./Response";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../../ui/Button";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../../redux/api/commentApi";

const Comment = ({ comment, currentUser }) => {
  const [
    updateReviews,
    {
      isError: isupdateError,
      error: updateError,
      isSuccess: updateSucces,
      isLoading: updateLoading,
    },
  ] = useUpdateReviewMutation();

  const [
    deleteReviews,
    { isError: isDeleteError, error: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteReviewMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment?.comment);

  //update comment
  useEffect(() => {
    if (updateSucces) {
      toast.success("Yorumun başarılı bir şekilde güncellendi");
      setIsEditing(false);
    }
    if (isupdateError) {
      toast.error(updateError.response.data.message);
    }
  }, [updateSucces, isupdateError, updateError]);

  //delete comment
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Yorumun başarılı bir şekilde silindi.");
    }
    if (isDeleteError) {
      toast.error(deleteError.response.data.message);
    }
  }, [deleteSuccess, isDeleteError, deleteError]);

  const handleDelete = async () => {
    try {
      await deleteReviews({
        commentId: comment?._id,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      //error
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateReviews({
      commentId: comment?._id,
      comment: editText,
    });
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
              onClick={handleDelete}
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
            <Button
              loading={updateLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Güncelle
            </Button>
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
