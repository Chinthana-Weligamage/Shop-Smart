import React from "react";

const Section = ({ children, bgColor = "base-200" }) => {
  return (
    <div className={`min-h-3/4 px-10 w-full bg-${bgColor} `}>{children}</div>
  );
};

export default Section;
