import React, { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }
    localStorage.clear()

    return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li onClick={handleModals} id="register" className="button">
            Je m'inscris
          </li>
          <li onClick={handleModals} id="login" className="button">
            Je me connecte
          </li>
        </ul>
        {signUpModal && <SignupForm />}
        {signInModal && <SigninForm />}
      </div>
    </div>
    );
};

export default Log;