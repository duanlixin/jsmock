/*
 * @Author: lixinduan
 * @Date:   2016-04-22 11:34:58
 * @Last Modified by:   dlx
 * @Last Modified time: 2016-05-25 23:28:20
 */

'use strict';

var fs = require('fs');

var fileList = [];

function findFile(filePath) {
    // body...
    var list = [];
    function init (filePath) {
        var dirList = fs.readdirSync(filePath);

        dirList.forEach(function(item) {
            var item = item || '';
            if (fs.statSync(filePath + '/' + item).isFile()) {
                list.push(filePath + '/' + item);
            }
        });

        dirList.forEach(function(item) {
            var item = item || '';
            if (fs.statSync(filePath + '/' + item).isDirectory()) {
                init(filePath + '/' + item);
            }
        });
    }

    init(filePath);

    return list;
}

function init (filePath) {
    return findFile(filePath);
}

exports.init = init;