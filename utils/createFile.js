/*
 * @Author: lixinduan
 * @Date:   2016-04-19 17:35:16
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-26 16:38:43
 */

'use strict';

var fs = require('fs');
var path = require('path');

var createFile = function(opts) {
    var fileName = opts.fileName;
    var filePath = path.dirname(fileName);
    var content = opts.content;

    fs.exists(filePath, function(exists) {
        if (exists === false) {
            fs.mkdirSync(filePath, function(e) {
                if (e) throw e;
            });
        }

        // 创建新文件
        fs.open(fileName, 'w', function(e, fd) {
            if (e) throw e;
            // fs.write(fd, data[, position[, encoding]], callback)
            fs.write(fd, content, 0, 'utf8', function(e) {
                if (e) throw e;
                fs.closeSync(fd);
            })
        });
    });
}

exports.createFile = createFile;
