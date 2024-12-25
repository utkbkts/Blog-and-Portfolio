import { Link } from "react-router-dom";
import Image from "../../../components/image/Image";
import Button from "../../../ui/Button";

const FeaturesProjects = () => {
  return (
    <div className="flex md:flex-row flex-col gap-4 overflow-hidden">
      <Image
        src="/featured1.jpeg"
        alt="project"
        className="rounded-xl object-cover md:w-1/3 w-full aspect-video shadow-md transition-transform duration-300 hover:scale-105"
        title={"project1"}
      />
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-center gap-4">
          <span className="text-slate-300">By Utku Toygun Bektasoglu</span>{" "}
          <span className="text-slate-300">2 Days Ago</span>
          <Link
            to={"/database"}
            className="text-blue-500 hover:underline pt-[1px]"
          >
            Database
          </Link>
        </div>
        <h1 className="font-bold text-3xl">
          Database diffrents is successfully
        </h1>
        <p className="text-slate-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In illum,
          dolorum minima est sint similique eos error? Repudiandae quam
          blanditiis consectetur ullam. Libero ratione fugiat nostrum, facere
          distinctio obcaecati cum exercitationem harum deleniti adipisci
          excepturi nam voluptas iusto. Sapiente, nemo? sint similique eos
          error? Repudiandae quam blanditiis consectetur ullam. Libero ratione
          fugiat nostrum, facere distinctio obcaecati cum exercitationem harum
          deleniti adipisci excepturi nam voluptas iusto. Sapiente, nemo? sint
          similique eos error? Repudiandae quam blanditiis consectetur ullam.
          Libero ratione fugiat nostrum, facere distinctio obcaecati cum
          exercitationem harum deleniti adipisci excepturi nam voluptas iusto.
          Sapiente, nemo?
        </p>
        <Button
          className={
            "w-1/3 hover:bg-opacity-60 transition-all duration-300 mt-auto"
          }
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default FeaturesProjects;
