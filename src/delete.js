/*
* @Author: lixinduan
* @Date:   2016-04-20 10:16:23
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-05-16 20:18:35
*/

'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');

var init = function init(opts) {
    var request = opts.request;
    var response = opts.response;
    var callback = opts.callback;

    // 取出get参数
    var query = url.parse(request.url, true).query;
    // 保存的文件名
    var name = query.name;

    var dir = query.dir;

    if(name) {
        require('../utils/delete').init({
            fileName: name
        });
    }

    if(dir) {
        require('../utils/deleteDirectory').init({
            dir: dir
        });
    }

    response.write(url.parse(request.url).pathname + '====' +  name);
    response.end();
}

exports.init = init;