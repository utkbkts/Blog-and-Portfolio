import { Link } from "react-router-dom";
const BreadCrump = () => {
  return (
    <div className="flex gap-4">
      <Link to={"/"}>Home</Link>
      <span>&gt;</span>
      <span className="text-blue-400">Blogs And Acrticles</span>
    </div>
  );
};

export default BreadCrump;
