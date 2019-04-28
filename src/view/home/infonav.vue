<template>
	<div class="info-nav">
		<ul>
			<li v-for="(item,index) in infonav" :key="index">
				<router-link :to="item.iurl" class="info-link">
					<img :src="item.ipic">
					<i v-if="index==0?true:false">{{item.cweekday}}</i>
					<p>{{item.ititie}}</p>
					<span>{{item.itxt}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				infonav:[
					{
						iurl:'/home',
						ipic:'/static/images/1.png',
						cweekday:'24',
						ititie:'4月24日',
						itxt:'星期四',
					}
				]
			}
		},
		components:{

		},
		created(){
		},
		mounted(){
		},
		methods:{
			infonavs(w){
				let _this = this;
				let m='';
				let now = new Date();
				let tgtemhigh = '';//最高温度
				let tgtemlow = '';//最低温度
				let info_array = w;
				this.$nextTick(() => {
					info_array.forEach((item,index,val)=>{
						_this.infonav = val;
						m=parseInt(index)+1;
						this.$set(_this.infonav[index],'iurl','/home');
						this.$set(_this.infonav[index],'ipic','/static/images/'+m+'.png');
						tgtemhigh = Number(item.high.slice(3,7)).toFixed(1);
						tgtemlow = Number(item.low.slice(3,7)).toFixed(1);
						this.$set(_this.infonav[index],'cweekday',now.getDate())
						if(index==0){
							this.$set(_this.infonav[index],'ititie',now.getMonth()+1+'月'+now.getDate()+'日');
							this.$set(_this.infonav[index],'itxt',item.week);
						}else if(index==1){
							this.$set(_this.infonav[index],'ititie','穿衣指数');
							if(tgtemhigh>=28){

								this.$set(_this.infonav[index],'itxt','炎热');

							}else if((tgtemhigh>=24)&&(tgtemhigh<28)){

								this.$set(_this.infonav[index],'itxt','热舒适');

							}else if((tgtemhigh>=21)&&(tgtemhigh<24)){

								this.$set(_this.infonav[index],'itxt','舒适');

							}else if((tgtemhigh>=18)&&(tgtemhigh<21)){

								this.$set(_this.infonav[index],'itxt','凉舒适');

							}else if((tgtemhigh>=15)&&(tgtemhigh<18)){

								this.$set(_this.infonav[index],'itxt','温凉');

							}else if((tgtemlow>=11)&&(tgtemlow<15)){

								this.$set(_this.infonav[index],'itxt','凉');

							}else if((tgtemlow>=6)&&(tgtemlow<11)){

								this.$set(_this.infonav[index],'itxt','冷');

							}else if(tgtemlow<6){
								this.$set(_this.infonav[index],'itxt','寒冷');
							}
							// console.log(tgtemhigh,tgtemlow)
						}else if(index==2){
							this.$set(_this.infonav[index],'ititie','紫外线指数');
							if(item.type=='晴'){
								this.$set(_this.infonav[index],'itxt','强');
							}else{
								this.$set(_this.infonav[index],'itxt','弱');
							}
						}else if(index==3){
							this.$set(_this.infonav[index],'ititie','运动指数');
							let flreg = /[1-9][0-9]*/g;
							let flarray = item.fl.match(flreg);
							let flmax = Math.max.apply(Math,flarray)
							if((item.type=='晴'||item.type=='多云')&(flmax<3)){
								this.$set(_this.infonav[index],'itxt','适宜');
							}else{
								this.$set(_this.infonav[index],'itxt','不适宜');
							}
						}else if(index==4){
							this.$set(_this.infonav[index],'ititie','感冒指数');
							if(tgtemhigh-tgtemlow>10){
								this.$set(_this.infonav[index],'itxt','易发');
							}else{
								this.$set(_this.infonav[index],'itxt','不易发');
							}
						}else if(index==5){
							this.$set(_this.infonav[index],'ititie','洗车指数');
							let flreg = /[1-9][0-9]*/g;
							let flarray = item.fl.match(flreg);
							let flmax = Math.max.apply(Math,flarray)
							if((item.type=='晴'||item.type=='多云')&(flmax<3)){
								this.$set(_this.infonav[index],'itxt','适宜');
							}else{
								this.$set(_this.infonav[index],'itxt','不适宜');
							}
						}else if(index==6){
							this.$set(_this.infonav[index],'ititie','钓鱼指数');
							if(tgtemhigh-tgtemlow>5){
								this.$set(_this.infonav[index],'itxt','适宜');
							}else{
								this.$set(_this.infonav[index],'itxt','不适宜');
							}
						}else if(index==7){
							this.$set(_this.infonav[index],'ititie','每日运程');
							this.$set(_this.infonav[index],'itxt','推荐');
						}
						// console.log(item)
					})
				});
			}
		},
		watch:{
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.info-nav{
		margin:0.2rem 0.1rem;
		ul{
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			li{
				flex: 0 0 25%;
				.info-link{
					background:#fff;
					font-size: 0.2rem;
					color: #000;
					padding:0.2rem 0;
					margin: 0.1rem;
					display: block;
					position: relative;
					img{
						width: 0.8rem;
						height: 0.8rem;
					}
					i{
						position:absolute;
						left: 0;
						top: 0;
						right: 0;
						text-align: center;
						font-size: 0.4rem;
						color: #fff;
						height: 1.2rem;
						line-height:1.2rem;
					}
					p{
						font-size: 0.26rem;
						padding:0.2rem 0;
					}
					span{
						color: #888;
					}
				}
			}
		}
	}
</style>