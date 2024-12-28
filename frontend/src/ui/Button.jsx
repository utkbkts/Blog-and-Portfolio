import { cn } from "../utils/cn";
import MoonLoader from "react-spinners/MoonLoader";

const Button = ({ className, onClick, type = "button", loading, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "bg-black py-2 px-4 rounded-md flex items-center justify-center",
        loading ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      disabled={loading}
    >
      {loading ? <MoonLoader size={20} color="#fff" /> : children}
    </button>
  );
};

export default Button;
