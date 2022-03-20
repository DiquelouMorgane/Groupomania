import React, { useState } from "react";
import SigninForm from "../../components/Log/SigninForm";
import SignupForm from "../../components/Log/SignupForm";

const Log = ( props ) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

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
        <div className="connectionForm">
            <div className="formContainer">
                <ul>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-button" : null}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-button" : null}>Se connecter</li>
                </ul>
                {signUpModal && <SignupForm />}
                {signInModal && <SigninForm />}
            </div>
        </div>
    );
};

export default Log;