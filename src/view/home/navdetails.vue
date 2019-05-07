<template>
	<div class="navdetails">
		<div class="airquality-head">
			<router-link to="/home" class="airquality-link">
				<i class="el-icon-arrow-left"></i>{{futurtemp}}
			</router-link>
		</div>
		<div class="detailsblock">
			<div class="detailsbj" ref="detailsbj">
				<div class="detailsleft">
					<div class="detailstitle">{{detailstitle}}</div>
					<p>{{detailsp}}</p>
				</div>
				<div class="detailsadres">{{adress}}</div>
			</div>
			<!-- <ul>
				<li>
					<p>温度</p>
					<span>23</span>
				</li>
			</ul> -->
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				futurtemp:this.$route.query.title,
				adress:this.$route.query.adress,
				detailstitle:this.$route.query.txt,
				detailsp:'谨防紫外线',
				bgcolor:['#F74532','#F8A30B','#0BF842','#0BCCF8','#8C0BF8','#F80BB5']
			}
		},
		components:{
		},
		created(){
		},
		computed:{
		},
		mounted(){
			this.refsfather();
		},
		methods:{
			refsfather(){
				let obj = JSON.parse(sessionStorage.getItem('rtwtem'));
				let h = Number(obj[0].tem1.replace('℃',''));
				let l = Number(obj[0].tem2.replace('℃',''));
				let flreg = /[1-9][0-9]*/g;
				let flarray = obj[0].win_speed.match(flreg);
				let flmax = Math.max.apply(Math,flarray);
				this.bgcolor.forEach((item,index,val)=>{
					if(this.$route.query.index == index+1){
						this.$refs.detailsbj.style.background = item
					}
				})
				obj[0].index.forEach((item,index,val)=>{
					if(this.futurtemp == item.title){
						this.detailsp = item.desc
					}else if(this.futurtemp == '运动指数'){
						if(item.title == '</em><em>'){
							this.detailsp = item.desc
						}
					}else if(this.futurtemp == '感冒指数'){
						if(h - l > 5){
							this.detailsp = '感冒易发，风力较大，温差较大'
						}else{
							this.detailsp = '感冒不易发，风力较小，温差较小'
						}
					}else if(this.futurtemp == '钓鱼指数'){
						if((h - l > 5)&(flmax<3)){
							this.detailsp = '适宜钓鱼，风力较小'
						}else{
							this.detailsp = '不适宜钓鱼，风力较大'
						}
					}
				});
			},
		},
		watch:{
			$route(to, from){
				this.futurtemp = this.$route.query.title
				this.adress = this.$route.query.adress
				this.detailstitle = this.$route.query.txt
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.navdetails{
		.airquality-head{
			background:#fff;
			height: 0.8rem;
			display: flex;
			align-items:center;
			position: relative;
			text-align: left;
			.airquality-link{
				color: #000;
				font-size: 0.3rem;
				display: block;
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.2rem;
				flex: 1;
				i{
					padding-right:0.2rem;
				}
			}
		}
		.detailsblock{
			background:#fff;
			margin: 0.2rem 0;
			padding:0.2rem;
			.detailsbj{
				display: flex;
				justify-content:space-around;
				background:#93d6c3;
				padding:0.2rem;
				.detailsleft{
					flex: 3;
					padding-right:0.2rem;
					text-align: left;
					.detailstitle{
						font-size: 0.34rem;
						padding-bottom:0.2rem;
					}
					p{
						font-size: 0.2rem;
						line-height: 0.3rem;
					}
				}
				.detailsadres{
					flex: 1;
				}
			}
		}
	}
</style>