// Налаштування Gulp плагінів. Беремо налаштування з інструкцій для встановлення та корегуємо під проект
const gulp        = require('gulp'); 
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

// Створюємо задачу
gulp.task('server', function() { /* Назва задачі та функція */

    browserSync({
        server: {
            baseDir: "src" /* Показуємо з якої папки брати файли */
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
        .pipe(gulp.dest("src/css")) /* Шлях куди повинен переміститися зкомпільований файл стилів */
        .pipe(browserSync.stream()); /* Обновити сторінку сервера після збереження стилів */
});

// Відстеження змін в файлах SASS та CSS
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); /* Запускаємо размо команди */