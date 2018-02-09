const gulp          = require('gulp'),
    clean           = require('gulp-clean'),            // 清理
    notify          = require('gulp-notify'),           // 通知工具，操作系统级别的通知
    concat          = require('gulp-concat'),           // 连接文件
    rename          = require("gulp-rename"),           // 重命名
    gulpSequence    = require('gulp-sequence'),         // 按指定顺序执行任务
    // ------------------------------ js相关 ------------------------------
    uglify          = require('gulp-uglify'),           // 压缩js
    // ------------------------------ css相关 ------------------------------
    minifycss       = require('gulp-minify-css'),       // 压缩CSS
    autoprefixer    = require('gulp-autoprefixer'),     // 自动前缀
    sass            = require("gulp-sass");             // sass解析

const pathSrc = '../../src';
const pathDist = '../../dist';

const outputFile = {
    js: 'heanesUI.js',
    jsMin: 'heanesUI.min.js',

    css: 'heanesUI.css',
    cssMin: 'heanesUI.min.css'
};
const outputPath = {
    js: pathDist + '/js',
    css: pathDist + '/css'
};

/**
 * @doc 构建
 * @author Heanes
 * @time 2018-02-09 14:12:21 周五
 */
gulp.task('build', gulpSequence(['clean', 'buildDev', 'buildProd']));

/**
 * @doc 构建开发用的编译文件
 * @author Heanes
 * @time 2018-02-09 13:14:48 周五
 */
gulp.task('buildDev', gulpSequence(['clean', 'buildJs', 'buildCss']));

/**
 * @doc 构建压缩过的编译文件
 * @author Heanes
 * @time 2018-02-09 13:15:35 周五
 */
gulp.task('buildProd', gulpSequence(['clean'], ['buildJsMin', 'buildCssMin']));


/**
 * @doc 合并压缩js，不包含已被压缩过的即以.min.js结尾的文件
 * @author Heanes
 * @time 2018-02-09 10:58:52 周五
 */
gulp.task('buildJs', function() {
    return gulp.src([pathSrc + '/**/*.js', '!' + pathSrc + '/**/*min.js'])// 要压缩的js文件
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        //.pipe(rename({
        //    suffix: '.min'
        //}))
        .pipe(concat(outputFile.js))
        .pipe(gulp.dest(outputPath.js))//压缩后的路径

        // 完成后通知
        /*.pipe(notify({
            message: 'Scripts task complete'
        }));*/
});

/**
 * @doc 合并压缩js，不包含已被压缩过的即以.min.js结尾的文件
 * @author Heanes
 * @time 2018-02-09 10:58:52 周五
 */
gulp.task('buildJsMin', function() {
    return gulp.src([pathSrc + '/**/*.js', '!' + pathSrc + '/**/*min.js'])// 要压缩的js文件
        .pipe(uglify()) // uglify 压缩
        .pipe(concat(outputFile.jsMin))
        .pipe(gulp.dest(outputPath.js))

        // 完成后通知
        /*.pipe(notify({
            message: 'Scripts task complete'
        }));*/
});


/**
 * @doc 压缩css，不包含已经被压缩过的即以.min.css结尾的文件
 * @author Heanes
 * @time 2018-02-09 10:58:03 周五
 */
gulp.task('buildCss', function() {
    return gulp.src(pathSrc + '/heanesUI.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat(outputFile.css))
        .pipe(gulp.dest(outputPath.css))

        // 完成后通知
        /*.pipe(notify({
            message: 'styles task complete'
        }));*/
});

/**
 * @doc 压缩css，不包含已经被压缩过的即以.min.css结尾的文件
 * @author Heanes
 * @time 2018-02-09 10:58:03 周五
 */
gulp.task('buildCssMin', function() {
    return gulp.src(pathSrc + '/heanesUI.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifycss()) // 压缩css
        .pipe(concat(outputFile.cssMin))
        .pipe(gulp.dest(outputPath.css))

        // 完成后通知
        /*.pipe(notify({
            message: 'styles task complete'
        }));*/
});

/**
 * @doc watch
 * @author Heanes
 * @time 2018-02-09 10:56:24 周五
 */
gulp.task('watch', function() {

    // 对js文件watch
    gulp.watch([pathSrc + '/**/*.js', '!' + pathSrc + '/**/*min.js'], function (event) {
        // watch并将变动的文件输出
        console.log(event.type + ':\t' + event.path);

        // 检测到改变后构建
        gulpSequence('buildJs', function (err) {
            if (err) console.log(err);
            console.log('Build js finish after change.');
        });
    });

    // 对css文件watch
    gulp.watch(pathSrc + '/**/*.scss', function (event) {
        // watch并将变动的文件输出
        console.log(event.type + ':\t' + event.path);

        // 检测到改变后构建
        gulpSequence('buildCss', function (err) {
            if (err) console.log(err);
            console.log('Build css finish after change.');
        });
    });

});


/**
 * @doc 删除所有编译文件
 * @author Heanes
 * @time 2018-02-09 10:56:41 周五
 */
gulp.task('clean', function() {
    return gulp.src([pathDist], {
        read: false
    })
        .pipe(clean({force: true}));
});

/**
 * @doc 删除css编译文件
 * @author Heanes
 * @time 2018-02-09 10:56:41 周五
 */
gulp.task('cleanCss', function() {
    return gulp.src([pathDist + outputPath.css], {
        read: false
    })
        .pipe(clean({force: true}));
});

/**
 * @doc 删除js编译文件
 * @author Heanes
 * @time 2018-02-09 10:56:41 周五
 */
gulp.task('cleanJs', function() {
    return gulp.src([pathDist + outputPath.js], {
        read: false
    })
        .pipe(clean({force: true}));
});