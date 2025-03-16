import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { logoutCurrentUser } from "../../appwrite/auth";
import Swal from "sweetalert2";

const LogoutModal = () => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await logoutCurrentUser();

      if (!response) {
        throw new Error("Failed to logout.");
      }

      Swal.fire({
        title: "Success!",
        text: "You have been logged out successful.",
        icon: "success",
      }).then(() => {
        window.location.assign("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <a href="#logout" className="btn btn-sm rounded-full">
        Log Out
      </a>
      <div className="modal" role="dialog" id="logout">
        <div className="modal-box p-10">
          <a href="" className="btn btn-circle absolute right-2 top-2">
            <IoIosClose />
          </a>
          <h3 className="text-lg font-bold text-center">
            🩷 Thank you & Come again!
          </h3>
          <p className="py-4 text-center">
            Come back again soon to Shop Smart... 😎
          </p>
          <form
            className="flex flex-col gap-3 w-full p-5"
            onSubmit={handleFormSubmit}
          >
            <div className="mt-5">
              <button
                type="submit"
                className="btn btn-primary btn-soft btn-block"
              >
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
