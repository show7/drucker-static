var gulp = require('gulp')
var ftp = require('gulp-ftp')
var util = require('gulp-util')
var exec = require('child_process').exec

// mobile bundle 上传目录
gulp.task('ftp', function () {
    exec(`scp -r dist/* ftpuser@101.132.188.185:/data/static/drucker-static`)
    exec('exit')
})


