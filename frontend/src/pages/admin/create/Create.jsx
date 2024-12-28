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
import Upload from "../../../components/upload/Upload";
import { useEffect, useState } from "react";

const AdminCreate = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [progress, setProgress] = useState("");

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

  //image and video
  const image = watch("image");
  const video = watch("video");
  useEffect(() => {
    if (image && image.url) {
      const currentContent = watch("content") || "";
      const updatedContent = `${currentContent}<p><img src="${image.url}" alt="Uploaded image" /></p>`;
      setValue("content", updatedContent);
    }
  }, [image, setValue, watch]);

  useEffect(() => {
    if (video) {
      const currentContent = watch("content") || "";
      const updatedContent = `${currentContent}<p><iframe class="ql-video" src="${video.url}"></iframe></p>`;
      setValue("content", updatedContent);
    }
  }, [video, setValue, watch]);

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
        setValue("img", null);
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
        <Upload
          type={"image"}
          setProgress={setProgress}
          setData={(data) => setValue("img", data.url)}
        >
          <Button type="button" className="text-white md:w-1/4 w-full">
            Add a cover image
          </Button>{" "}
        </Upload>
        {errors.img && <p className="text-red-500">{errors.img.message}</p>}

        {progress && (
          <span
            className={`progress ${progress ? "active" : ""}`}
            style={{ width: `${progress}%` }}
          ></span>
        )}
        <Input
          register={register("title")}
          name="title"
          type="text"
          placeholder="My Awesome Story"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
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
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload
              type={"image"}
              setProgress={setProgress}
              setData={(data) => setValue("image", data)}
            >
              🌆
            </Upload>
            <Upload
              type="video"
              setProgress={setProgress}
              setData={(data) => setValue("video", data)}
            >
              ▶️
            </Upload>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={watch("content")}
          onChange={(value) => setValue("content", value)}
          className="text-black flex-1 bg-white shadow-lg"
          placeholder="Write your story here..."
          readOnly={0 < progress && progress < 100}
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
