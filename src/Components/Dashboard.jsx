import {Outlet, Link} from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function Dashboard() {

	return (
		<>
			<h1>Dashboard</h1>
			<br />
            <Link to="/dashboard">Dashboard</Link>
		</>
	);
};

export default Dashboard;