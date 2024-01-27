import gulp from "gulp";
const src = gulp.src;
const dest = gulp.dest;

//Config
import path from "../config/path.js";

//Plugins
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fileInclude from "gulp-file-include";
import webpHtml from "gulp-webp-html-nosvg";

export default () => {
	return src(path.html.src)
		.pipe(
			plumber({
				errorHandler: notify.onError(error => ({
					title: "HTML",
					message: error.message,
				})),
			}),
		)
		.pipe(fileInclude())
		.pipe(webpHtml())
		.pipe(dest(path.html.dest));
};
