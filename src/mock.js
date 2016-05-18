/*
 * @Author: lixinduan
 * @Date:   2016-04-20 10:16:23
 * @Last Modified by:   dlx
 * @Last Modified time: 2016-05-18 23:39:20
 */

'use strict';

var fs = require('fs');

var templateData = {};

// 引入mock.js文件
var mock = require('../mock');

var init = function init(opts) {
    var pathname = opts.pathname;
    var response = opts.response;
    var callback = opts.callback;
    // 在配置文件中取出mock模板数据，并生成mock数据
    var path = '../jsmock' + pathname + '.js';

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data));
        templateData = JSON.parse(data);
    });
    // 返回mock数据
        
    response.write(callback + '(' + JSON.stringify(templateData) + ')');
    response.end();
};

exports.init = init;
