import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function storeLocalStore (state) {
  	window.sessionStorage.setItem("store",JSON.stringify(state));
}

// 1,state：包含了store中存储的各个状态。
// 2,getter: 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
// 3,mutation: 一组方法，是改变store中状态的执行者。
// 4,action: 一组方法，其中可以含有异步操作。
// 5,this.$store.commit(func,value)  提交state，func为mutations里的方法名，value为传的值
const store = new Vuex.Store({
	state:{
		count: 1,
		author: 'Miss You',
		admin: {
			username: null,
			password: null,
			iphone: null,
		}
	},
	mutations: {
		// 修改 state
	    increment (state,num) {
	      	state.count = num
	      	storeLocalStore(state)
	      	console.log(state)
	    },
	    changeadmin(state,payload){
	    	// payload  可以为任何值，any
	    	state.admin = payload
	    	// state.admin.username = usernames
	    	// state.admin.password = passwords
	    	// state.admin.iphone = iphones
	    	storeLocalStore(state)
	      	console.log(state)
	    },
	},
	getters: {
		// 组件获取 state
	},
	actions: {
		// 组件触发动作
	},
});


export default store

