import UrlItem from "./Url/UrlItem";

const Url = (props) => {
	return (
		<>
			{
				props.items.map(item => { 
					return (
						<UrlItem key={item.id} item={item} users={item.users} flag={props.flag} />
					)}
				)
			}
		</>
	);
};

export default Url;