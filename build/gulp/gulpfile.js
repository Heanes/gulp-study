const gulp          = require('gulp'),
    rename          = require("gulp-rename"),            // 重命名
    minifycss       = require('gulp-minify-css'),     // 压缩CSS
    uglify          = require('gulp-uglify'),            // 压缩js
    clean           = require('gulp-clean'),              // 清理
    concat          = require('gulp-concat'),            // 连接文件
    autoprefixer    = require('gulp-autoprefixer'),     // 自动前缀
    notify          = require('gulp-notify'),
    sass            = require("gulp-sass");

const pathSrc = '../../src/';

// 压缩非minjs,检查JS
gulp.task('buildJs', function() {
    return gulp.src(['../../src/**/*.js', '!../../src/**/*min.js'])// 要压缩的js文件
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        //.pipe(rename({
        //    suffix: '.min'
        //}))
        //.pipe(uglify()) //使用uglify进行压缩,更多配置请参考：
        .pipe(concat('heanesUI.js'))
        .pipe(gulp.dest('../../dist/js'))//压缩后的路径
        /*.pipe(notify({
            message: 'Scripts task complete'
        }));*/
});


// 压缩非mincss
gulp.task('buildCss', function() {
    return gulp.src('../../src/heanesUI.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        //.pipe(minifycss())
        .pipe(concat('heanesUI.css'))
        .pipe(gulp.dest('../../dist/css'))
        /*.pipe(notify({
            message: 'styles task complete'
        }));*/
});

gulp.task('watch', function() {
    gulp.watch(['../../src/**/*.js', '!../../src/**/*min.js'], ['buildJs']);
    gulp.watch(['../../src/**/*.js', '!../../src/**/*min.js'], function (event) {
        console.log(event.type);
        console.log(event.path);
    });


    gulp.watch('../../src/**/*.scss', ['buildCss']);
    gulp.watch('../../src/**/*.scss', function (event) {
        console.log(event.type);
        console.log(event.path);
    });

});


/**
 * 删除所有编译文件
 */
gulp.task('clean', function() {
    return gulp.src(['../../dist'], {
        read: false
    })
        .pipe(clean({force: true}));
});