import { motion } from "framer-motion";

const Introduction = () => {
  const textTitle =
    "Explore a curated collection of my projects, thoughts, and ideas that blend innovation with creativity. Whether you're here for inspiration, collaboration, or just curiosity, dive in and discover what makes my journey unique.";

  return (
    <div className="text-center p-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          staggerChildren: 0.2,
        }}
        className="font-bold text-4xl mb-4"
      >
        Welcome to My Creative Space
      </motion.h1>
      <motion.h1
        transition={{ duration: 1 }}
        className=" text-[18px]  text-center"
      >
        {textTitle.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.05,
              duration: 0.3,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default Introduction;
