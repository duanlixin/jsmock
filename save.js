/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-11 14:33:36
 */

'use strict';
var http = require('http');
var url = require('url');
var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

// 监听端口号
var port = 8888;

var server = http.createServer(function(req, res) {
    // 设置返回头
    res.writeHeader(200,{
        'Content-Type' : 'text/html;charset=utf-8'  // 添加charset=utf-8
    }) ;
    // 从url参数中取出匹配地址
    var key = url.parse(req.url).pathname;
    if(key && key != '/favicon.ico' && key === '/mock/save') {
        var arg1 = url.parse(req.url, true).query;
        var realPath = path.dirname() + arg1.name;
        console.log(realPath)
        fs.exists(realPath, function (exists) {
            // 判断文件是否存在，如果不存在，则创建文件，如果存在，则重新写入
            console.log(exists)

            fs.open(realPath,'w',function(e,fd){
                if(e) throw e;
                fs.write(fd,arg1.tpl,0,'utf8',function(e){
                    if(e) throw e;
                    fs.closeSync(fd);
                })
            });
        });


        res.write(key);
        res.end();
    }
});

server.listen(port);

console.log('http server running on port ' + port + ' ...');
