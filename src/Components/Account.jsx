import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Account() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if(!auth?.token) {
	        toast.error("To access your account, log in", {
	        	position: toast.POSITION.BOTTOM_CENTER,
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				transition: Zoom,
				pauseOnHover: true,
				draggable: false,
				theme: "light",
				toastId: "account"
	      	});
	      	navigate("/", { replace: true });
        } 
    }, []);

	return (
		<>
			<h1>Account</h1>
		</>
	);
};

export default Account;