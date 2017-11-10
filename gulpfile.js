const gulp = require('gulp'),
	  browserSync = require('browser-sync');

gulp.task('default', () => {
    gulp.start('server');
});

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});