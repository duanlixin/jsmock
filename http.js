/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-06 15:05:56
 */

'use strict';
var http = require('http');
var url = require('url');
// 引入mock.js文件
var mock = require('./mock');
// 引入配置文件
var config = require('./config');
// 监听端口号
var port = 8888;

var server = http.createServer(function(req, res) {
    // 设置返回头
    res.writeHeader(200,{
        'Content-Type' : 'text/html;charset=utf-8'  // 添加charset=utf-8
    }) ;
    // 从url参数中取出匹配地址，也就是配置文件的key值
    var key = url.parse(req.url).pathname;
    // 从url参数中取出callback的function的名字
    var callback = url.parse(req.url, true).query.callback;
    // 返回的mock数据
    var templateData = {}
    if( key && key != '/favicon.ico' && callback) {
        // 在配置文件中取出mock模板数据，并生成mock数据
        templateData = mock.mock(require(config[key]));
        // 返回mock数据
        res.write(callback +'(' + JSON.stringify(templateData) + ')');
        res.end();
    }
});

server.listen(port);

console.log('http server running on port ' + port + ' ...');
