/*
 * @Author: lixinduan
 * @Date:   2016-04-22 11:34:58
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-05-16 16:14:02
 */

'use strict';

var fs = require('fs');

var fileList = [];

function init (filePath) {
    var dirList = fs.readdirSync(filePath);

    dirList.forEach(function(item) {
        var item = item || '';
        if (fs.statSync(filePath + '/' + item).isFile()) {
            fileList.push(filePath + '/' + item);
        }
    });

    dirList.forEach(function(item) {
        var item = item || '';
        if (fs.statSync(filePath + '/' + item).isDirectory()) {
            init(filePath + '/' + item);
        }
    });

    return fileList;
}

exports.init = init;