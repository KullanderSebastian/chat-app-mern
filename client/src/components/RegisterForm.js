import React from "react";

function RegisterForm() {
    return(
        <div className="registerForm">
            <form className="formContainer">
                <h1>Create your account</h1>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                />
                <label htmlFor="passwordChecker">Password</label>
                <input
                    id="passwordChecker"
                    name="passwordChecker"
                    type="text"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
