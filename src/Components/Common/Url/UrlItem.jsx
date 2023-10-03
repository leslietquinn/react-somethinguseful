import { Link } from "react-router-dom";
import UrlUserItem from "./User/UrlUserItem";

const UrlItem = (props) => {
	return (
		<>
			<div className="card my-1 mb-2">
				<div className="card-body">
					<span className="py-2 truncate-1">Added by&nbsp;
    				{
    					props.users.map((user, i) => { 
							return (
								<UrlUserItem key={user.id} index={i} user={user} size={props.users.length} />
							)}
						)
					}{props.item.human_friendly}</span>
					<h3 className="card-title">
    					<a className="truncate-2" target="_blank" rel="noopener, noreferrer" href={`${props.item.url}`}>{props.item.title}</a>
    				</h3>
    				{props?.flag && <Link to={`/site/${props.item.hostname.slug}`} role="button" className="btn btn-sm btn-dark">{props.item.hostname.hostname}</Link>}
    			</div>
			</div>
		</>
	);
};

export default UrlItem;
