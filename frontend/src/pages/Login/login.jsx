import React, { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import Header from "../../components/header";

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
    return (
        <div className="main">
            <Header />
            <div className="header__login">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-button" : null}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-button" : null}>Se connecter</li>
                </ul>
                {signUpModal && <SignupForm />}
                {signInModal && <SigninForm />}
            </div>
        </div>
        </div>
    );
};

export default Log;