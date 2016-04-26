/*
 * @Author: lixinduan
 * @Date:   2016-04-22 11:34:58
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-26 19:19:10
 */

'use strict';

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
// 文件完整路径
var fileName = args[0];
// 文件目录
var filePath = path.dirname(fileName);
var fileList = [];
function walk(path) {
    var dirList = fs.readdirSync(path);

    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isFile()) {
            fileList.push(path + '/' + item);
        }
    });

    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(path + '/' + item);
        }
    });
}

walk(fileName);
console.log(fileList);



var init = function (opts) {
    var dirList = fs.readdirSync(opts.fileName);

    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isFile()) {
            fileList.push(path + '/' + item);
        }
    });

    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(path + '/' + item);
        }
    });

    return fileList;
}

exports.init = init;