import Marquee from "react-fast-marquee";

const techStack = [
  { src: "/nodejs.png", alt: "nodejs", title: "Node.js", label: "Node.js" },
  { src: "/react.png", alt: "react", title: "React.js", label: "React.JS" },
  { src: "/mongodb.png", alt: "mongodb", title: "MongoDB", label: "MongoDB" },
  {
    src: "/typescript.png",
    alt: "typescript",
    title: "TypeScript",
    label: "TypeScript",
  },
  {
    src: "/javascript.png",
    alt: "javascript",
    title: "JavaScript",
    label: "JavaScript",
  },
  {
    src: "/postgresql.png",
    alt: "postgresql",
    title: "PostgreSQL",
    label: "PostgreSQL",
  },
  { src: "/prisma.png", alt: "prisma", title: "Prisma", label: "Prisma" },
  { src: "/go.png", alt: "go", title: "Go", label: "Go" },
  { src: "/python.png", alt: "python", title: "Python", label: "Python" },
  { src: "/GraphQL.png", alt: "graphql", title: "GraphQL", label: "GraphQL" },
  {
    src: "/MachineLearning.png",
    alt: "machinelearning",
    title: "Machine Learning",
    label: "Machine Learning",
  },
  { src: "/Docker.png", alt: "docker", title: "Docker", label: "Docker" },
  { src: "/ci.png", alt: "ci", title: "CI/CD", label: "CI/CDN" },
  { src: "/SQL.png", alt: "sql", title: "SQL", label: "SQL" },
];

const Slider = () => {
  return (
    <div>
      <Marquee autoFill pauseOnClick>
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="m-1 rounded-xl flex space-x-2 p-2 font-bold text-white text-2xl cursor-pointer hover:scale-105 transition-all duration-200 items-center gap-2"
          >
            <img
              src={tech.src}
              alt={tech.alt}
              title={tech.title}
              className="object-cover h-12 w-12"
            />
            {tech.label}
          </div>
        ))}
      </Marquee>
      <Marquee autoFill pauseOnClick direction="right">
        {techStack.reverse().map((tech, index) => (
          <div
            key={index}
            className="m-1 rounded-xl flex space-x-2 p-2 font-bold text-white text-2xl cursor-pointer hover:scale-105 transition-all duration-200 items-center gap-2"
          >
            <img
              src={tech.src}
              alt={tech.alt}
              title={tech.title}
              className="object-cover h-12 w-12"
            />
            {tech.label}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Slider;
