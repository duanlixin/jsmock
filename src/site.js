/*
* @Author: lixinduan
* @Date:   2016-04-20 10:16:23
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-04-25 10:33:20
*/

'use strict';

var fs = require('fs');
var mime = require('./mime').types;

var init = function init(opts) {
    var realPath = opts.realPath;
    var response = opts.response;
    var ext = opts.ext;

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

exports.init = init;