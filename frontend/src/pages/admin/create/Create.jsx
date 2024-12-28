import { useAuth, useUser } from "@clerk/clerk-react";
import Loading from "../../../components/Loading";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import SelectInput from "../../../ui/SelectInput";
import TextArea from "../../../ui/TextArea";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMessageSchema } from "../../../validation/createMessage-schema";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
const AdminCreate = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createMessageSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axiosInstance.post("/posts/create", newPost, {
        headers: { Authorization: `Bearer ${token}` },
        data: newPost,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Post created successfully!");
        setValue("title", "");
        setValue("desc", "");
        setValue("category", "");
        setValue("content", "");
      },
    });
  };

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <h1>You should login</h1>;
  }
  return (
    <div className="h-full">
      <h1 className="text-2xl text-white text-center pb-4">
        Create a New Post
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-4"
      >
        <Button type="button" className="text-white md:w-1/4 w-full">
          Add a cover image
        </Button>
        <Input
          register={register("title")}
          name="title"
          type="text"
          placeholder="My Awesome Story"
        />
        {errors.story && <p className="text-red-500">{errors.story.message}</p>}

        <SelectInput
          register={register("category")}
          onChange={(e) => setValue("category", e.target.value)}
          className="custom-class"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        <TextArea
          rows={5}
          register={register("desc")}
          placeholder="Description"
          name="desc"
          className="resize-none"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <div className="flex">
          <div className="flex flex-col gap-2 mr-2">
            <div className="">🌆</div>
            <div className="">👉</div>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={watch("content")}
          onChange={(value) => setValue("content", value)}
          className="text-black flex-1 bg-white shadow-lg"
          placeholder="Write your story here..."
        />
        <input type="hidden" {...register("content")} />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <Button
          loading={mutation.isPending}
          type="submit"
          className="text-white"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default AdminCreate;
