import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import { useNavigate } from "react-router-dom";

async function registerUser(credentials) {
    return fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function RegisterForm() {
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        await registerUser({
            username: values.username,
            email: values.email,
            password: values.password
        });

        navigate("/login");
    }

    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            passwordChecker: "",
        },
        validationSchema: registerSchema,
        onSubmit
    });

    return(
        <div className="registerForm">
            <form className="formContainer" onSubmit={handleSubmit}>
                <h1>Create your account</h1>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className={errors.username && touched.username ? "input-error" : ""}
                />
                {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                ) : null}
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={errors.email && touched.email ? "input-error": ""}
                />
                {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                ): null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={errors.password && touched.password ? "input-error": ""}
                />
                {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ): null}
                <label htmlFor="passwordChecker">Password</label>
                <input
                    id="passwordChecker"
                    name="passwordChecker"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordChecker}
                    className={errors.passwordChecker && touched.passwordChecker ? "input-error": ""}
                />
                {errors.passwordChecker && touched.passwordChecker ? (
                    <div>{errors.passwordChecker}</div>
                ): null}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
