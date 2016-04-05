/*
* @Author: lixinduan
* @Date:   2016-04-05 16:13:12
* @Last Modified by:   lixinduan
* @Last Modified time: 2016-04-05 17:57:00
*/

'use strict';
var templateData = {
    // 随机1-5个sss，ssssss，sssssssss，ssssssssssss，sssssssssssssss
    'name1|1-5': 'sss',
    // 随机1-5，生成一个大于等于 1、小于等于 5 的整数
    'name2|1-5': 1,
    // 重复4次 ssssssssssssssss
    'name3|4': 'ssss',
    // 生成一个浮点数，整数部分大于等于 2、小于等于 3，小数部分保留 3 到 4 位。
    'name4|2-3.3-4': 1,
    // 生成一个浮点数，整数部分123，小数部分保留 3 位。
    'name5|123.3': 1,
    //  随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率是 1/2。
    'name6|1': true,
    // 随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)，本例子中，min=1，max=3
    'name7|1-3': true,
    // 从属性值 {} 中随机选取 1 到 5 个属性。
    'name8|1-5': {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6
    },
    // 从属性值 {} 中随机选取 4 个属性。
    'name9|4': {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6
    },
    // 从属性值 [1,2,3,4,5,6] 中随机选取 1 个元素，作为最终值。
    'name10|1': [1,2,3,4,5,6],
    // 通过重复属性值 [{}, {} ...] 生成一个新数组，重复次数大于等于 min，小于等于 max
    'name11|1-3': [1,2,3],
    // 通过重复属性值 [{}, {} ...] 生成一个新数组，重复次数为 count。
    'name12|2': [1,2,3],
    // 执行函数 function(){}，取其返回值作为最终的属性值，上下文为
    'name13|': function (argument) {
        return 'sss';
    }
};

module.exports = templateData;