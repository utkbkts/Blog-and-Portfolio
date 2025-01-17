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
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Upload from "../../../components/upload/Upload";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../../redux/api/postApi";

const categoryHeader = [
  { value: "Blog", label: "Blog" },
  { value: "Project", label: "Project" },
];
const optionsCategory = [
  { value: "Database", label: "Database" },
  { value: "React.JS", label: "React.JS" },
  { value: "Node.JS", label: "Node.JS" },
  { value: "Javascript", label: "Javascript" },
  { value: "Typescript", label: "Typescript" },
  { value: "Go", label: "Go" },
  { value: "Python", label: "Python" },
  { value: "Cyber Security", label: "Cyber Security" },
  { value: "Software", label: "Software" },
  { value: "English", label: "English" },
];

const AdminCreate = () => {
  const location = useLocation();
  const existingPost = location?.state?.post;
  const navigate = useNavigate();
  const [createPost, { isLoading, isError, error, isSuccess }] =
    useCreatePostMutation();

  const [
    updatePost,
    {
      isLoading: loadingUpdate,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdatePostMutation();

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

  //create
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success("Created Successfully");
      navigate("/");
    }
  }, [error, isSuccess, isError]);

  //update
  useEffect(() => {
    if (updateIsError) {
      toast.error(updateError.response.data.message);
    }
    if (updateSuccess) {
      toast.success("Updated Successfully");
      navigate("/");
    }
  }, [updateError, updateSuccess, updateIsError]);

  useEffect(() => {
    if (existingPost) {
      reset({
        title: existingPost?.title,
        desc: existingPost?.desc,
        category: existingPost?.category,
        categoryHeader: existingPost?.categoryHeader,
        content: existingPost?.content,
        img: existingPost?.img,
      });
    }
  }, [existingPost, reset]);
  //image and video
  const contentHtml = watch("content");
  const image = watch("image");
  const img = watch("img");
  const video = watch("video");

  useEffect(() => {
    if (image && image.url) {
      const currentContent = watch("content") || "";
      const updatedContent = `${currentContent}<p><img src="${image.url}" alt="Uploaded image" /></p>`;
      setValue("content", updatedContent);
    }
  }, []);

  useEffect(() => {
    if (video) {
      const currentContent = watch("content") || "";
      const updatedContent = `${currentContent}<p><iframe class="ql-video" src="${video.url}"></iframe></p>`;
      setValue("content", updatedContent);
    }
  }, []);

  // Create or Update Mutation

  const onSubmit = async (data) => {
    try {
      if (existingPost) {
        await updatePost({
          postId: existingPost?._id,
          body: {
            title: data.title,
            desc: data.desc,
            category: data.category,
            img: data.img,
            categoryHeader: data.categoryHeader,
            content: data.content,
          },
        });
      } else {
        await createPost({
          title: data.title,
          desc: data.desc,
          category: data.category,
          img: data.img,
          categoryHeader: data.categoryHeader,
          content: data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
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
          folder={"website"}
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
        <img
          src={existingPost?.img?.url || img?.url}
          alt="image"
          className="w-[350px] h-[350px] object-cover"
        />
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
              folder={"website"}
              setData={(data) => setValue("image", { url: data.secure_url })}
            >
              🌆
            </Upload>
            <Upload
              type="video"
              folder={"website"}
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
          loading={isLoading || loadingUpdate}
          type="submit"
          className="text-white"
        >
          {existingPost ? "Update" : "Create"}
        </Button>
      </form>
      <div className="lg:text-lg flex flex-col  text-slate-300">
        <div
          className="px-4"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
};

export default AdminCreate;
