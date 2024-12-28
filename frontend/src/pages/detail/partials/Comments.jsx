import Button from "../../../ui/Button";
import axiosInstance from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "../../../validation/createComment";
const fetchComments = async (title, postId) => {
  const res = await axiosInstance.get(`/comments/${title}/${postId}`);
  return res.data;
};

const Comments = ({ postId, title }) => {
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", title, postId],
    queryFn: () => fetchComments(title, postId),
  });
  console.log("🚀 ~ mutationFn: ~ data:", data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCommentSchema),
    mode: "onChange",
  });

  const QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axiosInstance.post(
        `/comments/newComment/${title}/${postId}`,
        newPost,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: newPost,
        }
      );
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["comments", title, postId],
      });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onError: (error) => {
        console.log(error.message);
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Comment successfully!");
        setValue("comment", "");
      },
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
        <Button type="submit" className={"text-white"}>
          Send
        </Button>
      </form>
      {data?.map((item) => (
        <Comment key={item._id} comment={item} />
      ))}
    </div>
  );
};

export default Comments;
