import { useState } from "react";
import authInstance from "../../../Utils/Axios/AuthInstance";
import useAuth from "../../../Hooks/useAuth";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import formSchema from "../../../Forms/Schema/SubmitLinkForm";

function SubmitLink(props) {
    const { auth, setAuth } = useAuth();
    const {register, handleSubmit, reset, setError, formState: { errors }} = useForm({
        // mode options are onBlur, onChange, or onSubmit
        mode: "onSubmit",
        resolver: yupResolver(formSchema),
        defaultValues: {
            url: "",
        },
    });

    const validateSubmit = (props) => (data) => {  
    	submitLinkService({...props, ...data});
    };

    const submitLinkService = async (props) => { 
        try {
            const response = await authInstance.post("/urls/store",
                JSON.stringify({ 
                    url: props.url
                }),
                {
                    headers: { 
	                    "Content-Type": "application/json; charset=UTF-8",
	                    "Accept": "application/json; charset=UTF-8",
	                    "Referrer-Policy": "strict-origin-when-cross-origin",
	                    "Cache-Control": "no-cache",
	                    "Authorization": "Bearer " + auth?.token
	                },
                    withCredentials: true
                }
            );

            // close the popup modal before redirecting
            props.submitLinkClose();
	        toast.success("Your link will appear shortly - go add another", {
	        	position: toast.POSITION.BOTTOM_CENTER,
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				transition: Zoom,
				pauseOnHover: true,
				draggable: false,
				theme: "light",
				toastId: "submit success"
	      	});
        } catch (error) {
            if(error.response.status === 500) {
		        toast.info("You may already have submitted that link", {
		        	position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					transition: Zoom,
					pauseOnHover: true,
					draggable: false,
					theme: "light",
					toastId: "submit info"
		      	});
            }

            if(error.response.status === 409) {
		        toast.error(error.response.data.errors.url[0], {
		        	position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					transition: Zoom,
					pauseOnHover: true,
					draggable: false,
					theme: "light",
					toastId: "submit error"
		      	});
            }
        }
    };

	return (
		<>
			<form onSubmit={handleSubmit(validateSubmit(props))}>
				<label htmlFor="url">Web Page Url</label>
				<input 
					autoFocus
					className="form-control form-control-lg my-2" 
					type="text" 
					id="url" 
					autoComplete="off"
					placeholder="Enter a web page url"
					{
						...register("url")
					}
				/>
				{errors.url?.message && (<p className="error">{errors.url.message}</p>)}

				<button className="btn btn-lg btn-dark w-100">Submit</button>
			</form>
		</>
	);
};

export default SubmitLink;