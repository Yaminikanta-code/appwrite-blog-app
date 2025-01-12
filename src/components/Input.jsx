import React from "react";
import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { lable, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      {lable && (
        <label className="inline-block mb-2 pl-2 text-sm" htmlFor={id}>
          {lable}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
