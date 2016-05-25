/*
 * @Author: lixinduan
 * @Date:   2016-04-20 10:16:23
 * @Last Modified by:   dlx
 * @Last Modified time: 2016-05-25 23:49:35
 */

'use strict';

var fs = require('fs');

// 引入mock.js文件
var mock = require('../mock');

var init = function init(opts) {
    var pathname = opts.pathname;
    var response = opts.response;
    var callback = opts.callback;
    // 在配置文件中取出mock模板数据，并生成mock数据
    var path = '../jsmock' + pathname;

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        response.write(callback + '(' + data + ')');
        response.end();
    });
};

exports.init = init;
