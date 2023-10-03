import axios from "axios";

const authInstance = axios.create({
	baseURL: "http://somethinguseful.com/api/v1",
  	timeout: 0,
  	headers: {
  		"Content-Type": "application/json; charset=UTF-8",
		"Accept": "application/json; charset=UTF-8",
		"Referrer-Policy": "strict-origin-when-cross-origin",
		"Cache-Control": "no-cache"
  	},
  	withCredentials: true,
  	responseType: "json",
  	responseEncoding: "utf8",
});

export default authInstance;