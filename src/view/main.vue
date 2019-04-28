<template>
	<div class="main_wrap">
		<transition :name="transitionName">
			<router-view/>
		</transition>
	</div>
</template>
<script>
	//./这是相对路径的意思。
	// @/这是webpack设置的路径别名。一般代表src文件夹路径
	export default {
		name : "main_wrap",
		data () {
			return {
				transitionName:''
			}
		},
		components:{
	    },
	    mounted:function() { 
	    }, 
	    methods:{
	    	// loginout(){
	    	// 	this.$confirm('此操作将退出登录, 是否继续?', '提示', {
		    //       	confirmButtonText: '确定',
		    //       	cancelButtonText: '取消',
		    //       	type: 'warning',
		    //       	center: true
		    //     }).then(() => {
		    //       	this.$message({
		    //         	type: 'success',
		    //         	message: '退出登录成功!'
		    //       	});
		    //       	sessionStorage.clear();
		    //       	this.$store.commit('changeadmin', {
		    //       		username: null,
						// password: null,
						// iphone: null
		    //       	});
	    	// 		this.$router.push('/login');
		    //     }).catch(() => {
		    //       	this.$message({
		    //         	type: 'info',
		    //         	message: '已取消退出登录'
		    //       	});
		    //     });
	    	// },
	    	//进入时
	    	// beforeEnter: function (el) {
		    //   	// el.style.opacity = 0
		    //   	// el.style.transformOrigin = 'left'
		    // },
		    // enter: function (el, done) {
		    //   	// Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
		    //   	// Velocity(el, { fontSize: '1em' }, { complete: done })
		    // },
		    // //离开时
		    // leave: function (el, done) {
		    //  //  	Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
		    //  //  	Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
		    //  //  	Velocity(el, {
			   //  //     rotateZ: '45deg',
			   //  //     translateY: '30px',
			   //  //     translateX: '30px',
			   //  //     opacity: 0
			   //  // }, { complete: done })
		    // }
	    },
	    watch:{
	    	$route(to, from) {
		      	//如果to索引大于from索引,判断为前进状态,反之则为后退状态
		      	if(to.meta.index > from.meta.index){
		        	//设置动画名称
		        	this.transitionName = 'slide-left';
		      	}else{
		        	this.transitionName = 'slide-right';
		      	}
		    }
	    }
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.main_wrap{
		.slide-right-enter-active,
		.slide-right-leave-active,
		.slide-left-enter-active,
		.slide-left-leave-active {
		  will-change: transform;
		  transition: all 500ms;
		  position: absolute;
		}
		.slide-right-enter {
		  opacity: 0;
		  transform: translate3d(-100%, 0, 0);
		}
		.slide-right-leave-active {
		  opacity: 0;
		  transform: translate3d(100%, 0, 0);
		}
		.slide-left-enter {
		  opacity: 0;
		  transform: translate3d(100%, 0, 0);
		}
		.slide-left-leave-active {
		  opacity: 0;
		  transform: translate3d(-100%, 0, 0);
		}
	}
</style>