import { cn } from "../utils/cn";

const TextArea = ({
  className,
  name,
  onChange,
  loading,
  value,
  placeholder,
  rows,
  register,
}) => {
  return (
    <textarea
      onChange={onChange}
      rows={rows}
      value={value}
      {...register}
      name={name}
      placeholder={placeholder}
      className={cn(
        "bg-black py-2 px-4 rounded-md outline-none text-white w-full",
        className
      )}
      disabled={loading}
    />
  );
};

export default TextArea;
