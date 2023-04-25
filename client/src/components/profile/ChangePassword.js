import React from "react";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../schemas";


async function changePassword(body) {
    return fetch("http://localhost:3000/api/changepassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())
}

function ChangePassword(props) {
    const onSubmit = async (values) => {
        console.log("submitted");

        const data = await changePassword({
            "username": sessionStorage.getItem("username"),
            "password": values.password,
            "newPassword": values.newPassword,
            "newPasswordCheck": values.newPasswordCheck,
        });

        props.setParentState("profileDefault");
    }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            password: "",
            newPassword:  "",
            newPasswordCheck: "",
        },
        validationSchema: changePasswordSchema,
        onSubmit
    });

    return (
        <div className="changePassword">
            <h1>change password</h1>
            <form className="formContainer" onSubmit={handleSubmit}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.password}
                    className={errors.password && touched.password ? "input-error" : ""}
                />
                {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null}
                <label htmlFor="newPassword">New password</label>
                <input
                    id="newPassword"
                    name="newPassword"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.password}
                    className={errors.newPassword && touched.newPassword ? "input-error" : ""}
                />
                {errors.newPassword && touched.newPassword ? (
                    <div>{errors.newPassword}</div>
                ) : null}
                <label htmlFor="password">New password</label>
                <input
                    id="newPasswordCheck"
                    name="newPasswordCheck"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.password}
                    className={errors.newPasswordCheck && touched.newPasswordCheck ? "input-error" : ""}
                />
                {errors.newPasswordCheck && touched.newPasswordCheck ? (
                    <div>{errors.newPasswordCheck}</div>
                ) : null}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default ChangePassword;
