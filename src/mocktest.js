/*
* @Author: lixinduan
* @Date:   2016-04-20 10:16:23
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-04-25 13:28:20
*/

'use strict';

var fs = require('fs');
// 引入配置文件
var config = require('../config');
var templateData = {};

// 引入mock.js文件
var mock = require('../mock');
var configObj = {};

for(var key in config) {
    configObj[key] = config[key];
}

var init = function init(opts) {
    var key = opts.key;
    var response = opts.response;
    var callback = opts.callback;
    // 在配置文件中取出mock模板数据，并生成mock数据
    templateData = mock.mock(require('../data' +configObj[key]));
    // 返回mock数据
    response.write(callback + '(' + JSON.stringify(templateData) + ')');
    response.end();
};

exports.init = init;