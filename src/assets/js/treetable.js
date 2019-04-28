/**
 * @Author: qql
 * @Date:   2019-3-12
 * @树形表格
 */
'use strict'
import Vue from 'vue'
export default function treeToArray(datas, expandAll, parent = null, level = null) {
    let tmp = [];
    Array.from(datas).forEach(function(record) {
        if (record._expanded === undefined) {
            Vue.set(record, '_expanded', expandAll);
        }
        let _level = 1
        if (level !== undefined && level !== null) {
            _level = level + 1;
        }
        Vue.set(record, '_level', _level);
            // 如果有父元素
        if (parent) {
            Vue.set(record, 'parent', parent);
        }
        tmp.push(record);
        if (record.children && record.children.length > 0) {
            const children = treeToArray(record.children, expandAll, record, _level);
            tmp = tmp.concat(children);
        }
    })
    return tmp;
}