/*
* @Author: lixinduan
* @Date:   2016-04-20 10:16:23
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-04-25 20:56:40
*/

'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
// 按行读入文件内容
var lineReader = require('line-reader');

// 引入配置文件
var config = require('../config');

var configObj = {};

for(var key in config) {
    configObj[key] = config[key];
}

var init = function init(opts) {
    var request = opts.request;
    var response = opts.response;
    var callback = opts.callback;

    // 取出get参数
    var query = url.parse(request.url, true).query;
    // 保存的文件名
    var name = query.name;
    // 保存的模板内容
    var tpl = query.tpl;
    // 拼接实际路径
    var filePath = './data' + name;

    var exampleFile = './example.js';

    var newJsonFile = [];

    lineReader.eachLine(exampleFile, function(line, last) {
        newJsonFile.push(line);
        newJsonFile.push('\n');
        if (line == 'var templateData = ') {
            newJsonFile.push(query.tpl);
            newJsonFile.push('\n');
        }
        if (last) {
            fs.open(filePath, 'w', function(e, fd) {
                if (e) throw e;
                fs.write(fd, newJsonFile.join(''), 0, 'utf8', function(e) {
                    if (e) throw e;
                    fs.closeSync(fd);
                })
            });
            return false; // stop reading
        }

    });

    var configFile =  './config.js';
    var basenamePos = name.indexOf('.');
    var newConfig = [];
    var fileName = name.substr(0, basenamePos);

    // configObj[fileName] = fileName;
    // console.log(configObj, fileName)
    // 逐行读文件，读到config后，在后面加一行，最后写会文件
    lineReader.eachLine(configFile, function(line, last) {
        newConfig.push(line);
        newConfig.push('\n');

        if (!configObj[fileName] && line == 'var config = {') {
            newConfig.push("    '" + fileName + "': " + "'" + fileName + "',");
            newConfig.push('\n');
        }


        if (last) {
            fs.open(configFile, 'w', function(e, fd) {
                if (e) throw e;
                fs.write(fd, newConfig.join(''), 0, 'utf8', function(e) {
                    if (e) throw e;
                    fs.closeSync(fd);
                })
            });
            return false; // stop reading
        }
    });

    response.write(url.parse(request.url).pathname);
    response.end();
}

exports.init = init;