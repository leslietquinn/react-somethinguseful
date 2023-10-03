import { useNavigate } from "react-router-dom";
import { useState } from "react";
import globalInstance from "../../../Utils/Axios/GlobalInstance";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import formSchema from "../../../Forms/Schema/RegisterForm";

function Register(props) {
    const navigate = useNavigate();
    const {register, handleSubmit, reset, setError, formState: { errors }} = useForm({
        // mode options are onBlur, onChange, or onSubmit
        mode: "onSubmit",
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: "",
            password: "password",
            confirm_password: "password",
            username: "",
            accept: false,
        },
    });

    const validateSubmit = (props) => (data) => {  
    	registerService({...props, ...data});
    };

    const registerService = async (props) => { 
        try {
            const response = await globalInstance.post("/authenticate/register",
                JSON.stringify({ 
                    email: props.email,
                    password: props.password,
                    username: props.username
                }),
                {
                    headers: { 
	                    "Content-Type": "application/json; charset=UTF-8",
	                    "Accept": "application/json; charset=UTF-8",
	                    "Referrer-Policy": "strict-origin-when-cross-origin",
	                    "Cache-Control": "no-cache" 
	                },
                    withCredentials: true
                }
            );

            if(response.status == 201) {
	            // close the popup modal before redirecting
	            props.registerClose();
		        toast.success("Success! You are now registered", {
		        	position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					transition: Zoom,
					pauseOnHover: true,
					draggable: false,
					theme: "light",
					toastId: "register"
		      	});
	            navigate("/", { replace: true });
            }
        } catch(error) {
            if(error.response?.status == 409) {
            	const keys = Object.keys(error.response.data?.errors);
	            keys.forEach((key, index) => {
	                setError(key, {
	                    type: "server",
	                    message: error.response.data?.errors[key],
	                });
	            });
            } 
        }
    };

	return (
		<>
			<form onSubmit={handleSubmit(validateSubmit(props))}>
				<label htmlFor="username">Username</label>
				<input 
					autoFocus
					className="form-control form-control-lg my-2" 
					type="text" 
					id="username" 
					autoComplete="off"
					placeholder="Enter a username" 
					{
						...register("username")
					}
				/>
				{errors.username?.message && (<p className="error">{errors.username.message}</p>)}

				<label htmlFor="email">Email</label>
				<input 
					className="form-control form-control-lg my-2" 
					type="text" 
					id="email" 
					autoComplete="off"
					placeholder="Enter an email address" 
					{
						...register("email")
					}
				/>
				{errors.email?.message && (<p className="error">{errors.email.message}</p>)}

				<label htmlFor="password">Password</label>
				<input 
					className="form-control form-control-lg my-2" 
					type="password" 
					id="password" 
					placeholder="Enter a password" 
					{
						...register("password")
					}
				/>
				{errors.password?.message && (<p className="error">{errors.password.message}</p>)}
				
				<label htmlFor="confirm_password">Confirm Password</label>
				<input 
					className="form-control form-control-lg my-2" 
					type="password" 
					id="confirm_password" 
					placeholder="Enter password once again" 
					{
						...register("confirm_password")
					}
				/>
				{errors.confirm_password?.message && (<p className="error">{errors.confirm_password.message}</p>)}

				<div className="form-check">
					<input 
						className="form-check-input my-2"
						type="checkbox" 
						id="accept" 
						{
							...register("accept")
						}
					/>
					<label className="form-check-label" htmlFor="accept">Accept Terms?</label>
				</div>
				{errors.accept?.message && (<p className="error">{errors.accept.message}</p>)}

				<button className="btn btn-lg btn-dark w-100">Register</button>
			</form>
		</>
	);
};

export default Register;