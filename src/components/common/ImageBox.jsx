import React from "react";

const ImageBox = ({ children, imageSrc }) => {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("imageModal").showModal()}
      >
        {children}
      </button>
      <dialog id="imageModal" className="modal">
        <div className="modal-box">
          <img
            src={imageSrc}
            alt="Image"
            className="w-full h-auto bg-contain"
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ImageBox;
