// Налаштування Gulp плагінів. Беремо налаштування з інструкцій для встановлення та корегуємо під проект
const gulp        = require('gulp'); 
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
// const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Створюємо задачу
gulp.task('server', function() { /* Назва задачі та функція */

    browserSync({
        server: {
            baseDir: "dist" /* Показуємо з якої папки брати файли */
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload); /* Відстеження змін в html */
});

gulp.task('styles', function() { /* Задача для компіляції стилів */
    return gulp.src("src/sass/**/*.+(scss|sass)") /* Звідки беремо файли */
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* Стискаємо файл стилів */
        .pipe(rename({suffix: '.min', prefix: ''})) /* Додати до назви файлу стилів суфікс min */
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css")) /* Шлях куди повинен переміститися зкомпільований файл стилів */
        .pipe(browserSync.stream()); /* Обновити сторінку сервера після збереження стилів */
});

// Відстеження змін в файлах SASS та CSS та HTML
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

// Мінімізуємо файл html та переводимо його до папки dist
gulp.task('html', function(){
    return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));

});

gulp.task('scripts', function(){
    return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function(){
    return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function(){
    return gulp.src("src/icons/**/*")
    .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function(){
    return gulp.src("src/mailer/**/*")
    .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function(){
    return gulp.src("src/img/**/*")
    // .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images')); /* Запускаємо размо команди */