import axios from 'axios'
import qs from 'qs' //序列化字符串，处理发送请求的参数
// import { Loading, Message } from '@/assets/js/element.js' //引入axios以及element ui中的loading和message组件
import { Loading, Message } from 'element-ui'
// import {weburl} from '@/assets/js/public.js'
import goble_ from '@/assets/js/public.js'//定义全局模块
//封装axios请求接口
axios.defaults.timeout = 5000;//请求超时
// axios中请求配置有baseURL选项，表示请求URL公共部分。
// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
// axios.defaults.baseURL ='http://113.57.153.138:38083'; //填写域名
axios.defaults.baseURL = goble_.weburl;
//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//defaults默认设置
axios.defaults.headers = {
	'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
	'Accept': 'application/json,text/javascript,*/*;q=0.01'
}
// var configh='';
//http request 添加请求拦截器
var loadinginstace  //定时器
axios.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		// element ui Loading方法
		loadinginstace = Loading.service({ fullscreen: true })
		config.data = qs.stringify(config.data);//qs.stringify()将对象 序列化成URL的形式，以&进行拼接
		//qs.parse()将URL解析成对象的形式
		// if(configh==1){
		// 	config.headers = {
		// 	  'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
		// 	  'Accept': 'application/json,text/javascript,*/*;q=0.01',
		// 	  'token':localStorage.getItem('usr_tocken'),
		// 	}
		// }else{
		// 	config.headers = {
		// 	  'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
		// 	  'Accept': 'application/json,text/javascript,*/*;q=0.01',
		// 	}
		// }
		return config;
		// console.log(config)
	},
	error => {
		// 对请求错误做些什么
		loadinginstace.close()
		Message.error({
		 	message: '加载超时'
		})
		return Promise.reject(error);
	}
);
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
	// 对响应数据做点什么
	// 响应成功关闭loading
	loadinginstace.close()
    return response
}, err => {
	// 对响应错误做点什么
	loadinginstace.close()
	Message.error({
		message: '加载失败'
	})
    if (err && err.response) {
	    switch (err.response.status) {
	        case 400:
	            console.log('错误请求')
	          	break;
	        case 401:
	            console.log('未授权，请重新登录')
	          	break;
	        case 403:
	          	console.log('拒绝访问')
	          	break;
	        case 404:
	          	console.log('请求错误,未找到该资源')
	          	break;
	        case 405:
	          	console.log('请求方法未允许')
	          	break;
	        case 408:
	          	console.log('请求超时')
	          	break;
	        case 500:
	          	console.log('服务器端出错')
	          	break;
	        case 501:
	          	console.log('网络未实现')
	          	break;
	        case 502:
	          	console.log('网络错误')
	          	break;
	        case 503:
	          	console.log('服务不可用')
	          	break;
	        case 504:
	          	console.log('网络超时')
	          	break;
	        case 505:
	          	console.log('http版本不支持该请求')
	          	break;
	        default:
	          	console.log(`连接错误${err.response.status}`)
	    }
    } else {
    	console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
})
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url,params={}){
	let getTimestamp = new Date().getTime();
	return new Promise((resolve,reject) => {
		axios.fetch(url+'?t='+getTimestamp,{
		  params:params
		})
		.then(response => {
		  resolve(response.data);
		})
		.catch(err => {
		  reject(err)
		})
	})
}
/**
 * 封装post请求
 * @param url 请求地址
 * @param data 请求参数
 * @param headers token值
 * @returns {Promise}
 */
//带token的post方法
export function post(url,data = {},headers = {}){
	let getTimestamp = new Date().getTime();
   	return new Promise((resolve,reject) => {
     	axios.post(url+'?t='+getTimestamp,data,{
     		headers
     	})
        .then(response => {
            resolve(response.data);
            console.log(response.data)
        },err => {
            reject(err)
        })
   	})
}
//不带token的post方法
// export function post_no(url,data = {}){
//    	return new Promise((resolve,reject) => {
//      	axios.post(url,data)
//         .then(response => {
//             resolve(response.data);
//         },err => {
//             reject(err)
//         })
//    	})
// }
/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url,params = {},headers = {}){
	let getTimestamp = new Date().getTime();
   	return new Promise((resolve,reject) => {
     	axios.get(url+'?t='+getTimestamp,params,{
     		headers
     	})
        .then(response => {
            resolve(response.data);
            console.log(response.data)
        },err => {
            reject(err)
        })
   	})
}
 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url,data = {}){
	let getTimestamp = new Date().getTime();
	return new Promise((resolve,reject) => {
		axios.patch(url+'?t='+getTimestamp,data)
	    .then(response => {
	       	resolve(response.data);
	    },err => {
	       	reject(err)
	    })
	})
}
 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url,data = {}){
	let getTimestamp = new Date().getTime();
	return new Promise((resolve,reject) => {
		axios.put(url+'?t='+getTimestamp,data)
	    .then(response => {
	       	resolve(response.data);
	    },err => {
	       	reject(err)
	    })
	})
}
/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put
*/
export const server = {
    post_request: function(url,paramObj,headers){
        return post(url,paramObj,headers);
    },
    get_request: function(url,paramObj,headers){
        return get(url,paramObj,headers);
    },
    // post_no: function(url,paramObj){
    //     return post_no(url,paramObj);
    // },
}
// 链接：https://www.jianshu.com/p/9077baa9d543
