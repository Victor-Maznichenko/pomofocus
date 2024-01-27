const dirSrc = './src';
const dirDest = './public';

export default {
    dirSrc: dirSrc,
    root: dirDest,
    html: {
        src: dirSrc + '/*.html',
        watch: dirSrc + '/**/*.html',
        dest: dirDest
    },
    libsCss: {
        src: dirSrc + '/css/**/*.css',
        watch: dirSrc + '/**/*.css',
        dest: dirDest + '/css',
    },
    scss: {
        src: dirSrc + '/scss/*.scss',
        watch: dirSrc + '/**/*.scss',
        dest: dirDest + '/css',
    },
    js: {
        src: dirSrc + '/js/**/*.js',
        watch: dirSrc + '/js/**/*.js',
        dest: dirDest + '/js',
    },
    img: {
        src: dirSrc + '/images/**/*.{png,jpg,jpeg,gif,svg}',
        watch: dirSrc + '/images/**/*.{png,jpg,jpeg,gif,svg}',
        dest: dirDest + '/images',
    },
    fonts: {
        src: dirSrc + '/fonts/**/*.{ttf,otf,eot,ttc,otc,woff,woff2,svg}',
        watch: dirSrc + '/fonts/**/*.{ttf,otf,eot,ttc,otc,woff,woff2,svg}',
        dest: dirDest + '/fonts',
    }
}