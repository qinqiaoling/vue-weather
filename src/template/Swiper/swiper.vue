<template>
	<div class="carousel_wrap">
        <div class="swiper-container" id="swiper">
            <div class="swiper-wrapper">
            	<div class="swiper-slide" v-for="item in swiper">
                    <a :href="item.href||item.link">
                        <img :src="item.picUrl" alt="">
                    </a>
                </div>
            </div>
        </div>
        <div class="pagination"></div>
        <a class="arrow-left" href="javascript:void(0);" @click="a_left($event)"></a> 
        <a class="arrow-right" href="javascript:void(0);" @click="a_right($event)"></a>
    </div>
</template>
<script type="text/javascript">
	import Swiper from '@/assets/js/swiper.js'
	export default {
		name: 'Swiper',
	    data () {
	        return {
	        	mySwiper: null,
	        }
	    },
	    props: ['swiper'], //swiper的就是test这个数据传递来的
	    components:{
	    },
	    mounted(){
	    	this.swiperUpdate(); //页面一加载拉去数据创建节点
	    },
	    methods:{
	    	_initSwiper() {
	    		let self=this;
	    		setTimeout(function(){
	    			self.mySwiper =  new Swiper('.swiper-container', {
						pagination: '.pagination',
	                    loop:false,
	                    grabCursor: true,
	                    paginationClickable: true,
	                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
       					observeParents:true,//修改swiper的父元素时，自动初始化swiper
					});
	    		},2000);//延时加载，等数据出来再渲染
	      	},
	      	a_left(event){
	      		event.preventDefault();
                this.mySwiper.swipePrev();
	      	},
	      	a_right(event){
	      		event.preventDefault();
	      		this.mySwiper.swipeNext();
	      	},
			_updateSwiper() {
				let self=this;
				this.$nextTick(() => {
				    self.mySwiper.update(true); //swiper update的方法
				})
			},
	      	swiperUpdate() {
		        if (this.mySwiper) { //节点存在
		            this._updateSwiper(); //更新
		        } else {
		            this._initSwiper(); //创建
		        }
	      	}
	    },
	    watch:{
	    	//通过props传来的数据 和 组件一加载节点就创建成功 二者不是同步，实时监听的swiper(传递的值)的变化
		    swiper() {
		        this.swiperUpdate();
		    }
	    },
	}
</script>
<style type="text/css" lang="scss">
	@import '../../assets/css/swiper.css'
</style>