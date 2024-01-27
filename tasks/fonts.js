import gulp from "gulp";
const src = gulp.src;
const dest = gulp.dest;

//Config
import path from "../config/path.js";

//Plugins
import newer from "gulp-newer";
import fonter from "gulp-fonter";
import tt2Woff2 from "gulp-ttf2woff2";

export default () => {
	return src(path.fonts.src)
		.pipe(newer(path.fonts.dest))
		.pipe(
			fonter({
				formats: ["ttf", "woff"],
			}),
		)
		.pipe(dest(path.fonts.dest))
		.pipe(tt2Woff2())
		.pipe(dest(path.fonts.dest));
};
