import Vue from 'vue'
import Router from 'vue-router'
//页面配置
import home from '@/view/home/homepage'//首页
import airQuality from '@/view/air-quality/airQuality' //空气质量页面
import futureWeather from '@/view/future-weather/futureWeather' //未来15天天气页面
import serchcity from '@/view/home/serchcity' //未来15天天气页面
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path:'/',
			redirect:{
				name:'home' // 重定向到主页
			}
		},
		{
			path: '/home',
			name: 'home',
			meta:{
				auth:false, // 添加该字段，表示进入这个路由是否需要登录的
				keepAlive: false //此组件不需要被缓存
			},
			component: home
		},
		{
			path: '/airQuality',
			name: 'airQuality',
			meta:{
				auth:false,
				keepAlive: false
			},
			component: airQuality
		},
		{
			path: '/futureWeather',
			name: 'futureWeather',
			meta:{
				auth:false,
				keepAlive: false
			},
			component: futureWeather
		},
		{
			path: '/serchcity',
			name: 'serchcity',
			meta:{
				auth:false,
				keepAlive: false
			},
			component: serchcity
		},
		{
			path: '*',
			redirect:'/' //路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页面
		},
	]
})
