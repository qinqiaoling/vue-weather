<template>
	<div class="serchcity">
		<router-link to="/home" class="airquality-link">
			<i class="el-icon-arrow-left"></i>返回首页
		</router-link>
		<div class="serchcity_wrap">
			<div class="serchcity_cont">
				<input type="text" name="" class="serchcity_input" v-model="serchtext" @keyup.enter="serch(serchtext)">
				<button class="serchcity_button" @click="serch(serchtext)">
					<i class="el-icon-search"></i>
				</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				serchtext:"",
			}
		},
		components:{
			
		},
		created(){
		},
		computed:{
		},
		mounted(){

		},
		methods:{
			serch(w){
				this.$nextTick(()=>{
					if(w==''){
						this.$message({
				          	type: 'info',
				          	message: '搜索的城市名不能为空！'
				    	})
					}else{
						this.$router.push({path:'/home',query:{searchcity:w}});
					}
				})
			}
		},
		watch:{
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.serchcity{
		height: 100vh;
		.airquality-link{
			color: #000;
			font-size: 0.3rem;
			display: block;
			height: 0.8rem;
			line-height: 0.8rem;
			padding: 0 0.2rem;
			position:fixed;
			left: 0;
			top: 0;
			right: 0;
			background:#fff;
			text-align: left;
			box-shadow:2px 2px 5px #CCCCCC;
			i{
				padding-right:0.2rem;
			}
		}
		.serchcity_wrap{
			padding: 1rem 10vw;
			.serchcity_cont{
				text-align: left;
				height: 0.8rem;
				line-height: 0.8rem;
				display: flex;
				border:1px solid #ccc;
				box-sizing: border-box;
				border-radius: 0.08rem;
				background:#fff;
				.serchcity_input{
					width: 90vw;
					display: inline-block;
					font-size: 0.3rem;
					padding: 0 0.2rem;
					background:none;
				}
				.serchcity_button{
					flex: 0 0 10vw;
				}
			}
		}
	}
</style>