import { Outlet, NavLink } from "react-router-dom";

import Mast from "./Shared/Mast";

function Public() {

	return (
		<>
			<div className="container-fluid body-background">
                <div className="row">
                    <div className="col-lg-12">
                        <Mast />
                    </div> 
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        &nbsp;<NavLink to="/">Home</NavLink>
                        <NavLink to="about">About</NavLink>
                        <NavLink to="account">Account</NavLink>
                        <br />
                        <Outlet />
                        <br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        &nbsp;<NavLink to="/">Home</NavLink>
                        <NavLink to="about">About</NavLink>
                        <NavLink to="account">Account</NavLink>
                    </div>
                </div>
            </div>
		</>
	);
};

export default Public;