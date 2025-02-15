import { Link } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLoginSchema } from "../../validation/createRegisterValidation";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/authApi";
import { useEffect } from "react";
import MetaData from "../../layouts/MetaData";

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
      toast.success("Giriş Başarılı !!");
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
    <>
      <MetaData title={"Login"} />
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-white text-center text-2xl font-heading mb-12">
          Giriş yap
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:w-[400px] w-full"
        >
          <div className="flex flex-col ">
            <label className="text-white text-md font-heading">Email</label>
            <Input
              loading={loginLoading}
              placeholder={"email"}
              register={register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white text-md font-heading">Şifre</label>
            <Input
              placeholder={"Şifre"}
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
              Giriş yap
            </Button>
          </div>
        </form>
        <span className="mt-4 text-white flex items-center gap-1">
          Hesabın yok mu?{" "}
          <Link to={"/kayit-ol"} className="text-blue-400 underline">
            Kayıt ol
          </Link>
        </span>
      </div>
    </>
  );
};

export default Login;
