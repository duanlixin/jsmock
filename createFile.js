/*
 * @Author: lixinduan
 * @Date:   2016-04-19 17:35:16
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-19 18:38:40
 */

'use strict';

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
// 文件完整路径
var fileName = args[0];
// 文件内容
var content = args[1];
// 文件目录
var filePath = path.dirname(fileName);

// 按路径检查文件是否存在，若存在则写入内容，若不存在，则按照路径创建文件夹，最后在写入文件
fs.exists(fileName, function(exist) {
    // 如果文件不存在，先创建目录
    if (exist === false) {
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
