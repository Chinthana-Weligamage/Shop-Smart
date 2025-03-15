import React from "react";

const LoginModal = () => {
  return (
    <>
      <a href="#login" className="btn btn-sm rounded-full">
        Login
      </a>

      {/* Put this part before </body> tag */}
      <div className="modal" role="dialog" id="login">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with anchor links</p>
          <div className="modal-action">
            <a href="#" className="btn">
              Yay!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
