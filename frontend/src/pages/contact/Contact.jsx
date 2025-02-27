import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSendValidation } from "../../validation/sendMessage";
import ContactSvg from "./partials/ContactSvg";
import { useInView, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useContactSendMutation } from "../../redux/api/contactApi";
import MetaData from "../../layouts/MetaData";

const listVariant = {
  initial: {
    x: 400,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const [token, setToken] = useState("");
  const [contactSend, { isLoading, isError, error, isSuccess }] =
    useContactSendMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSendValidation),
    mode: "onChange",
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success("Mesaj gönderme işlemi başarılı");
      setValue("email", "");
      setValue("desc", "");
      setValue("subject", "");
    }
  }, [isError, isSuccess, error]);

  const onChange = (value) => {
    setToken(value);
    ref.current.reset();
  };

  const onSubmit = async (data) => {
    await contactSend({
      email: data.email,
      message: data.desc,
      subject: data.subject,
      token,
    });
  };
  return (
    <>
      <MetaData title={"İletişim"} />
      <div className="  text-white">
        <div className="flex md:flex-row flex-col mt-44  md:h-[540px]">
          <div className="flex-1" ref={ref}>
            <motion.form
              variants={listVariant}
              animate={isInView ? "animate" : "initial"}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col font-body gap-4 w-full"
            >
              <motion.h1 variants={listVariant} className="text-2xl font-bold">
              Bağlantıda kalalım
              </motion.h1>
              <motion.div variants={listVariant} className="flex flex-col">
                <label>Email</label>
                <Input
                  loading={isLoading}
                  register={register("email")}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </motion.div>
              <motion.div variants={listVariant} className="flex flex-col">
                <label >Konu Başlığı</label>
                <Input
                  loading={isLoading}
                  type="text"
                  register={register("subject")}
                  name="subject"
                  placeholder="Başlık"
                />
                {errors.subject && (
                  <p className="text-red-500">{errors.subject.message}</p>
                )}
              </motion.div>
              <motion.div variants={listVariant} className="flex flex-col">
                <label>Mesaj</label>
                <TextArea
                  loading={isLoading}
                  register={register("desc")}
                  rows={3}
                  name="desc"
                  placeholder="Mesajını gir"
                  className={"resize-none"}
                />
                {errors.desc && (
                  <p className="text-red-500">{errors.desc.message}</p>
                )}
              </motion.div>
              <motion.div variants={listVariant}>
                {" "}
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_REACT_PUBLIC_GOOGLE_KEY}
                  onChange={onChange}
                  ref={ref}
                />
              </motion.div>
              <motion.div variants={listVariant} className="w-full">
                <Button type="submit" loading={isLoading} className={"w-full"}>
                  Gönder
                </Button>
              </motion.div>
            </motion.form>
          </div>
          <div className="md:flex-1 w-full md:mt-0 mt-12">
            <ContactSvg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
