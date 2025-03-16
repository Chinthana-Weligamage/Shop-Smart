import React from "react";

const Section = ({ children, bgColor = "base-100" }) => {
  return (
    <div className={`h-1/5 px-10 w-full py-10 bg-${bgColor} `}>{children}</div>
  );
};

export default Section;
