const { src, dest, watch, series } = require('gulp');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');

const browsersync = require('browser-sync').create();

const paths = {
  styles: {
    srcPoint: './src/styles/main.css',
    src: './src/styles/**/*.css',
    dest: './dist',
  },
};

function styles() {
  return src(paths.styles.srcPoint)
    .pipe(postcss([
      atImport(),
      autoprefixer(),
      cssnano()]
    ))
    .pipe(dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

function serve() {
  browsersync.init({
    server: {
      baseDir: './',
    },
    open: false,
  });
}

function start(cb) {
  watch(paths.styles.src, styles);
  cb();
}

exports.styles = styles;
exports.default = series(start, serve);
