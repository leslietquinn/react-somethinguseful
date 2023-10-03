
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Enter a valid, properly format email address"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password length should be at least 6 characters")
        .max(32, "Password cannot exceed more than 32 characters")
        .matches(/^[a-zA-Z0-9_@#]+$/, "Enter characters a-z, A-Z, 0-9 and _@# only"),
});

export default formSchema;