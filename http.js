/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-01 11:48:58
 */

'use strict';
var http = require('http');
var mock = require('./mock');
var config = require('./config');
var url = require('url');
// console.log(config['/html/ccc'])
// console.log(require(config['/html/ccc']))
var server = http.createServer(function(req, res) {
    res.writeHeader(200,{
        'Content-Type' : 'text/plain;charset=utf-8'  // 添加charset=utf-8
    }) ;
    // 从url参数中取出匹配地址
    var key = url.parse(req.url).pathname;
    // 从url参数中取出callback的function的名字
    var callback = url.parse(req.url, true).query.callback;
    var templateData = {}
    if( key != '/favicon.ico') {
        templateData = require(config[key]);
        // console.log(templateData);
        console.log(callback)
        res.write(callback +'(' + JSON.stringify(templateData) + ')');
        res.end();
    }
    // console.log(templateData)
    // console.log(arg.bb); //返回002
});
server.listen(8888);
// console.log(mock)
console.log("http server running on port 8888 ...");
