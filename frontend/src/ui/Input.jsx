import { cn } from "../utils/cn";

const Input = ({
  className,
  name,
  onChange,
  type,
  loading,
  value,
  placeholder,
  register,
  onKeyDown
}) => {
  return (
    <input
      onChange={onChange}
      name={name}
      {...register}
      value={value}
      placeholder={placeholder}
      type={type}
      onKeyDown={onKeyDown}
      className={cn(
        "bg-black py-2 px-4 rounded-md outline-none text-white",
        className
      )}
      disabled={loading}
    />
  );
};

export default Input;
