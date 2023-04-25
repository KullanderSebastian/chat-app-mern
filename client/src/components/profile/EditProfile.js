import React from "react";
import { useFormik } from "formik";

async function changeUser(body) {
    return fetch("http://localhost:3000/api/changeuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())
}

function EditProfile(props) {
    const onSubmit = async (values) => {
        console.log("submitted");

        const data = await changeUser({
            "username": sessionStorage.getItem("username"),
            "field": props.changeInput,
            "value": values[props.changeInput]
        });

        sessionStorage.setItem("username", data.username);
        props.setParentState("profileDefault");
    }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            [props.changeInput]: props.value
        },
        onSubmit
    });

    return (
        <div className="editProfile">
            <form className="formContainer" onSubmit={handleSubmit}>
                <input
                    id={props.changeInput}
                    name={props.changeInput}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[props.changeInput]}
                    className={errors.email && touched.email ? "input-error" : ""}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;
