import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import {
  getCurrentLoggedinUser,
  loginUsingEmailAndPassword,
} from "../../appwrite/auth";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const LoginModal = () => {
  const initialFormStructure = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormStructure);

  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUsingEmailAndPassword(
        formData.email,
        formData.password
      );

      if (!response.$id) {
        throw new Error("Failed to login.");
      }

      const user = await getCurrentLoggedinUser();
      dispatch(setUser(user));

      setFormData(initialFormStructure);

      Swal.fire({
        title: "Success!",
        text: "Your login has been successful.",
        icon: "success",
      }).then(() => {
        window.location.assign("/"); // More secure redirect
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <a href="#login" className="btn btn-sm rounded-full">
        Login
      </a>
      <div className="modal" role="dialog" id="login">
        <div className="modal-box p-10">
          <a href="" className="btn btn-circle absolute right-2 top-2">
            <IoIosClose />
          </a>
          <h3 className="text-lg font-bold text-center">
            👋 Hello! Welcome back
          </h3>
          <p className="py-4 text-center">
            Login to unlock the full potential of Shop Smart! 😉
          </p>
          <form
            className="flex flex-col gap-3 w-full p-5"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  type="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </label>
            </div>

            <div className="mt-5">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>

            <div className="divider text-sm">Also You Can</div>

            {/* Google */}
            <div>
              <button className="btn bg-white text-black border-[#e5e5e5] btn-block">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>

            <div>
              <p className="text-center">
                Don't have an account?{" "}
                <a href="#signup" className="text-primary">
                  Sign up here
                </a>
              </p>
            </div>

            <div>
              <p className="text-center">
                <a href="" className="text-primary">
                  Forgot password?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
