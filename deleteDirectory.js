/*
* @Author: lixinduan
* @Date:   2016-04-20 10:59:10
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-04-20 11:00:34
*/

'use strict';

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
// 文件完整路径
var fileName = args[0];
// 文件目录
var filePath = path.dirname(fileName);

var exec = require('child_process').exec,child;

child = exec('rm -rf ' + filePath,function(err,out) { 

    console.log(out); err && console.log(err); 

});