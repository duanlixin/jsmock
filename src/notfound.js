/*
 * @Author: lixinduan
 * @Date:   2016-04-20 10:16:23
 * @Last Modified by:   lixinduan
 * @Last Modified time: 2016-04-25 20:36:29
 */

'use strict';

var init = function init(opts) {
    var pathname = opts.pathname;
    var response = opts.response;
    var ext = opts.ext;

    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.write('This request URL ' + pathname + ' was not found on this server.');
    response.end();
}

exports.init = init;
