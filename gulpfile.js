var gulp = require('gulp');
var rev = require('gulp-rev');//给每个文件添加版本号
var revReplace = require('gulp-rev-replace');//更新index里面的引用
var useref = require('gulp-useref');//可以通过注释的方法写一些方式
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');//压缩js代码
var csso = require('gulp-csso');//压缩CSS

gulp.task('default',function () {
        var jsFilter = filter('**/*.js',{restore: true});
        var cssFilter = filter('**/*.css',{restore:true});
        var indexHtmlFilter = filter(['**/*', '!**/index.html'],{restore:true});

        return gulp.src('index.html')
            .pipe(useref())
            .pipe(jsFilter)
            .pipe(uglify())
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe(csso())
            .pipe(cssFilter.restore)
            .pipe(indexHtmlFilter)
            .pipe(rev())
            .pipe(indexHtmlFilter.restore)
            .pipe(revReplace())
            .pipe(gulp.dest('dist'));



})
