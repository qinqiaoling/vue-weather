<template>
	<div class="FutureWeather">
		<div class="airquality-head">
			<router-link to="/home" class="airquality-link">
				<i class="el-icon-arrow-left"></i>{{futurtemp}}
			</router-link>
		</div>
		<div class="futurtemp_wrap">
			<ul class="background_gradient"><li v-for="(item,index) in futurtempli" :key="index"></li></ul>
			<div class="futurtemp_head">
				<ul>
					<li v-for="(item,index) in futurtempli" :key="index">
						<p>{{item.week}}</p>
						<span>{{item.ymd}}</span>
						<i>{{item.pico}}</i>
						<b>{{item.type}}</b>
					</li>
				</ul>
			</div>
			<futurweatherline ref="futurweatherline"></futurweatherline>
			<div class="futurtemp_foot">
				<ul>
					<li v-for="(item,index) in futurtempfl" :key="index">
						<p>{{item.fl}}</p>
						<span>{{item.fx}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import futurweatherline from './futurweatherline'
	import weathericojson from "@/assets/js/_weatherico.json"
	export default {
		name: '',
		data () {
			return {
				futurtemp:"未来15天天气",
				futurtempli:[
					{
						week:'今天',
						ymd:'04/25',
						pico:'⛅',
						type:'多云'
					}
				],
				futurtempfl:[
					{
						fl:'4-5级',
						fx:'东北风'
					}
				],
				futurarray:[],
				weatherico:weathericojson,
			}
		},
		components:{
			futurweatherline
		},
		created(){
		},
		computed:{
		},
		mounted(){
			this.futureWeather();
			this.futurtempflfuc();
			this.futurtemplifuc();
			this.refsfather();
			console.log(this.futurarray)
		},
		methods:{
			futureWeather(){
				if(sessionStorage.getItem('dataobj')!=''){
					let futurdata = JSON.parse(sessionStorage.getItem('dataobj'));
					let futurjson = {
						fl: "4-5级",
						fx: "东北风",
						high: "高温 29.0℃",
						low: "低温 18.0℃",
						type: "多云",
						week: "星期四",
						ymd: "2019-04-25",
					}
					let futurjsonarray = [];
					futurdata.forecast.forEach((item,index,val)=>{
						futurjson = {
							fl: "4-5级",
							fx: "东北风",
							high: "高温 29.0℃",
							low: "低温 18.0℃",
							type: "多云",
							week: "星期四",
							ymd: "2019-04-25",
						}
						if(index==0){
							futurjson.week = "今天";
						}else if(index==1){
							futurjson.week = "明天";
						}else{
							futurjson.week = item.week.replace(/星期/g,'周');
						}
						futurjson.fl = item.fl;
						futurjson.fx = item.fx;
						futurjson.high = item.high.slice(3,7);
						futurjson.low = item.low.slice(3,7);
						futurjson.type = item.type
						futurjson.ymd = item.ymd.slice(5,7)+'/'+item.ymd.slice(8,10);
						futurjsonarray.push(futurjson);
					});
					// console.log(futurjsonarray)
					this.futurarray = futurjsonarray
					return this.futurarray
				}
			},
			futurtempflfuc(){
				this.futurarray.forEach((item,index,val)=>{
					let obj = {}
					obj.fl = item.fl;
					obj.fx = item.fx;
					this.$set(this.futurtempfl,index,obj)
					// console.log(item)
				})
			},
			futurtemplifuc(){
				this.futurarray.forEach((item,index,val)=>{
					let objs = {}
					objs.week = item.week;
					objs.ymd = item.ymd;
					objs.type = item.type;
					this.weatherico.filter((itm,ind,vau)=>{
						if(item.type.indexOf(itm.icotxt)>-1){
							objs.pico = itm.ico;
						}
					});
					this.$set(this.futurtempli,index,objs)
					// console.log(item)
				})
			},
			refsfather(){
				let highline = [];
				let lowline = [];
				this.futurarray.forEach((item,index,val)=>{
					highline.push(item.high);
					lowline.push(item.low);
					// console.log(item)
				});
				this.$refs.futurweatherline.futurtempcenter(highline,lowline);
			},
		},
		watch:{
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.FutureWeather{
		background:#fff;
		height: 100vh;
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
				// position:fixed;
				// left: 0;
				// top: 0;
				i{
					padding-right:0.2rem;
				}
			}
		}
		.futurtemp_wrap{
			overflow-x: auto;
			background-image:linear-gradient(180deg, #e7f5fe 20%,#fcfefd 80%);
			position:relative;
			.background_gradient{
				position:absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				display: flex;
				z-index: 0;
				li{
					flex: 0 0 1rem;
					&:nth-child(2n){
						background-image:linear-gradient(180deg, #f0f7fd 20%,#fcfefd 80%);
					}
				}
			}
			.futurtemp_head{
				position:relative;
				z-index: 1;
				ul{
					display: flex;
					width: 15rem;
					li{
						flex: 0 0 1rem;
						color: #888;
						font-size: 0.2rem;
						p{
							font-size: 0.3rem;
							color: #000;
							padding-top:0.4rem;
						}
						span{
							display: block;
							padding:0.1rem 0 0.4rem 0;
						}
						i{
							font-size: 0.4rem;
							color: #66b1ff;
						}
						b{
							display: block;
							font-weight: normal;
							padding:0.1rem 0 0 0;
						}
					}
				}
			}
			.futurtemp_foot{
				@extend .futurtemp_head;
			}
		}
	}
</style>