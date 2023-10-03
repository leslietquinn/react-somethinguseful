import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import globalInstance from "../../Utils/Axios/GlobalInstance";
import Url from "../Common/Url";

const SitePage = (props) => {  
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [urls, setUrls] = useState([]);

	useEffect(() => {
		setLoading(true);

		async function getUrls(props) { 
			try {
    			const response = await globalInstance.post("/urls/paginated-from-site", JSON.stringify({
    				id: props.site.id,
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
        			setUrls(response.data?.urls?.data); 
        		} 
    		} catch(error) {
    			setError(true);
    			setLoading(false);
    			console.log(error);
    		}
		};

		getUrls(props);
	}, []);

	return (
		<>
			<div className="col-lg-4">
				<div className="card my-1 mb-2">
					<div className="card-body">
						<h1>{props.site.hostname}</h1>
						<hr />
						<Link target="_blank" to={`https://www.${props.site.hostname}`} role="button" className="btn btn-sm btn-dark">VISIT WEBSITE</Link>
					</div>
				</div>
			</div>
			<div className="col-lg-8">
				{loading && <p>Loading...</p>}
				{!loading && !error && !urls && <p>No data to display</p>}
				{!loading && error && <p>We encountered a problem...</p>}
				{!loading && !error && urls?.length > 0 && <Url items={urls} flag={false} />}
			</div>
		</>
	);
};

export default SitePage;