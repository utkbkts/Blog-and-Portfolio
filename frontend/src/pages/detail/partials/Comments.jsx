import Button from "../../../ui/Button";
import Comment from "./Comment";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "../../../validation/createComment";
import {
  useDeleteReviewMutation,
  useGetUserReviewsQuery,
  useSubmitReviewMutation,
  useUpdateReviewMutation,
} from "../../../redux/api/postApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Comments = ({ postId, title }) => {
  const [submitReview, { isError, error, isSuccess, isLoading }] =
    useSubmitReviewMutation({ postId, title });
  const [
    updateReviews,
    {
      isError: isupdateError,
      error: updateError,
      isSuccess: updateSucces,
      isLoading: updateLoading,
    },
  ] = useUpdateReviewMutation({ postId, title });
  const [
    deleteReviews,
    {
      isError: isDeleteError,
      error: deleteError,
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
    },
  ] = useDeleteReviewMutation({ postId, title });
  const { data } = useGetUserReviewsQuery({ postId, title });
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCommentSchema),
    mode: "onChange",
  });

  //new comment
  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment success send");
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isSuccess, isError, error]);

  //delete comment
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Comment success send");
    }
    if (isDeleteError) {
      toast.error(deleteError.response.data.message);
    }
  }, [deleteSuccess, isDeleteError, deleteError]);

  //update comment
  useEffect(() => {
    if (updateSucces) {
      toast.success("Comment success send");
    }
    if (isupdateError) {
      toast.error(updateError.response.data.message);
    }
  }, [updateSucces, isupdateError, updateError]);

  const onSubmit = async (data) => {
    await submitReview({
      comment: data.comment,
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-white ">Comments</h1>
      <hr className="text-white" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-8 w-full"
      >
        <div className="flex flex-col gap-2 w-full">
          <textarea
            {...register("comment")}
            placeholder="Write a comment..."
            className="w-full p-4 rounded-xl outline-none"
          />
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message}</p>
          )}
        </div>
        <Button loading={isLoading} type="submit" className={"text-white"}>
          Send
        </Button>
      </form>
      {data?.map((item) => (
        <Comment
          key={item._id}
          comment={{
            ...item,
            user: {
              _id: user?.id,
              username: user?.username,
              email: user?.email,
              img: user?.imageUrl,
            },
          }}
          mutationDelete={deleteReviews}
          mutationUpdate={updateReviews}
          currentUser={user}
        />
      ))}
    </div>
  );
};

export default Comments;
