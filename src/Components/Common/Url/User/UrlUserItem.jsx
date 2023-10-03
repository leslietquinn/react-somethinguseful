import { Link } from "react-router-dom";

const UrlUserItem = (props) => {

	return (
		<>
			{
				props.index > 2 ? ( 
					<>
						and others
					</>
				) : (
					<Link to={`/user/${props.user.slug}`}>
						{props.user.username}
					</Link>
				)
			}{props.index +1 !== props.size && ","}&nbsp;
		</>
	);
};

export default UrlUserItem;
