<template>
	<div class="main-aside" ref="aside_menu">
		<div class="user" v-if="ishow">
			<div class="user_img"><img :src="user_img" @click="chnage_user()"></div>
			<div class="user_name">{{user_name}}</div>
			<div class="user_Administrator">{{user_Administrator}}</div>
		</div>
		<el-scrollbar>
			<el-menu 
				:default-openeds="openeds"
				background-color="#2f4050"
				text-color="#C9C9C9"
	      		active-text-color="#409eff"
	      		:mode="modes"
	      		:collapse="isCollapse"
	      		:default-active="$route.path"
	      		unique-opened
	      		@open="handleOpen"
	      		@close="handleClose"
	      		router>
				<el-submenu :index="sub.indexs" v-for="(sub,i) in submenu" :key="i" popper-class="newpopperclass">
					<template slot="title">
						<i :class="sub.iconclass" class="iconcolor"></i>
						<span v-if="ishow" slot="title">{{sub.text}}</span>
					</template>
					<el-menu-item-group>
					  <el-menu-item :index="sub.urlpath">{{sub.text}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
		    </el-menu>
		</el-scrollbar>
		<ChnageUserDialog v-if="change_dialog" ref="change_users"></ChnageUserDialog>
	</div>
</template>
<script>
	import ChnageUserDialog from './change_user_dialog'
	export default {
		name : "MainAside",
		data () {
			return {
				user_img:'../../static/images/no_img.jpg',
				// user_name:this.$store.state.username,
				user_Administrator:'系统管理员',
				change_dialog:false,
				openeds:['1'],
				isCollapse:false,
				modes:'vertical',
				ishow:true,
				submenu:[
					{
						indexs:'1',
						text:'考生审核',
						iconclass:'el-icon-edit',
						urlpath:'/main/examinee-review',
					},{
						indexs:'2',
						text:'面试管理',
						iconclass:'el-icon-view',
						urlpath:'/main/interview-management',
					},{
						indexs:'3',
						text:'结果统计',
						iconclass:'el-icon-tickets',
						urlpath:'/main/statistical-result',
					},{
						indexs:'4',
						text:'树形表格',
						iconclass:'el-icon-menu',
						urlpath:'/main/tree-table',
					},{
						indexs:'5',
						text:'dome设置',
						iconclass:'el-icon-setting',
						urlpath:'/main/domeseting',
					},
					{
						indexs:'6',
						text:'echarts图表',
						iconclass:'el-icon-picture',
						urlpath:'/main/echarts',
					}
				]
			}
		},
		components:{
			ChnageUserDialog
	    },
	    computed:{
	    	user_name(){
	    		return this.$store.state.admin.username
	    	}
	    },
	    created() {
			// window.addEventListener('setItem', ()=> {
			// 	this.user_name = JSON.parse(sessionStorage.getItem('store')).username;
			// 	this.user_name = this.$store.state.username
			// 	console.log(this.$store.state.admin.username)
			// })
		},
	    mounted:function() { 
	    }, 
	    methods:{
	    	handleOpen(key, keyPath) {
	    		//打开右侧栏
		        console.log('打开：'+key, keyPath);
		        this.openeds=keyPath
		    },
		    handleClose(key, keyPath) {
		    	//关闭右侧栏
		        console.log('关闭：'+key, keyPath);
		    },
		    chnage_user(){
		    	this.change_dialog=true
		    	this.$nextTick(() => {
		          this.$refs.change_users.init()
		        })
		    }
	    },
	    watch:{
	    	
	    }
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.main-aside{
		.user{
			color: #C9C9C9;
			text-align: center;
			background:#263949;
			padding: 30px 0;
			border-right: solid 1px #263949;
			.user_img{
				img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
					cursor: pointer;
				}
			}
			.user_name{
				font-size: 16px;
				color: #fff;
				padding:10px 0;
			}
		}
		.el-submenu__title{
			height: 50px;
			line-height: 50px;
		    span{
		    	max-width: 100px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    display: inline-block;
		    }
			i.iconcolor{
				color: #fff;
			}
		}
		.el-submenu{
			.el-menu-item{
				height: 40px;
				line-height: 40px;
				max-width: 100px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			}
		}
		.el-menu{
			border-right: solid 0px #e6e6e6;
			.el-menu-item-group__title{
				padding:0;
			}
		}
	}
</style>
<style type="text/css" lang="scss">
	.newpopperclass{
		.el-menu{
			.el-menu-item-group__title{
				padding:0!important;
			}
			.el-menu-item{
				height: 40px;
				line-height: 40px;
			}
		}
	}
</style>