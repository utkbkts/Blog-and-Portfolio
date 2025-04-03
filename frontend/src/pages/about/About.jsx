import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Exprience from "./partials/Exprience";
import MetaData from "../../layouts/MetaData";

const About = () => {
  const words = [
    "Full Stack Developer",
    "Web Designer",
    "Cyber Security",
    "Software Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Cloud Architect",
    "DevOps Specialist",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      <MetaData title={"Hakkımda"} />
      <div className="min-h-screen ">
        <div className="flex md:flex-row flex-col items-center mt-12">
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <div className="relative isolate left-[80%] md:block hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
                />
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="xl:text-4xl  text-[18px]  text-white font-bold font-heading"
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {words[index]}
              </motion.div>
            </AnimatePresence>
            <p className="text-white font-heading xl:text-xl text-[15px]  bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] bg-clip-text ">
            “It takes 20 years to build a reputation, but a cyber incident can destroy it in minutes.” — Stephane Nappo
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <img src="/anon.png" alt="anonymous" title="anonymous" />
          </div>
        </div>
        <section className="mt-24 ">
          <h1 className="text-center text-4xl text-white font-heading">
            Projects
          </h1>
          <Exprience />
        </section>
      </div>
    </>
  );
};

export default About;
