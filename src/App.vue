<template>
    <div id="app" class="app">
        <transition :name="transitionName">
            <router-view/>
        </transition>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
//./这是相对路径的意思。
// @/这是webpack设置的路径别名。一般代表src文件夹路径
export default {
    name: 'App',
    data () {
        return {
            transitionName:''
        }
    },
    components:{
        
    },
    created(){
        if (sessionStorage.getItem("store") ) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        }
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        })
    },
    mounted:function() { 
        
    }, 
    methods:{
        
    },
    watch:{
        $route(to, from) {
            //监听路由变化
            // to , from 分别表示从哪跳转到哪，都是一个对象
            // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
            if(to.path){
            }
            console.log(to);
            console.log(from);
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
    /deep/#app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
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
