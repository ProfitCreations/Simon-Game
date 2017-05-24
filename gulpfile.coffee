gulp = require("gulp");
browserSync = require("browser-sync").create();
sass = require("gulp-sass");
sourcemaps = require('gulp-sourcemaps')
autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', ->
	gulp.src('scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('.'))
	.pipe(browserSync.stream())
	)

gulp.task('serve', ['sass'], ->
	browserSync.init(
		server: '.',
		open: true
		# browser: 'google chrome'
		)
	gulp.watch('scss/*.scss', ['sass'])
	gulp.watch('main.css', ['prefix'])
	gulp.watch('index.html').on('change', browserSync.reload)
	gulp.watch('script.js').on('change', browserSync.reload)
	)

gulp.task('prefix', ->
	gulp.src('main.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('css'))
	)

gulp.task('default', ['serve'])