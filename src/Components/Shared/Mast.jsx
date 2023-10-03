import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../Hooks/useAuth"; 

import Login from "./Mast/Login";
import Logout from "./Mast/Logout";
import Register from "./Mast/Register";
import SubmitLink from "./Mast/SubmitLink";

function Mast() {
	const location = useLocation();
	const { auth } = useAuth();
	const [loginShow, setLoginShow] = useState(false);
	const [logoutShow, setLogoutShow] = useState(false);
	const [registerShow, setRegisterShow] = useState(false);
	const [submitLinkShow, setSubmitLinkShow] = useState(false);
	const [activeItem, setActiveItem] = useState(false);

	useEffect(() => {
		if(location.pathname === "/account") {
			setActiveItem(4);
		} else { setActiveItem(false);}
	}, [location]);

  	const handleLoginShow = (e) => {
  		e.preventDefault();
  		setLoginShow(true);
  		setActiveItem(0);
  	};

  	const handleLogoutShow = (e) => {
  		e.preventDefault();
  		setLogoutShow(true);
  		setActiveItem(3);
  	};

  	const handleRegisterShow = (e) => {
  		e.preventDefault();
  		setRegisterShow(true);
  		setActiveItem(1);
  	};

  	const handleSubmitLinkShow = (e) => {
  		e.preventDefault();
  		setSubmitLinkShow(true);
  		setActiveItem(2);
  	};

  	const handleLoginClose = () => {
  		setLoginShow(false);
  		setActiveItem(false);
  	};

  	const handleLogoutClose = () => {
  		setLogoutShow(false);
  		setActiveItem(false);

  		if(location.pathname === "/account") {
			setActiveItem(4);
		}
  	};

  	const handleRegisterClose = () => {
  		setRegisterShow(false);
  		setActiveItem(false);
  	};

  	const handleSubmitLinkClose = () => {
  		setSubmitLinkShow(false);
  		setActiveItem(false);

  		// highlight the account link, if we're on that page
  		if(location.pathname === "/account") {
			setActiveItem(4);
		}
  	};

	return (
		<>
			<div className="container sticky-top">
				<div className="row">
					<div className="col-lg-3">&nbsp;</div>
					<div id="mast" className="col-lg-6 my-4 py-4 rounded bg-danger d-flex justify-content-center">
						{!auth?.token && <NavLink onClick={handleLoginShow} className={activeItem === 0 ? "bg-warning rounded" : ""} to="login">Login</NavLink>}
						{!auth?.token && <NavLink onClick={handleRegisterShow} className={activeItem === 1 ? "bg-warning rounded" : ""} to="register">Register</NavLink>}
						{auth?.token && <NavLink onClick={handleLogoutShow} className={activeItem === 3 ? "bg-warning rounded" : ""} to="submit">Logout</NavLink>}
						{auth?.token ? (
							<>
								<NavLink onClick={handleSubmitLinkShow} className={activeItem === 2 ? "bg-warning rounded submit" : "submit"} to="submit">Submit Link</NavLink>
								{auth?.token && <NavLink className={activeItem === 4 ? "bg-warning rounded" : ""} to="account">Account</NavLink>}
							</>
							) : ( 
							<NavLink title="Log in, or Register to submit your links" onClick={(e) => e.preventDefault()} className="disabled" to="submit">Submit Link</NavLink>
							)
						}
					</div>
					<div className="col-lg-3">&nbsp;</div>
				</div>
			</div>

     		<Modal
        		show={loginShow}
        		onHide={handleLoginClose}
        		size="md"
        		centered 
        		keyboard={false}
        		animation={false}
      		>
	        	<Modal.Header closeButton>
	          		<Modal.Title>Login</Modal.Title>
	       		</Modal.Header>
	        	<Modal.Body><Login loginClose={handleLoginClose} /></Modal.Body>
      		</Modal>

     		<Modal
        		show={logoutShow}
        		onHide={handleLogoutClose}
        		size="md"
        		centered 
        		keyboard={false}
        		animation={false}
      		>
	        	<Modal.Header closeButton>
	          		<Modal.Title>Logout</Modal.Title>
	       		</Modal.Header>
	        	<Modal.Body><Logout logoutClose={handleLogoutClose} /></Modal.Body>
      		</Modal>

     		<Modal
        		show={registerShow}
        		onHide={handleRegisterClose}
        		size="md"
        		centered 
        		keyboard={false}
        		animation={false}
      		>
	        	<Modal.Header closeButton>
	          		<Modal.Title>Register</Modal.Title>
	       		</Modal.Header>
	        	<Modal.Body><Register registerClose={handleRegisterClose} /></Modal.Body>
      		</Modal>

     		<Modal
        		show={submitLinkShow}
        		onHide={handleSubmitLinkClose}
        		size="md"
        		centered 
        		keyboard={false}
        		animation={false}
      		>
	        	<Modal.Header closeButton>
	          		<Modal.Title>Submit Link</Modal.Title>
	       		</Modal.Header>
	        	<Modal.Body><SubmitLink submitLinkClose={handleSubmitLinkClose} /></Modal.Body>
      		</Modal>
		</>
	);
};

export default Mast;