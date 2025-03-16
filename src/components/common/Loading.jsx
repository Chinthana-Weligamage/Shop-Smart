import React from "react";
import LoadingImage from "../../assets/loading-1.svg";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-base-200">
      <img src={LoadingImage} alt="Loading..." width={"200px"} />
    </div>
  );
};

export default Loading;
