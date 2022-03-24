import React, { useState } from "react";
import Header from "../../components/Header/header";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import "../../styles/index.scss";

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
        <div className="header__login">
            <Header />
            <div className="connectionForm">
                <div className="formContainer">
                    <ul>
                        <li onClick={handleModals} id="register" className={signUpModal ? "active-button" : null}>S'inscrire</li>
                        <li onClick={handleModals} id="login" className={signInModal ? "active-button" : null}>Se connecter</li>
                    </ul>
                    {signUpModal && <SignupForm />}
                    {signInModal && <SigninForm />}
                </div>
                <img className="form_logo" src="../../images/form_logo" alt="groupomania logo"/>
            </div>
        </div>
    );
};

export default Log;