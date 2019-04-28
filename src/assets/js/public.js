const weburl = 'http://t.weather.sojson.com/api/weather/city/';//请求公共url
const headers={"token": localStorage.getItem('usr_tocken')};
/**
 * 异步请求共用方法
 * @param url  接品映射地址
 * @param fn   异步请求成功后回调函数名
 * @param param  异步请求参数体
 * @returns
 */
function sendAjax(url, fn, param) {
	var settings = {
		url: weburl + url,
		type: 'post',
		cache: false,
		data: param,
		headers: headers,
		success: function(e) {
			if (typeof(eval(fn))) {
				fn(e);
			} else {
				alert("函数不存在")
			}
		}
	}
	$.ajax(settings)
}
function sendAjax_no(url, fn, param) {
	var settings = {
		url: weburl + url,
		type: 'post',
		cache: false,
		data: param,
		success: function(e) {
			if (typeof(eval(fn))) {
				fn(e);
			} else {
				alert("函数不存在")
			}
		}
	}
	$.ajax(settings)
}
// 获取地址栏参数
function parseUrl() {
	var url_local = location.href;//获取路径,例如：https://hao.360.cn/?src=lm&ls=n482bfbdf97
	var i_i = url_local.indexOf('?');//‘？’在字符串中占的位置
	if (i_i == -1) return;//说明地址为空
	var querystr = url_local.substr(i_i + 1);//截取问号后面的字符串,例如：src=lm&ls=n482bfbdf97
	var arr1 = querystr.split('&');//以“&”为界限分割成数组,例如：["src=lm", "ls=n482bfbdf97"]
	var arr2 = new Object();//新建对象
	for (i_i in arr1) {
		var ta = arr1[i_i].split('=');//以“=”为界限分割成数组,例如：["src", "lm"],["ls", "n482bfbdf97"]
		arr2[ta[0]] = ta[1];//ta[0]为键，ta[1]为值，
	}
	return arr2;//{src:"lm",ls:"n482bfbdf97"}
}
var v_obj = parseUrl();//解析所有参数
// 添加全局事件StorageEvent监控方法
function resetSetItem(key, newVal) {
    if (key === 'watchStorage') {
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
            setItem: function (k, val) {
                sessionStorage.setItem(k, val);
                // 初始化创建的事件
                newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(newStorageEvent)
            }
        }
        return storage.setItem(key, newVal);
    }
}
/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}
//export 可以导出多个命名模块,export default 只能导出一个默认模块，这个模块可以匿名
export {weburl,sendAjax,sendAjax_no,v_obj}//export输出变量或方法
export default {
	headers,
	weburl,
	sendAjax,
	sendAjax_no,
	v_obj,
	resetSetItem
}