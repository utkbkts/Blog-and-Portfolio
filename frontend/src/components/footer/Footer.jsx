import { BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

export function FooterComponent() {
  const currentDate = new Date().getFullYear();
  return (
    <div className="flex flex-col text-white container mx-auto md:max-w-[1440px]">
      <div className="flex mds:items-start mds:justify-between mds:flex-row flex-col justify-center items-center gap-6 mds:gap-0">
        <img
          src={"/logo.png"}
          alt="logo"
          title="logo-avatar"
          className="w-32 h-32 object-cover"
        />
        <div className="flex flex-col mds:items-start items-center  gap-2">
          <h1 className="text-white font-bold font-heading ">About</h1>
          <div className="flex flex-col gap-1">
            <Link
              to={"/about-us"}
              target="_blank"
              className="cursor-pointer hover:underline"
            >
              Me
            </Link>
            <Link
              to={"/S.S.S"}
              target="_blank"
              className="cursor-pointer hover:underline"
            >
              S.S.S
            </Link>
          </div>
        </div>
        <div className="flex flex-col mds:text-start text-center gap-2">
          <h1 className="text-white font-bold font-heading">Support</h1>
          <div className="flex mds:text-start text-center flex-col gap-1">
            <Link
              to={"/policy"}
              target="_blank"
              className="cursor-pointer hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="cursor-pointer hover:underline">Terms and Conditions</span>
          </div>
        </div>
        <div className="flex flex-col mds:items-start items-center gap-2">
          <h1 className="text-white font-bold font-heading">Follow Me</h1>
          <div className="flex flex-col gap-1">
            <Link
              target="_blank"
              to={" https://www.linkedin.com/in/utku-toygun-bektasoglu/"}
              className="cursor-pointer hover:underline"
            >
              Linkedin
            </Link>
            <Link
              target="_blank"
              to={"https://github.com/utkbkts"}
              className="cursor-pointer hover:underline"
            >
              Github
            </Link>
            <Link
              target="_blank"
              to={"https://www.youtube.com/@DevJourneyYT"}
              className="cursor-pointer hover:underline"
            >
              Youtube
            </Link>
          </div>
        </div>
        <h1 className="text-white font-bold font-heading flex gap-4">
          <Link target="_blank" to={"https://github.com/utkbkts"}>
            <BsGithub
              size={20}
              className="hover:text-blue-600 transition-all duration-300 cursor-pointer"
            />
          </Link>
          <Link
            target="_blank"
            to={"https://www.linkedin.com/in/utku-toygun-bektasoglu/"}
          >
            <BsLinkedin
              size={20}
              className="hover:text-blue-600 transition-all duration-300 cursor-pointer"
            />
          </Link>
          <Link target="_blank" to={"https://www.youtube.com/@DevJourneyYT"}>
            <BsYoutube
              size={20}
              className="hover:text-blue-600 transition-all duration-300 cursor-pointer"
            />
          </Link>
        </h1>
        <div>DevJourney. © {currentDate}</div>
      </div>
    </div>
  );
}
