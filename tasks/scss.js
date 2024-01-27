import gulp from "gulp";
const src = gulp.src;
const dest = gulp.dest;

//Config
import path from "../config/path.js";

//Plugins
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand";
import cssMediaQueries from "gulp-group-css-media-queries";
import webpCss from "gulp-webp-css";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

export default () => {
	return src(path.scss.src)
		.pipe(sass())
		.pipe(webpCss())
		.pipe(autoprefixer())
		.pipe(shorthand())
		.pipe(cssMediaQueries())
		.pipe(size({ title: "style.css" }))
		.pipe(dest(path.scss.dest))
		.pipe(dest(path.dirSrc + "/css"))
		.pipe(rename({ suffix: ".min" }))
		.pipe(csso())
		.pipe(size({ title: "style.min.css" }))
		.pipe(dest(path.scss.dest));
};
