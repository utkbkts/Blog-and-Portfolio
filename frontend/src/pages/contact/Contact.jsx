import { useMutation } from "@tanstack/react-query";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSendValidation } from "../../validation/sendMessage";
import ContactSvg from "./partials/ContactSvg";
import { useInView, motion } from "framer-motion";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-200px" });
  const [token, setToken] = useState("");
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSendValidation),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(`/contact/send`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully.");
      setValue("email", "");
      setValue("desc", "");
      setValue("subject", "");
    },
    onError: () => {
      toast.error("Something went wrong !!");
    },
  });

  const onChange = (value) => {
    setToken(value);
  };

  const onSubmit = (data) => {
    mutate({
      email: data.email,
      message: data.desc,
      subject: data.subject,
      token,
    });
  };
  return (
    <div className=" bg-gray-100 text-white">
      <div className="flex md:flex-row flex-col mt-44  md:h-[400px]">
        <div className="flex-1" ref={ref}>
          <motion.form
            variants={listVariant}
            animate={isInView ? "animate" : "initial"}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col font-body gap-4 w-full"
          >
            <motion.h1 variants={listVariant} className="text-2xl font-bold">
              Let&apos;s keep in touch
            </motion.h1>
            <motion.div variants={listVariant} className="flex flex-col">
              <label>Email</label>
              <Input
                loading={isPending}
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
              <label className="">Subject</label>
              <Input
                loading={isPending}
                type="text"
                register={register("subject")}
                name="subject"
                placeholder="Subject"
              />
              {errors.subject && (
                <p className="text-red-500">{errors.subject.message}</p>
              )}
            </motion.div>
            <motion.div variants={listVariant} className="flex flex-col">
              <label>Message</label>
              <TextArea
                loading={isPending}
                register={register("desc")}
                rows={3}
                name="desc"
                placeholder="Message"
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
              />
            </motion.div>
            <motion.div variants={listVariant} className="w-full">
              <Button type="submit" loading={isPending} className={"w-full"}>
                Send
              </Button>
            </motion.div>
          </motion.form>
        </div>
        <div className="md:flex-1 w-full md:mt-0 mt-12">
          <ContactSvg />
        </div>
      </div>
    </div>
  );
};

export default Contact;
