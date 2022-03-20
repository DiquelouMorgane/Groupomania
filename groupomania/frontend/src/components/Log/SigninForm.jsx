import React, { useState } from "react";
import axios from "axios";

function SigninForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: `http://localhost:5000/api/auth/login/`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
        .then((res) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch((errors) => {
            emailError.innerHTML = errors.email;
            passwordError.innerHTML = errors.password;
        });
    };
    return (
        <form action="" onSubmit={handleLogin} id="signUpForm">
            <label htmlFor="email">Email</label>
            <br/>
            <input type="text" name="email" id="email" onChange={(e) => setEmail (e.target.value)} value={email}/>
            <div className="email error"></div>
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className="password error"></div>
            <input type="submit" value="Se connecter"/>
        </form>
    );
};

export default SigninForm;