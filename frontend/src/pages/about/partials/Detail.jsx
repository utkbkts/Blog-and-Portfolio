import { useRef } from "react";
import LiIcon from "../../../components/LiIcon";
import { Link } from "react-router-dom";
const Detail = ({ position, company, title, address, work, link }) => {
  const ref = useRef(null);
  return (
    <section
      ref={ref}
      className="flex flex-col gap-4 text-white font-heading font-bold md:text-2xl text-sm my-12"
    >
      <LiIcon ref={ref} />
      <div className="flex flex-col ">
        <div className="flex items-center gap-3">
          <h1>{title}</h1>
          <Link
            target="_blank"
            to={link}
            className="text-green-400 hover:underline"
          >
            @{company}
          </Link>
        </div>
        <div className="text-slate-400">{position}</div>
      </div>
      <div className="text-slate-400">
        <p>{work}</p>
        <p>{address}</p>
      </div>
    </section>
  );
};

export default Detail;
