import { cn } from "../utils/cn";

const SelectInput = ({ register, onChange, className }) => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <select
      {...register}
      onChange={onChange}
      className={cn(
        "bg-black py-3 px-4 rounded-md outline-none text-white",
        className
      )}
    >
      {options.map((item, index) => (
        <option value={item.value} key={index}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
