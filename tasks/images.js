import gulp from "gulp";
const src = gulp.src;
const dest = gulp.dest;

//Config
import path from "../config/path.js";

//Plugins
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";

export default () => {
	return src(path.img.src)
		.pipe(newer(path.img.dest))
		.pipe(webp())
		.pipe(dest(path.img.dest))
		.pipe(src(path.img.src))
		.pipe(newer(path.img.dest))
		.pipe(
			imagemin({
				verbose: true,
			}),
		)
		.pipe(dest(path.img.dest));
};
