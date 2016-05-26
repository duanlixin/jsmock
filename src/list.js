/*
* @Author: lixinduan
* @Date:   2016-04-26 18:11:38
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-05-26 11:56:58
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

    var list = query.list || '';

    var listFile = [];

    listFile = require('../utils/listFile').init('./data' + list);

    var sss = listFile.map(function (item) {
        // body...
        return '<a target="_blank" href="http://127.0.0.1:8888/basic.html?file=' + item.substr(1) + '">' + '编辑'+ '</a>&nbsp;&nbsp;&nbsp;&nbsp;' + '<a target="_blank" href="' + item.substr(1) + '?callback=_' + '">' + item.substr(1) + '?callback=_'+ '</a>&nbsp;&nbsp;&nbsp;&nbsp;'+ '<br>';
    });

    response.write(sss.join('\r'));
    response.end();
}

exports.init = init;