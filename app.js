/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   dlx
 * @Last Modified time: 2016-04-18 00:46:02
 */

'use strict';
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var url = require('url');

var mime = require('./mime').types;
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
            if (key && key != '/favicon.ico' && key === '/mock/save') {
                // 取出get参数
                var query = url.parse(request.url, true).query;
                // 保存的文件名
                var name = query.name;
                // 保存的模板内容
                var tpl = query.tpl;
                // 拼接实际路径
                var filePath = path.dirname() + name;

                var exampleFile = path.dirname() + '/example.js';
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

                // fs.exists(filePath, function(exists) {
                //     // 判断文件是否存在，如果不存在，则创建文件，如果存在，则重新写入

                //     fs.open(filePath, 'w', function(e, fd) {
                //         if (e) throw e;
                //         fs.write(fd, query.tpl, 0, 'utf8', function(e) {
                //             if (e) throw e;
                //             fs.closeSync(fd);
                //         })
                //     });
                // });

                var configFile = path.dirname() + '/config.js';
                var basenamePos = name.indexOf('.');
                var newConfig = [];
                var fileName = name.substr(0, basenamePos);

                configObj[fileName] = '.' + fileName;
                // 逐行读文件，读到config后，在后面加一行，最后写会文件
                lineReader.eachLine(configFile, function(line, last) {
                    newConfig.push(line);
                    newConfig.push('\n');
                    if (!!configObj[fileName] && line == 'var config = {') {
                        newConfig.push("    '" + fileName + "': " + "'." + fileName + "',");
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

                response.write(key);
                response.end();
            } else if (key && key != '/favicon.ico' && callback) {

                // 在配置文件中取出mock模板数据，并生成mock数据
                templateData = mock.mock(require(configObj[key]));
                console.log(key, configObj, require(configObj[key]))
                    // 返回mock数据
                response.write(callback + '(' + JSON.stringify(templateData) + ')');
                response.end();
            } else {

                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write('This request URL ' + pathname + ' was not found on this server.');
                response.end();
            }
        } else {
            fs.readFile(realPath, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {

                    var contentType = mime[ext] || 'text/plain';
                    response.writeHead(200, { 'Content-Type': contentType });

                    response.write(file, 'binary');

                    response.end();
                }
            });
        }
    });
});

server.listen(port);

console.log('http server running on port ' + port + ' ...');
