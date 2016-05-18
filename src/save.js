/*
* @Author: lixinduan
* @Date:   2016-04-20 10:16:23
* @Last Modified by:   dlx
* @Last Modified time: 2016-05-18 23:14:53
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
    // 保存的模板内容
    var tpl = query.tpl;

    // 生成模拟数据
    require('../utils/createFile').createFile({
        fileName: 'data'+ name,
        content:  query.tpl
    });

    response.write(url.parse(request.url).pathname);
    response.end();
}

exports.init = init;