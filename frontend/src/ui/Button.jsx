import { cn } from "../utils/cn";

const Button = ({ className, onClick, type, loading, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn("bg-black py-2 px-4 rounded-md", className)}
      disabled={loading}
    >
      {children}
    </button>
  );
};

export default Button;
