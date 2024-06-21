const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const { src, dest, series, parallel, watch } = require("gulp");

function buildStyles() {
	return src("./src/scss/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(cleanCSS())
		.pipe(concat("main.css"))
		.pipe(sourcemaps.write("."))
		.pipe(dest("./dist/css"))
		.pipe(browserSync.stream()); 
}

function buildViews() {
	return src("./src/pug/*.pug")
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(dest("./dist"))
		.pipe(browserSync.stream()); 
}

async function prefixCSS() {
	const autoprefixer = await import("gulp-autoprefixer");
	return src("./dist/css/main.css")
		.pipe(
			autoprefixer.default({
				cascade: false,
			})
		)
		.pipe(dest("./dist/css"));
}

function processScripts() {
	return src("./src/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat("main.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(dest("./dist/js"))
		.pipe(browserSync.stream()); 
}

function processImages() {
	return src("src/images/**/*", { encoding: false })
		.pipe(dest("dist/images"))
		.pipe(browserSync.stream()); 
}

function processFonts() {
	return src("./src/fonts/**/*", { encoding: false })
		.pipe(dest("./dist/fonts"))
		.pipe(browserSync.stream()); 
}

function watchFiles() {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
	});
	watch("./src/scss/**/*.scss", buildStyles);
	watch("./src/pug/**/*.pug", buildViews);
	watch("./src/js/**/*.js", processScripts);
	watch("./src/images/**/*", processImages);
  watch('./src/fonts/**/*', processFonts);
}

exports.buildStyles = buildStyles;
exports.buildViews = buildViews;
exports.prefixCSS = prefixCSS;
exports.processScripts = processScripts;
exports.processImages = processImages;
exports.watch = watchFiles;

exports.default = series(
	parallel(buildStyles, buildViews, processScripts, processImages, processFonts),
	prefixCSS,
	watchFiles
);
