import Button from "../../../ui/Button";
import Comment from "./Comment";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "../../../validation/createComment";
import {
  useGetUserReviewsQuery,
  useSubmitReviewMutation,
} from "../../../redux/api/commentApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Comments = ({ postId, title }) => {
  const [submitReview, { isError, error, isSuccess, isLoading }] =
    useSubmitReviewMutation();
  const { data } = useGetUserReviewsQuery({ title, id: postId });
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCommentSchema),
    mode: "onChange",
  });

  // Yeni yorum eklenince bildirim ver
  useEffect(() => {
    if (isSuccess) {
      toast.success("Yorumun başarılı bir şekilde gönderildi.");
    }
    if (isError) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  }, [isSuccess, isError, error]);

  // Normal yorum gönderme
  const onSubmit = async (data) => {
    try {
      await submitReview({
        comment: data.comment,
        title,
        postId,
      });
    } catch (error) {
      alert("Lütfen tekrar deneyiniz", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-white">Yorumlar</h1>
      <hr className="text-white w-full" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end flex-col gap-2 w-full"
      >
        <div className="flex flex-col gap-2 w-full">
          <textarea
            {...register("comment")}
            placeholder="Yorum Yaz"
            name="comment"
            className="w-full p-4 rounded-xl outline-none text-white border border-gray-400 resize-none"
          />
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message}</p>
          )}
        </div>
        <Button loading={isLoading} type="submit" className="text-white">
          Gönder
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
          currentUser={user}
        />
      ))}
    </div>
  );
};

export default Comments;
