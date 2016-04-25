/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-25 17:22:35
 */

'use strict';
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var url = require('url');

// 引入mock.js文件
var mock = require('./mock');
// 引入配置文件
var config = require('./config');
// 监听端口号
var port = 8888;

var templateData = {};
// 按行读入文件内容
var lineReader = require('line-reader');

var configObj = {};

for(var key in config) {
    configObj[key] = config[key];
}


// 1.启动edit.html
// 2.生成json文件(把json的文件写入配置文件) save
// 3.返回json数据 http

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = 'assets' + pathname;
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {

        if (!exists) {

            // 如果文件不存在，看是不是save
            var key = url.parse(request.url).pathname;
            // 回调函数
            var callback = url.parse(request.url, true).query.callback;
            if (key && key != '/favicon.ico' && key === '/mock/save') { // 保存配置文件
                require('./src/save').init({
                    response: response,
                    request: request
                });
            } else if (key && key != '/favicon.ico' && callback) { // 返回json文件
                require('./src/mocktest').init({
                    key: key,
                    response: response,
                    callback: callback
                });
            } else { // 404
                require('./src/notfound').init({
                    response: response,
                    pathname: pathname,
                });

            }
        } else { // 启动网站
            require('./src/site').init({
                realPath: realPath,
                response: response,
                ext: ext
            });
        }
    });
});

server.listen(port);

console.log('http server running on port ' + port + ' ...');
