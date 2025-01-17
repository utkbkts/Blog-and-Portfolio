import { Link } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLoginSchema } from "../../validation/createRegisterValidation";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/authApi";
import { useEffect } from "react";

const Login = () => {
  const [
    login,
    { error, isSuccess: loginSuccess, isLoading: loginLoading, isError },
  ] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (loginSuccess) {
      toast.success("Login is successfully !!");
    }
  }, [loginSuccess, error, isError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createLoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-white text-center text-2xl font-heading mb-12">
        Sign In
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[400px]"
      >
        <div className="flex flex-col ">
          <label className="text-white text-md font-heading">Email</label>
          <Input
            loading={loginLoading}
            placeholder={"email"}
            register={register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-md font-heading">Password</label>
          <Input
            placeholder={"Password"}
            className={"w-full"}
            loading={loginLoading}
            register={register("password")}
            name={"password"}
            type={"password"}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <Button
            loading={loginLoading}
            type="submit"
            className={"text-white w-full"}
          >
            Sign In
          </Button>
        </div>
      </form>
      <span className="mt-4 text-white flex items-center gap-1">
        Don&apos;t you have an account?{" "}
        <Link to={"/auth/signup"} className="text-blue-400 underline">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default Login;
