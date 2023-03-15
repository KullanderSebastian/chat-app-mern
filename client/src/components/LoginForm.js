import React, { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useNavigate, Link } from "react-router-dom";
import eyeOutlined from "../images/eye-outlined.svg";
import eyeInvisibleOutlined from "../images/eye-invisible-outlined.svg";

async function loginUser(credentials) {
    return fetch("http://localhost:3000/api/login", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function LoginForm() {
    const navigate = useNavigate();
    const [inputType, setInputType] = useState("password");
    const [toggleEye, setToggleEye] = useState(true);

    const onSubmit = async (values) => {
        const data = await loginUser({
            email: values.email,
            password: values.password
        });

        sessionStorage.setItem("username", data.username);
        navigate("/");
    }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit
    });

    function togglePassword() {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }

        if (toggleEye) {
            setToggleEye(false);
        } else {
            setToggleEye(true);
        }
    }

    return (
        <div className="loginForm">
            <form className="formContainer" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                ) : null}
                <label htmlFor="password">Password</label>
                <div className="passwordToggleClose">
                    <input
                        id="password"
                        name="password"
                        type={inputType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={errors.password && touched.password ? "input-error" : ""}
                    />
                    <img onClick={togglePassword} src={toggleEye ? eyeOutlined : eyeInvisibleOutlined} alt="eye"/>
                </div>
                {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null}
                <button type="submit">Login</button>
                <p>No account? Create one <Link to="/register">here</Link></p>
            </form>
        </div>
    );
}

export default LoginForm;
