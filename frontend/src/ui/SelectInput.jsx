import { useState } from "react";
import { cn } from "../utils/cn";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const SelectInput = ({
  options = [],
  value,
  onChange,
  className,
  placeholder = "Select an option",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");

  const handleSelect = (optionValue) => {
    setSelected(optionValue);
    setIsOpen(false);
    if (onChange) onChange(optionValue);
  };
  return (
    <div className={cn("relative", className)} {...props}>
      <div
        className="bg-black py-2 px-4 rounded-md outline-none text-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected
          ? options.find((opt) => opt.value === selected)?.label
          : placeholder}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <ul className="absolute bg-black mt-1 rounded-md w-full max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="py-2 px-4 text-white cursor-pointer hover:bg-slate-700"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
