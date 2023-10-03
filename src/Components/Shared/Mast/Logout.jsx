import { useNavigate } from "react-router-dom";
import useLogout from "../../../Hooks/useLogout";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout(props) {
	const navigate = useNavigate();
    const logout = useLogout();

    const logOut = async () => {
        await logout();

        props.logoutClose();
        toast.success("Success! You are logged out", {
        	position: toast.POSITION.BOTTOM_CENTER,
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			transition: Zoom,
			pauseOnHover: true,
			draggable: false,
			theme: "light",
			toastId: "logout"
      	});
        navigate("/");
    };

	return (
		<>
			<button onClick={logOut} className="btn btn-lg btn-dark w-100">Log Out</button>
		</>
	);
};

export default Logout;