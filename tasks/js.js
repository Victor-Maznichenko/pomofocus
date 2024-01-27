import gulp from "gulp";
const src = gulp.src;
const dest = gulp.dest;

//Config
import path from "../config/path.js";

//Plugins
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import rename from "gulp-rename";

export default () => {
	return src(path.js.src, { sourcemaps: true })
		.pipe(
			plumber({
				errorHandler: notify.onError(error => ({
					title: "Javascript",
					message: error.message,
				})),
			}),
		)
		.pipe(dest(path.js.dest, { sourcemaps: true }))
		.pipe(babel())
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest(path.js.dest, { sourcemaps: true }));
};
