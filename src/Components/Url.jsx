import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import globalInstance from "../Utils/Axios/GlobalInstance";

function Url() {
	const {code, slug} = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [link, setLink] = useState([]);

	useEffect(() => {
		async function getLink() {
			setLoading(true); 

    		try {
    			const response = await globalInstance.post("/links/find-one", JSON.stringify({
    				slug: slug,
    				code: code,
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
        			setLink(response.data?.data); 
        		}  
    		} catch(error) {
    			setError(true);
    			setLoading(false);
    			console.log(error);
    		}
    	};

    	getLink();
	}, []);

	return (
		<>
			<div className="container-fluid bg-light py-4">
				<div className="row">
					<div className="col-lg-2">
						&nbsp;
					</div>
					<div className="col-lg-8">
						<h1>{link.title}</h1>
						{link.description?.length && <h3>{link.description}</h3>}
						<a className="btn btn-primary" role="button" target="_blank" rel="noopener, noreferrer" href={`https://www.${link.hostname}`}>{link.hostname}</a>&nbsp;&nbsp;
						{link.twitter_site?.length && <a className="btn btn-primary" role="button" target="_blank" rel="noopener, noreferrer" href={`https://www.twitter.com/${link.twitter_site}`}>{link.twitter_site}</a>}
						
					</div>
					<div className="col-lg-2">
						&nbsp;
					</div>
				</div>
			</div>
		</>
	);
};

export default Url;