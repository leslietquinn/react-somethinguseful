import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import globalInstance from "../Utils/Axios/GlobalInstance";

import UserPage from "./Pages/UserPage";

function User() {
	const {slug} = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		async function getUser() {
			setLoading(true); 

    		try {
    			const response = await globalInstance.post("/users/find-one", JSON.stringify({
    				slug: slug,
    			}),
				{
					headers: { 
						"Content-Type": "application/json; charset=UTF-8",
						"Accept": "application/json; charset=UTF-8",
						"Referrer-Policy": "strict-origin-when-cross-origin",
						"Cache-Control": "no-cache" 
					},
					withCredentials: true
				});
        		
        		if(response.status == 201) {
        			setLoading(false);
        			setUser(response.data?.user); 
        		}  
    		} catch(error) {
    			setError(true);
    			setLoading(false);
    			console.log(error);
    		}
    	};

    	getUser();
	}, [slug]);

	return (
		<>
			<div className="container-fluid bg-light py-4">
				<div className="row">
					
					{loading && <p>Loading...</p>}
					{!loading && !error && !user && <p>No data to display</p>}
					{!loading && error && <p>We encountered a problem...</p>}
					{!loading && !error && user?.id && <UserPage user={user} />}

				</div>
			</div>
		</>
	);
};

export default User;