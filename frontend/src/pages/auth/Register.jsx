import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createRegisterSchema } from "../../validation/createRegisterValidation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import MetaData from "../../layouts/MetaData";

function Register() {
  const [registerData, { error, isSuccess, isLoading, isError }] =
    useRegisterMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success("Sign up success !!");
      navigate("/verify-email");
    }
  }, [isSuccess, error, isError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await registerData({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <MetaData title={"Sign Up"} />
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-white text-center text-2xl font-heading mb-12">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:w-[470px] w-full"
        >
          <div className="flex sm:items-center gap-4 sm:flex-row flex-col">
            <div className="flex flex-col ">
              <label className="text-white text-md font-heading">
                Username
              </label>
              <Input
                loading={isLoading}
                placeholder={"Username"}
                register={register("username")}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full ">
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
          <div>
            <Button
              loading={isLoading}
              type="submit"
              className={"text-white w-full"}
            >
              Create a new account
            </Button>
          </div>
        </form>
        <span className="mt-4 text-white flex items-center gap-1">
          Do you have an account?{" "}
          <Link to={"/giris-yap"} className="text-blue-400 underline">
            Login
          </Link>
        </span>
      </div>
    </>
  );
}

export default Register;
