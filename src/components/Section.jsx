import React from "react";

const Section = ({ children, bgColor = "base-100" }) => {
  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center pt-10 bg-${bgColor} `}
    >
      {children}
    </div>
  );
};

export default Section;
