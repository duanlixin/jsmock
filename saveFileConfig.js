/*
* @Author: dlx
* @Date:   2016-04-22 10:34:00
* @Last Modified by:   dlx
* @Last Modified time: 2016-04-22 11:58:49
*/

'use strict';

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
// 文件完整路径
var fileName = args[0];
// 文件内容
var fileType = args[1];
var configObj = {};
var config = require('./typeconfig');
for(var key in config) {
    configObj[key] = config[key];
}
var lineReader = require('line-reader');
var configFile = path.dirname() + '/typeconfig.js';
var newConfig = [];
fileName = fileName.replace('\\', '/');

var isExists = configObj[fileName];

lineReader.eachLine(configFile, function(line, last) {


    if(!isExists) {
        newConfig.push(line);
        newConfig.push('\n');

        if(line == "var config = {") {
            newConfig.push("    '" + fileName + "': " + "'" + fileType + "',");
            newConfig.push('\n');
        }
    } else {
        if(line.indexOf(fileName) !== -1) {
            newConfig.push("    '" + fileName + "': " + "'" + fileType + "',");
            newConfig.push('\n');
        } else {
            newConfig.push(line);
            newConfig.push('\n');
        }
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