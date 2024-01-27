import gulp from "gulp";
const src = gulp.src;
const dest = gulp.dest;

//Config
import path from "../config/path.js";

export default () => {
	return src(path.libsCss.src).pipe(dest(path.libsCss.dest));
};
