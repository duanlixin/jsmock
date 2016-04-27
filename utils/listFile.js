/*
 * @Author: lixinduan
 * @Date:   2016-04-22 11:34:58
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-27 10:21:20
 */

'use strict';

var fs = require('fs');

var fileList = [];

function init (opts) {
    var path = './data' + opts.fileName;
    var dirList = fs.readdirSync(path);

    dirList.forEach(function(item) {
        var item = item || '';
        if (fs.statSync(path + '/' + item).isFile()) {
            fileList.push(path + '/' + item);
        }
    });

    dirList.forEach(function(item) {
        var item = item || '';
        if (fs.statSync(path + '/' + item).isDirectory()) {
            init(path + '/' + item);
        }
    });

    return fileList;
}

exports.init = init;