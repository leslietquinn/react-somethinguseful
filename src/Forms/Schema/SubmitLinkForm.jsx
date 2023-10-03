
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    url: Yup.string()
        .required("Web page url is required")
        .matches(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i, "Enter a valid, properly format url address"),
});

export default formSchema;