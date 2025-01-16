import Upload from "../../components/upload/Upload";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createRegisterSchema } from "../../validation/createRegisterValidation";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";

function Register() {
  const [registerData, { error, isSuccess, isLoading, isError }] =
    useRegisterMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success("Register is successfully !!");
    }
  }, [isSuccess, error, isError]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRegisterSchema),
    mode: "onChange",
  });

  const img = watch("img");

  const handleUpload = (uploadedData) => {
    const { public_id, secure_url } = uploadedData;
    setValue("img", {
      public_id,
      secure_url,
    });
  };

  const onSubmit = async (data) => {
    await registerData({
      username: data.username,
      email: data.email,
      password: data.password,
      img: data.img,
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-white text-center text-2xl font-heading mb-12">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col ">
            <label className="text-white text-md font-heading">Username</label>
            <Input
              loading={isLoading}
              placeholder={"username"}
              register={register("username")}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="text-white text-md font-heading">Email</label>
            <Input
              loading={isLoading}
              placeholder={"email"}
              register={register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-md font-heading">Password</label>
          <Input
            placeholder={"Password"}
            type={"password"}
            loading={isLoading}
            className={"w-full"}
            register={register("password")}
            name={"password"}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="w-12 ">
          <Upload setData={handleUpload} folder={"website/avatar"}>
            {img?.secure_url ? (
              <img
                src={img.secure_url}
                alt="avatar"
                title="avatar-png"
                className="w-44 h-32"
              />
            ) : (
              <img src="/avatar.png" alt="avatar" title="avatar-png" />
            )}
            <input
              type="file"
              name="img"
              className="hidden"
              {...register("img")}
            />
          </Upload>
          {errors.img && (
            <span className="text-red-500 text-sm">{errors.img.message}</span>
          )}
        </div>
        <div>
          <Button
            loading={isLoading}
            type="submit"
            className={"text-white w-full"}
          >
            Create a new account.
          </Button>
        </div>
      </form>
      <span className="mt-4 text-white flex items-center gap-1">
        Do you have an account?{" "}
        <Link to={"/auth/signin"} className="text-blue-400 underline">
          Login
        </Link>
      </span>
    </div>
  );
}

export default Register;
