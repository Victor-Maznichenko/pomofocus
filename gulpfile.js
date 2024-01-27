import gulp from "gulp";
const watch = gulp.watch;
const series = gulp.series;
const parallel = gulp.parallel;
import browserSync from 'browser-sync';

//Config
import path from './config/path.js';

//Plugins
import clear from './tasks/clear.js';
import html from './tasks/html.js';
import libsCss from './tasks/libscss.js';
import scss from './tasks/scss.js';
import js from './tasks/js.js';
import images from './tasks/images.js';
import fonts from './tasks/fonts.js';


//build
const build = series(
  clear,
    parallel(html, libsCss, scss, js, images, fonts)
);

//Server
const server = () => {
    browserSync.init({
        server:{
            baseDir: path.html.dest
        }
    });
}

//Observer
const observer = () => {
    watch(path.html.watch, html).on('all', browserSync.reload)
    watch(path.scss.watch, scss).on('all', browserSync.reload)
    watch(path.js.watch, js).on('all', browserSync.reload)
    watch(path.img.watch, images).on('all', browserSync.reload)
    watch(path.fonts.watch, fonts).on('all', browserSync.reload)
}

//Export
export {html};
export {scss};
export {js};
export {images};
export {fonts};
export {watch};
export {clear};
export {build};


//Последовательный запуск задач (сначала html потом observer)
export default series(
    build,
    //Одновременный запуск задач (наблюдатель паралельно с сервером чтобы работал)
    parallel(server, observer)
);