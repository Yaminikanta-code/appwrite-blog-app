import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-[#611BF8]",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-2 rounded-lg shadow-xl w-full cursor-pointer ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
