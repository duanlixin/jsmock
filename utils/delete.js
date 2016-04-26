/*
 * @Author: lixinduan
 * @Date:   2016-04-20 10:16:23
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-26 17:35:49
 */

'use strict';

var fs = require('fs');

var init = function(opts) {
    var fileName = './data' + opts.fileName;
    fs.unlink(fileName);
}

exports.init = init;
