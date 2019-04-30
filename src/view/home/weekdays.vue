<template>
	<div class="weekdays">
		<ul>
			<li v-for="(item,index) in weekdays" :key="index">
				<div class="weekdays-left">{{item.weekday}}<span>{{item.day}}</span></div>
				<div class="weekdays-center"><i>{{item.weekadyico}}</i><span>{{item.weather}}</span></div>
				<div class="weekdays-right">{{item.temperature}}</div>
			</li>
		</ul>
		<div class="future-weather">
			<router-link to="/futureWeather" class="future-weather-flex">
				<span>未来15天天气</span>
				<i class="el-icon-arrow-right"></i>
			</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	import weathericojson from "@/assets/js/_weatherico.json"
	export default {
		name: '',
		data () {
			return {
				weekdays:[
					{
						weekday:'周一',
						day:'04/15',
						weekadyico:'🌤',
						weather:'晴天',
						temperature:'8°~20°'
					}
				],
				weatherico:weathericojson,
			}
		},
		components:{

		},
		props:['weekdaysArray'],
		mounted(){
			this.addweekday(this.weekdaysArray);
		},
		methods:{
			addweekday(s){
				let _this = this;
				_this.weekdays = s;
				this.$nextTick(() => {
					_this.weekdays.forEach((item,index,val)=>{
						if(index==0){
							this.$set(_this.weekdays[index],'weekday','今天');
						}else if(index==1){
							this.$set(_this.weekdays[index],'weekday','明天');
						}else{
							let itemweek = item.week.replace(/星期/g,'周');
							this.$set(_this.weekdays[index],'weekday',itemweek);
						}
						let itemday = item.ymd.slice(5,7)+'/'+item.ymd.slice(8,10);
						let itemtemp = item.low.replace('低温 ','').replace('℃','')+'°~'+item.high.replace('高温 ','').replace('℃','')+'°';
						this.$set(_this.weekdays[index],'day',itemday);
						this.$set(_this.weekdays[index],'temperature',itemtemp);
						this.$set(_this.weekdays[index],'weather',item.type);
						_this.weatherico.filter((itm,ind,vau)=>{
							if(item.type.indexOf(itm.icotxt)>-1){
								this.$set(_this.weekdays[index],'weekadyico',itm.ico);
								// console.log(itm.ico)
							}
						});
						// console.log(item)
					})
				})
			},
		},
		watch:{
			weekdaysArray:{
				handler(val, oldVal){
		            // console.log('newVal:',val,oldVal)
		            this.addweekday(this.weekdaysArray);
		        },
		        deep: true
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.weekdays{
		border-bottom:1px solid #ccc;
		background:#fff;
		ul{
			padding:0.1rem 0.4rem;
			li{
				display: flex;
				justify-content: space-between;
				padding: 0.1rem 0;
				font-size: 0.28rem;
				.weekdays-left{
					span{
						font-size: 0.2rem;
						color: #888;
						padding-left:0.1rem;
					}
				}
				.weekdays-center{
					width: 1.2rem;
					text-align: left;
					i{
						display: inline-block;
						width: 0.36rem;
						font-size: 0.3rem;
    					color: #66b1ff;
					}
					span{
						font-size: 0.2rem;
						color: #888;
						padding-left:0.05rem;
					}
				}
				.weekdays-right{

				}
			}
		}
		.future-weather{
			border-top:1px solid #ccc;
			text-align: left;
			.future-weather-flex{
				padding:0.2rem 0.4rem;
				color: #000;
				font-size: 0.3rem;
				display: flex;
				justify-content: space-between;
				span{}
				i{
					color: #888;
				}
			}
		}
	}
</style>