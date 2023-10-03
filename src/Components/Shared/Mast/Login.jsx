import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import globalInstance from "../../../Utils/Axios/GlobalInstance";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import formSchema from "../../../Forms/Schema/LoginForm";

function Login(props) {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const {register, handleSubmit, reset, setError, formState: { errors }} = useForm({
        // mode options are onBlur, onChange, or onSubmit
        mode: "onSubmit",
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: "les@bt.com",
            password: "password",
        },
    });

    const validateSubmit = (props) => (data) => {  
    	loginService({...props, ...data});
    };

    const loginService = async (props) => { 
        try {
            const response = await globalInstance.post("/authenticate/login",
                JSON.stringify({ 
                    email: props.email,
                    password: props.password
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
            
            if(response.status == 200) {
            	const token = response?.data?.token; 
            	const user = response?.data?.user;
        
        		setAuth({ 
					token: token,
					user: user
				}); 

				props.loginClose();
				toast.success("Success! You are logged in", {
		        	position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					transition: Zoom,
					pauseOnHover: true,
					draggable: false,
					theme: "light",
					toastId: "login"
		      	});
				navigate("/account", { replace: true });
            }
        } catch(error) {
        	if(error.response?.status == 401) {
        		toast.info("Sorry! Login details not found", {
		        	position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					transition: Zoom,
					pauseOnHover: true,
					draggable: false,
					theme: "light",
					toastId: "login"
		      	});
        	}
        }
    };

	return (
		<>
			<form onSubmit={handleSubmit(validateSubmit(props))}>
				<label htmlFor="email">Email</label>
				<input 
					autoFocus
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

				<button className="btn btn-lg btn-dark w-100">Log In</button>
			</form>
		</>
	);
};

export default Login;