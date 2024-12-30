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
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Upload from "../../../components/upload/Upload";

const categoryHeader = [
  { value: "blog", label: "Blog" },
  { value: "project", label: "Project" },
];
const optionsCategory = [
  { value: "database", label: "Database" },
  { value: "react", label: "React.JS" },
  { value: "nodejs", label: "Node.JS" },
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" },
  { value: "go", label: "Go" },
  { value: "python", label: "Python" },
  { value: "cyber-security", label: "Cyber Security" },
  { value: "software", label: "Software" },
  { value: "english", label: "English" },
];

const AdminCreate = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const existingPost = location.state?.post;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createMessageSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (existingPost) {
      reset({
        title: existingPost.title,
        desc: existingPost.desc,
        category: existingPost.category,
        categoryHeader: existingPost.categoryHeader,
        content: existingPost.content,
        img: existingPost.img,
      });
    }
  }, [existingPost, reset]);
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

  // Create or Update Mutation
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const token = await getToken();
      const url = existingPost ? `/posts/${existingPost._id}` : `/posts/create`;

      const method = existingPost ? "put" : "post";
      return axiosInstance[method](url, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
      onSuccess: () => {
        toast.success(
          existingPost
            ? "Post updated successfully!"
            : "Post created successfully!"
        );
        if (!existingPost) {
          setValue("title", "");
          setValue("desc", "");
          setValue("category", "");
          setValue("categoryHeader", "");
          setValue("content", "");
          setValue("img", null);
        }
        navigate(`/${existingPost.title}/${existingPost._id}`);
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
        {existingPost ? "Update Post" : "Create a New Post"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-4"
      >
        <SelectInput
          register={register("categoryHeader")}
          onChange={(e) => setValue("categoryHeader", e.target.value)}
          className="custom-class"
          options={categoryHeader}
        />
        {errors.categoryHeader && (
          <p className="text-red-500">{errors.categoryHeader.message}</p>
        )}
        <Upload
          type={"image"}
          setData={(data) =>
            setValue("img", {
              public_id: data.public_id,
              url: data.secure_url,
            })
          }
        >
          <Button type="button" className="text-white md:w-1/4 w-full">
            Add a cover image
          </Button>
        </Upload>
        {existingPost?.img && (
          <img
            src={existingPost?.img}
            alt="image"
            className="w-[350px] h-[350px] object-cover"
          />
        )}
        {errors.img && <p className="text-red-500">{errors.img.message}</p>}

        <Input
          register={register("title")}
          name="title"
          type="text"
          placeholder="title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <SelectInput
          register={register("category")}
          onChange={(e) => setValue("category", e.target.value)}
          className="custom-class"
          options={optionsCategory}
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
              setData={(data) => setValue("image", { url: data.secure_url })}
            >
              🌆
            </Upload>
            <Upload
              type="video"
              setData={(data) => setValue("video", { url: data.secure_url })}
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
          {existingPost ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default AdminCreate;
