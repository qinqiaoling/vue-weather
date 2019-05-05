<template>
	<div class="airquality">
		<div class="airquality-head">
			<router-link to="/home" class="airquality-link" :class="{'on':scrolltopheight}">
				<i class="el-icon-arrow-left"></i>{{adress}}空气质量
			</router-link>
			<airqualityContant ref="airqualitycontant" :airqualityranking="airqualityranking"></airqualityContant>
		</div>
		<pollutantpage :pollutantindexs="pollutant_Indexs"></pollutantpage>
		<pollutantBar :sersiesData="sersies_Data"></pollutantBar>
	</div>
</template>
<script type="text/javascript">
	import airqualityContant from './airqualityContant'
	import pollutantBar from './pollutantBar'
	import pollutantpage from './pollutantpage'
	export default {
		name: '',
		data () {
			return {
				adress:"江岸区",
				airqualityscore:190,
				airqualityranking:447,
				pollutant_Indexs:[6,48,10,9,62,58],
				sersies_Data:[45, 80, 136, 160, 210, 320,180],
				scrolltopheight:false
			}
		},
		components:{
			airqualityContant,
			pollutantBar,
			pollutantpage
		},
		created(){
		},
		computed:{
		},
		mounted(){
			this.refsfather()
			this.sersies_Data_array(this.$route.query.currentairarrays)
			this.pollutant_Indexs_array()
			window.addEventListener('scroll',this.initHeight);
			this.adress = this.$route.query.currentadress
		},
		methods:{
			refsfather(){
				this.$refs.airqualitycontant.airqualityindexs(this.$route.query.currentairqualityindex);
			},
			initHeight () {
		        let scrollTop_h = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		        this.scrolltopheight = scrollTop_h > 100 ? true : false;
		    },
			sersies_Data_array(array){
				let flreg = /[1-9][0-9]*/g;
				let flarray = array.match(flreg);
				this.sersies_Data = flarray
			},
			pollutant_Indexs_array(){
				let _this = this;
				this.pollutant_Indexs.forEach((item,index,val)=>{
					if(index==4){
						return this.$set(_this.pollutant_Indexs,index,Number(this.$route.query.pm10))
					}
					if(index==5){
						return this.$set(_this.pollutant_Indexs,index,Number(this.$route.query.pm25))
					}
				})
			}
		},
		destroyed () {
			//页面离开时移除监听scroll方法
	      	window.removeEventListener('scroll', this.initHeight)
	    },
		watch:{
			pollutant_Indexs:{
				handler(val, oldVal){
		            // console.log('newVall:',val,oldVal)
		            this.pollutant_Indexs = val
		        },
		        deep: true
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.airquality{
		.airquality-head{
			background:url(/static/images/bj.png) no-repeat left bottom;
			background-size: cover;
			height: 4rem;
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
				position:fixed;
				left: 0;
				top: 0;
				right: 0;
				background:none;
				&.on{
					background:#fff;
				}
				i{
					padding-right:0.2rem;
				}
			}
		}
	}
</style>