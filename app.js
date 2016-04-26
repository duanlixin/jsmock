/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-26 18:27:19
 */

'use strict';
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// 监听端口号
var port = 8888;

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
            // 回调函数
            var callback = url.parse(request.url, true).query.callback;
            if (pathname && pathname != '/favicon.ico' && pathname === '/mock/save') { // 保存配置文件
                require('./src/save').init({
                    response: response,
                    request: request,
                    callback: callback
                });
            } 
            else if (pathname && pathname != '/favicon.ico' && pathname === '/mock/list') { // 保存配置文件
                require('./src/list').init({
                    response: response,
                    request: request,
                    callback: callback
                });
            } 
            else if (pathname && pathname != '/favicon.ico' && pathname === '/mock/delete') { // 保存配置文件
                require('./src/delete').init({
                    response: response,
                    request: request,
                    callback: callback
                });
            } 
            else if (pathname && pathname != '/favicon.ico' && callback) { // 返回json文件
                require('./src/mock').init({
                    pathname: pathname,
                    response: response,
                    callback: callback
                });
            } else { // 404
                require('./src/notfound').init({
                    response: response,
                    pathname: pathname
                });

            }
        } else { // 启动网站
            require('./src/site').init({
                response: response,
                realPath: realPath,
                ext: ext
            });
        }
    });
});

server.listen(port);

console.log('http server running on port ' + port + ' ...');
