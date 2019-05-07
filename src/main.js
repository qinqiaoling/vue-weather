// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//使用store
import axios from 'axios'/*引入资源请求插件*/

import ElementUI from 'element-ui'
// import ElementUI from '@/assets/js/element.js'//引用element.js
import 'element-ui/lib/theme-chalk/index.css'

//导出excel插件
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

//引入JQuery
// import $ from 'jquery'

import goble_ from '@/assets/js/public.js'//定义公共的js
import '@/assets/css/style.css'
import {server} from './api/http'//封装axios方法

import echarts from 'echarts' //引入echarts

//定义公共的js判断当前路径是否为登录页面，不为登录页面则判断watchStorage值是否为空，为空则返回登录页面，
//作用于在浏览器没有登录的情况下是不能访问页面的
// import SessionNameMixin from '@/assets/js/session_name_mixin.js'
import Viewport from '@/assets/js/viewport.js' //窗口适配

//语言国际化 中英文
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangZh from '../static/lang/zh'

// Vue.use(VueI18n)

Vue.use(ElementUI);//调用element组件

// Vue.mixin(SessionNameMixin);//混合写法监听sessionStorage 存储的值是否存在
Vue.use(Viewport);

Vue.config.productionTip = false

Vue.prototype.$axios = axios/*使用axios插件*/

Vue.prototype.$http=server;//定义全局axios变量

Vue.prototype.GLOBAL=goble_;//定义全局变量

// Vue.prototype.FileSaver=FileSaver;//定义全局变量----导出excel表格
// Vue.prototype.XLSX=XLSX;//定义全局变量----导出excel表格

Vue.prototype.$echarts = echarts //引入echarts组件

// const i18n = new VueI18n({
//    	locale: localStorage.getItem('locale') || 'zh',
// 	//解决页面刷新后，通过按钮切换的语言还原成了最初的语言，无法保存
// 	messages: {
// 	    'en': LangEn,
// 	    'zh': LangZh
// 	}
// })
/* 为了实现element插件的多语言切换 */
// locale.i18n((key, value) => i18n.t(key, value))

// let loadingInstance_a //定义loading定时器
// router.beforeEach(function (to, from, next) {
//     loadingInstance_a = ElementUI.Loading.service({ fullscreen: true }) //路由进入之前开启全屏遮罩层
//     if(to.matched.some( m => m.meta.auth)) {
//         // 判断该路由是否需要登录权限
//         // console.log("先判断是否登录");
//         sessionStorage.setItem('namepath',to.name);
//         if(to.name=='Login'){
//             sessionStorage.clear();
//             next();
//         }else{
//             if(sessionStorage.getItem('watchStorage')!=null){// 判断账户密码是否存在
//                 //访问服务器缓存数据，判断当前token是否失效
//                 // Vue.http.get("http:xxxx/Login/UserIsLogin?token="+sessionStorage.getItem('token')+"&url="+to.name,{withCredentials: true}).then(response => response.json()).then(num => {
//              //        // console.log('是否登录',num);
//              //        if(num.code==1001){
//              //            next();
//              //        }else{
//              //            alert('您的token已超时，请重新登录');
//              //            next('/Login');
//              //        }
//                 // })
//                 next();
//             }else{
//                 alert('账号密码失效，请重新登录');
//                 next();
//             }
//         }
//   　} else {
//         alert("请先登录");
//         next('/login');
//     }
// });
// router.afterEach(route => {
//     //键入路由1秒之后关闭遮罩层
//     setTimeout(() => {
//         loadingInstance_a.close();
//     }, 1000);
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
