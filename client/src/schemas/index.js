import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Too short")
        .max(30, "Too long")
        .required("Required"),
    email: Yup.string().email("Invalid email")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password needs to be atleast 8 characters")
        .required("Required"),
    passwordChecker: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email")
        .required("Required"),
    password: Yup.string()
        .required("Required")
});

export const meessage = Yup.object().shape({
    message: Yup.string()
        .required("You cant send an empty message")
});

export const editProfileSchema = Yup.object().shape({
    email:  Yup.string().email("Invalid email")
        .required("Required"),
    username: Yup.string()
        .min(3, "Too short")
        .max(30, "Too long")
        .required("Required")
});

export const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password needs to be atleast 8 characters")
        .required("Required"),
    newPassword: Yup.string()
        .min(8, "Password needs to be atleast 8 characters")
        .required("Required"),
    passwordChecker: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
})
