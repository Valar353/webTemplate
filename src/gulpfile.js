var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), // Подключаем Sass пакет
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

// gulp.task('cancat', function(){
//     return gulp.src('src/sass/*.sass') // Берем источник
//         .pipe(concat('style.sass'))
//         .pipe(gulp.dest('src/sass'))
// });

gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src('sass/style.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('../web/css')) // Выгружаем результата в папку css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});
gulp.task('img', function() {
    gulp.src('img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('../web/img'));
});
gulp.task('js', function() { // Создаем таск "js"
    return gulp.src('js/*.js') // Берем источник
        .pipe(concat('script.js'))
        .pipe(uglify()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('../web/js')) // Выгружаем результата в папку css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});
gulp.task('watch', ['browser-sync', 'sass', 'js'], function() {
    gulp.watch('sass/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('js/*.js', ['js']); // Наблюдение за sass файлами
    gulp.watch('../views/site/*.php', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
});


gulp.task('default', ['watch']);

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync.init({ // Выполняем browser Sync
        proxy: 'template',
        notify: false // Отключаем уведомления
    });
});