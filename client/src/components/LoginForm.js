import React from "react";

function LoginForm() {
    return (
        <div className="loginForm">
            <form className="formContainer">
                <h1>Login</h1>
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
                <button type="submit">Login</button>
                <p>No account? Create one here</p>
            </form>
        </div>
    );
}

export default LoginForm;
