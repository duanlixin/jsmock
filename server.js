/*
 * @Author: lixinduan
 * @Date:   2016-03-31 10:13:03
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-06 15:56:01
 */

'use strict';
var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('./mime').types;
var path = require('path');


// 监听端口号
var port = 8888;

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = 'assets' + pathname;
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write('This request URL ' + pathname + ' was not found on this server.');
            response.end();
        } else {
            fs.readFile(realPath, 'binary', function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {

                    var contentType = mime[ext] || 'text/plain';
                    response.writeHead(200, {'Content-Type': contentType});

                    response.write(file, 'binary');

                    response.end();
                }
            });
        }
    });
});

server.listen(port);

console.log('http server running on port ' + port + ' ...');
