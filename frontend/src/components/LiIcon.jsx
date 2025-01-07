import { motion, useScroll } from "framer-motion";

const LiIcon = ({ ref }) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <figure className="absolute left-0 stroke-white md:block hidden">
      <svg
        className="-rotate-90"
        width={"75"}
        height={"75"}
        viewBox="0 0 100 100"
      >
        <circle
          cx={"75"}
          cy={"50"}
          r={"20"}
          className="stroke-white stroke-1 fill-transparent"
        />
        <motion.circle
          cx={"75"}
          cy={"50"}
          r={"20"}
          className="stroke-[5px] fill-light stroke-white"
          style={{ pathLength: scrollYProgress }}
        />
        <circle
          cx={"75"}
          cy={"50"}
          r={"10"}
          className="stroke-1 animate-pulse fill-purple-500"
        />
      </svg>
    </figure>
  );
};

export default LiIcon;
