import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import Detail from "./Detail";

const Experience = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div
      ref={ref}
      className="md:w-[75%] w-full mx-auto relative container py-16"
    >
      {/* Animasyon Çubuğu */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute top-0 left-9 w-[3px] bg-white origin-top h-full md:block hidden"
      />
      <ul className="space-y-12 md:ml-16">
        <li>
          <Detail
            position="NPM-PACKAGE"
            company="Github"
            title="🎉 CATCH-ASYNC-ERROR"
            address="Istanbul , Turkey"
            work={
              "CatchAsyncError is a lightweight middleware for handling asynchronous errors in your Node.js applications. It simplifies error handling by allowing you to write cleaner code without repetitive try-catch blocks."
            }
            link="https://github.com/utkbkts/catchAsyncError-npm"
          />
        </li>
        {/* 1. Detay */}
        <li>
          <Detail
            position="Full Stack Project"
            company="Github"
            title="🎉 Restaurant Food Ordering"
            address="Istanbul , Turkey"
            work={
              "Backend: Node.js, MongoDB | Frontend: React.js, Ant Design | State Management: React-Redux,Redux-Toolkit, RTKQuery | Validation: React-Hook-Form | Zod, Ant Design Rules | Metadata:React-Helmet | Others: Docker,PM2, Worker"
            }
            link="https://github.com/utkbkts/LezzetBahcesi"
          />
        </li>
        {/* 2. Detay */}
        <li>
          <Detail
            position="Full Stack Project"
            company="Github"
            title="🎉 Matching App"
            address="Istanbul , Turkey"
            work={
              "Backend: Node.js, MongoDB | Frontend: React.js, Typescript,ShadCN | State Management: React-Redux,Redux-Toolkit, RTK Query | Validation: React-Hook-Form | Zod | Metadata:React-Helmet"
            }
            link="https://github.com/utkbkts/matches"
          />
        </li>
        <li>
          <Detail
            position="Full Stack Project"
            company="Github"
            title="🎉 Job application and project sharing platform"
            address="Istanbul , Turkey"
            work={
              "Backend: Node.js, MongoDB,Socket,IO | Frontend: React.js,ShadCN | State Management: React-Redux,Redux-Toolkit, RTK Query | Validation: React-Hook-Form | Zod | Metadata:React-Helmet"
            }
            link="https://github.com/utkbkts/job-application"
          />
        </li>{" "}
        <li>
          <Detail
            position="Full Stack Project"
            company="Github"
            title="🎉 Chat App"
            address="Istanbul , Turkey"
            work={
              "Backend: Node.js, MongoDB,Socket,IO | Frontend: React.js,ShadCN | State Management: React-Redux,Redux-Toolkit, RTK Query | Validation: React-Hook-Form | Zod | Metadata:React-Helmet"
            }
            link="https://github.com/utkbkts/Chat-App"
          />
        </li>{" "}
        <li>
          <Detail
            position="Full Stack Project"
            company="Github"
            title="🎉 Blog And Portfolio"
            address="Istanbul , Turkey"
            work={
              "Backend: Node.js, MongoDB,Socket,IO | Frontend: React.js| State Management: Zustand | Validation: React-Hook-Form | Zod | API Integration : Axios"
            }
            link="https://github.com/utkbkts/utkubektasoglu"
          />
        </li>
      </ul>
    </div>
  );
};

export default Experience;
