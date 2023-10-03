import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import globalInstance from "../Utils/Axios/GlobalInstance";

import SitePage from "./Pages/SitePage";

function Site() {
	const {slug} = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [site, setSite] = useState({});

	useEffect(() => {
		async function getSite() {
			setLoading(true); 

    		try {
    			const response = await globalInstance.post("/sites/find-one", JSON.stringify({
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
        			setSite(response.data?.site); 
        		}  
    		} catch(error) {
    			setError(true);
    			setLoading(false);
    			console.log(error);
    		}
    	};

    	getSite();
	}, [slug]);

	return (
		<>
			<div className="container-fluid bg-light py-4">
				<div className="row">
					
					{loading && <p>Loading...</p>}
					{!loading && !error && !site && <p>No data to display</p>}
					{!loading && error && <p>We encountered a problem...</p>}
					{!loading && !error && site?.id && <SitePage site={site} />}

				</div>
			</div>
		</>
	);
};

export default Site;
