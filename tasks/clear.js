//Config
import path from "../config/path.js";
import del from "del";

//Clear files
export default () => {
	return del(path.html.dest);
};
