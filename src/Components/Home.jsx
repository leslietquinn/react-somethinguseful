import { useState, useEffect } from "react";
import globalInstance from "../Utils/Axios/GlobalInstance";

import Url from "./Common/Url";

function Home() {
	const [urls, setUrls] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function getData() {
			setLoading(true);

    		try {
    			const response = await globalInstance.post("/urls/paginated", {},
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
        			setUrls(response.data?.urls.data); 
        		}  
    		} catch(error) {
    			setError(true);
    			setLoading(false);
    			console.log(error);
    		}
    	};

    	getData();
    }, []);

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<h2>Latest</h2>
						{loading && <p>Loading...</p>}
						{!loading && !error && !urls && <p>No data to display</p>}
						{!loading && error && <p>We encountered a problem...</p>}
						{!loading && !error && urls?.length > 0 && <Url items={urls} flag={true} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;