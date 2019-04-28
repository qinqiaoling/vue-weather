<template>
	<div class="homepage" ref="homeSrolltop">
		<!-- 当前温度 -->
		<div class="current-temp-wrap" 
			ref="bjpic" 
			:style="{
				backgroundImage:'url(/static/images/'+bjpictype+'.gif)',
				backgroundRepeat:'no-repeat', 
				backgroundPosition:'center center',
				backgroundSize: 'cover'
			}">
			<div class="current-temp" :class="{'on':scrolltopheight}">
				<el-row>
					<el-col :span="12">
						<div class="current-temp-left">
							<p class="local">
								{{currentadress}}
								<span v-if="scrolltopheight">{{currentemperature}}°</span>
							</p>
							<p class="warn">
								{{earlywarning}}
								<span>{{disastrousweather}}</span>
								<i>{{classSevereWeather}}</i>
							</p>
						</div>
					</el-col>
	  				<el-col :span="12">
	  					<p class="rotate">
	  						<span>
	  							<i class="el-icon-more-outline" @click="serchcity()"></i>
	  						</span>
	  					</p>
	  				</el-col>
				</el-row>
			</div>
			<div class="current-temp-info">
				<div class="current-temp-info-left">{{currentemperature}}°</div>
				<div class="current-temp-info-right">
					<router-link 
						:to="{
							path:'/airQuality',
							query:{
								currentadress:currentadress,
								currentairquality:currentairquality,
								currentairqualityindex:currentairqualityindex,
								currentairarrays:currentairarray,
								pm10:pm10,
								pm25:pm25
							}
						}" 
						class="current-temp-info-right-link">
						<span>
							{{currentweather}}
							<em>|</em>
							{{currentairquality}}
							<em>{{currentairqualityindex}}</em>
							<i class="el-icon-arrow-right"></i>
						</span>
						<p>{{Comparedtemperature}}</p>
					</router-link>
				</div>
			</div>
		</div>
		<!-- 短时预报 -->
		<shorterm ref="shortermref"></shorterm>
		<!-- 周一到周五天气 -->
		<weekdays :weekdays-array="weekdaysarrays"></weekdays>
		<!-- 天气预报提示及日出日落 -->
		<promptmessage 
			:notice="notice" 
			:sunrise="sunrise" 
			:sunset="sunset" 
			:weathernotice="weathernotice">
		</promptmessage>
		<!-- 穿衣指数，洗车指数等nav -->
		<infonav :infosarray="infos" ref="infosref"></infonav>
		<!--  -->
		<!-- {{ $t("message.hello") }}
		<p v-bind:placeholder="this.$t('message.welcome')"></p>
		<button @click="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</button>
		<button @click="toggleLang('en')" :disabled="$i18n.locale == 'en'">英文</button> -->
	</div>
</template>

<script type="text/javascript">
	import shorterm from './shorterm'
	import weekdays from './weekdays'
	import promptmessage from './promptmessage'
	import infonav from './infonav'
	import cityjson from '@/assets/js/_city.json'
	export default {
		name: '',
		data () {
			return {
				scrolltopheight:false,
				scrollTopH:1,
				currentadress:'武汉',
				currentairquality:'良',
				currentairqualityindex:62,
				currentweather:'多云',
				currentemperature:22,
				earlywarning:'预警：',
				disastrousweather:'大风',
				classSevereWeather:'4级',
				Comparedtemperature:'比昨天高3°',
				citylist:cityjson,
				futureweather:'',
				notice:'今天白天到夜间，多云转晴，西南风一级转西风，冷热适宜，感觉很舒适。',
				sunrise:'05:00',
				sunset:'18:00',
				weathernotice:{
					fx:'东北风',
					fl:'1级',
					tgtemp:'10',
					humidity:'10%',
				},
				pm10:'',
				pm25:2.5,
				weekdaysarrays:[],
				infos:[],
				currentairarray:"",
				bjpictype:'qing',
			}
		},
		components:{
			shorterm,
			weekdays,
			promptmessage,
			infonav
		},
		created(){
		},
		computed:{
		},
		mounted(){
			// this.scrolltopH()
			window.addEventListener('scroll',this.initHeight);
			this.judgecitycode();
			console.log(this.$route.query.searchcity)
		},
		methods:{
			toggleLang(lang) {
				//切换中英文语言方法
			    if(lang == 'zh'){
			        localStorage.setItem('locale', 'zh')
			        this.$i18n.locale = localStorage.getItem('locale')
			        this.$message({
			          	message: '切换为中文！',
			          	type: 'success'
			        })
			    } else if (lang == 'en') {
			        localStorage.setItem('locale', 'en')
			        this.$i18n.locale = localStorage.getItem('locale')
			        this.$message({
			          	message: 'Switch to English!',
			          	type: 'success'
			    	})
				}
			},
			scrolltopH(){
				let _this = this;
				window.addEventListener('scroll', () => {
			      	_this.scrollTopH = document.documentElement.scrollTop||
			      						window.pageYOffset||
			      						document.body.scrollTop
			      	// 控制滚动按钮的隐藏或显示
			      	if (_this.scrollTopH > 100) {
			        	_this.scrolltopheight = true;
			      	} else {
			        	_this.scrolltopheight = false;
			      	}
			      	// console.log(_this.scrollTopH)
			    }, true);
			},
			initHeight () {
		        let scrollTop_h = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		        this.scrolltopheight = scrollTop_h > 100 ? true : false;
		    },
		    judgecitycode(){
		    	if(this.$route.query.searchcity==""||this.$route.query.searchcity==undefined){
					if(sessionStorage.getItem('cityname')==""||sessionStorage.getItem('cityname')==undefined){
						this.currentadress = this.currentadress
					}else{
						this.currentadress = sessionStorage.getItem('cityname')
					}
				}else{
					this.currentadress = this.$route.query.searchcity
				}
				this.currentcity(this.currentadress);
		    },
		    currentcity(cityname){
		    	this.citylist.filter((item,index,array)=>{
		    		console.log(item.city_name.indexOf(cityname)>-1)
		    		if(item.city_name.indexOf(cityname)>-1){
		    			sessionStorage.setItem('cityname',cityname);
		    			this.currentadress = sessionStorage.getItem('cityname')
    					this.currentcitydata(item.city_code);
    					this.RTW(item.city_code);
    					console.log(item.city_code)
		    		}else{
		    			if(item.city_name.indexOf(sessionStorage.getItem('cityname'))>-1){
		    				this.currentadress = sessionStorage.getItem('cityname')
		    				this.$message({
					          	message: '定位失败，默认上一个城市',
					          	type: 'info'
					    	})
		    				this.currentcitydata(item.city_code);
    						this.RTW(item.city_code);
    						console.log(item.city_code)
		    			}
		    		}
		    	});
		    },
		    currentcitydata(citycode){
		    	let _this = this;
		    	let aqiarray = '';
		    	this.$http.get_request(citycode).then(res => {
		    		if(res.data != "" && res.status==200){
	                    this.$nextTick(() => {
	                    	let dataobj = res.data;
	                    	sessionStorage.setItem('citycode',citycode);
	                    	sessionStorage.setItem('dataobj',JSON.stringify(dataobj));
	                		let yesterdaylow = Number(dataobj.yesterday.low.slice(3,7)).toFixed(1);//昨天最低气温
			    			let yesterdayhigh = Number(dataobj.yesterday.high.slice(3,7)).toFixed(1);//昨天最高气温
			    			_this.currentemperature = dataobj.wendu;//当天体温
			    			_this.currentweather = dataobj.forecast[0].type;//当天天气
			    			_this.currentairqualityindex = Number(dataobj.forecast[0].aqi).toFixed(0);//当天空气质量指数
			    			_this.futureweather = dataobj.forecast;//未来15天天气
			    			_this.disastrousweather = dataobj.forecast[0].fx;//预警天气灾害
			    			_this.classSevereWeather = dataobj.forecast[0].fl;//预警天气灾害等级
			    			_this.airqualityindexsfc(_this.currentairqualityindex);//根据当天空气质量指数判断空气质量等级
			    			_this.compare(yesterdaylow,Number(dataobj.wendu).toFixed(1));//当天温度与昨天温度相比
			    			_this.notice = dataobj.forecast[0].notice;//天气提示
			    			_this.sunrise = dataobj.forecast[0].sunrise;//日出
			    			_this.sunset = dataobj.forecast[0].sunset;//日落
			    			_this.weekdaysarrays = dataobj.forecast.slice(0,7);
			    			this.$set(_this.weathernotice,'fx',dataobj.forecast[0].fx);
			    			this.$set(_this.weathernotice,'fl',dataobj.forecast[0].fl);
			    			this.$set(_this.weathernotice,'tgtemp',dataobj.wendu);
			    			this.$set(_this.weathernotice,'humidity',dataobj.shidu);
			    			_this.pm10 = dataobj.pm10;
			    			_this.pm25 = dataobj.pm25;
			    			dataobj.forecast.forEach((item,index,val)=>{
			    				if(index<6){
			    					aqiarray += item.aqi + ',';
			    				}
			    			});
			    			_this.currentairarray = aqiarray.substring(0,aqiarray.length-1);
			    			this.refsinfosfather(dataobj.forecast.slice(0,8));
			    			_this.bjpictur(dataobj.forecast[0].type);
			    			// console.log(_this.infos)
	                    });
                    }
		    		// console.log(res.data)
	        	})
		    },
		    compare(yesterd,taday){
		    	//当天温度与昨天温度相比
		    	if(taday == yesterd){
		    		this.Comparedtemperature = '与昨天持平';
		    	}else{
		    		let temph = (taday - yesterd).toFixed(1);
		    		this.Comparedtemperature = temph > 0 ? "比昨天高" + temph + "°" : "比昨天低" + (temph*-1) + "°";
		    	}
		    },
		    airqualityindexsfc(val){
		    	this.$nextTick(()=>{
		    		if(val<51){
	        			this.currentairquality="优";
	        		}else if(val>50&&val<101){
	        			this.currentairquality="良";
	        		}else if(val>100&&val<151){
	        			this.currentairquality="轻度";
	        		}else if(val>150&&val<201){
	        			this.currentairquality="中度";
	        		}else if(val>200&&val<301){
	        			this.currentairquality="重度";
	        		}else{
	        			this.currentairquality="严重";
	        		}
		    	})
			},
			refsinfosfather(val){
				this.$refs.infosref.infonavs(val);
			},
			RTW(citycode){
				this.$axios.get('https://www.tianqiapi.com/api/?version=v1&cityid='+citycode)
			    .then(rsp=>{ 
			    	let rtwtem = rsp.data.data;
			    	let rtwarray = [];
			    	sessionStorage.setItem('rtwtem',JSON.stringify(rtwtem));
			    	this.$nextTick(()=>{
			    		rtwtem[0].hours.forEach((item,index,val)=>{
			    			let rtwobj = {}
			    			rtwobj.istime = item.day.substring(3,5)+':00';//时间
			    			rtwobj.temp = item.tem;//温度
			    			rtwobj.israin =item.wea;//晴
			    			rtwobj.win =item.win;//风向
			    			rtwobj.win_speed =item.win_speed;//风级
			    			rtwarray.push(rtwobj);
			    		});
			    		this.$refs.shortermref.addtemps(rtwarray);
			    	})
			        // console.log(rsp)
			    })
			    .catch(error=>{
			     	//在不清楚error的返回数据结构时，可以返回error,然后打断点，查看error返回结构
			        // console.log(error)
			    })
			},
			bjpictur(n){
				this.$nextTick(()=>{
					if(n.indexOf('晴')>-1){
						this.bjpictype = 'qing';
					}else if(n.indexOf('阴')>-1){
						this.bjpictype = 'yin';
					}else if(n.indexOf('多云')>-1){
						this.bjpictype = 'yun';
					}else if(n.indexOf('雪')>-1){
						this.bjpictype = 'xue';
					}else if(n.indexOf('雾')>-1){
						this.bjpictype = 'wu';
					}else if(n.indexOf('雨')>-1){
						this.bjpictype = 'yu';
					}else if(n.indexOf('雷'||'电')>-1){
						this.bjpictype = 'lei';
					}else if(n.indexOf('风')>-1){
						this.bjpictype = 'feng';
					}else{
						this.bjpictype = 'yin';
					}
				})
			},
			serchcity(){
				this.$router.push('/serchcity');
			}
		},
		destroyed () {
			//页面离开时移除监听scroll方法
	      	window.removeEventListener('scroll', this.initHeight)
	    },
		watch:{
			scrolltopheight:{
				handler(val, oldVal){
		            // console.log('newVal:'+val,oldVal)
		        },
		        deep: true
			},
			$route(to , from){
				this.currentcity(this.$route.query.searchcity);
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.homepage{
		.current-temp-wrap{
			height: 4rem;
			background:url(/static/images/qing.gif) no-repeat left top;
			background-size: cover;
			.current-temp{
				height: 1rem;
				line-height: 1rem;
				overflow: hidden;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				box-sizing: border-box;
				&.on{
					background: #fff;
					border-bottom: 1px solid #ccc;
				}
				.current-temp-left{
					padding-left: 0.2rem;
					text-align: left;
					position: relative;
					.local{
						font-size: 0.32rem;
						span{
							padding-left:0.2rem;
						}
					}
					.warn{
						font-size: 0.2rem;
						position: absolute;
						top:0.7rem;
						left: 0.2rem;
						line-height: 1;
						span{}
						i{padding-left: 0.1rem;}
					}
				}
				.rotate{
					text-align: right;
					padding-right: 0.2rem;
				    span{
				    	display: inline-block;
						font-size: 0.4rem;
				    	-webkit-transform: rotate(90deg);
				       	   -moz-transform: rotate(90deg);
				        	-ms-transform: rotate(90deg);
				         	 -o-transform: rotate(90deg);
				            	transform: rotate(90deg);
				    }
				}
			}
			.current-temp-info{
				padding-top:2.8rem;
				text-align: left;
				padding-left: 0.6rem;
				color: #658db8;
				.current-temp-info-left{
					display: inline-block;
					font-size: 1rem;
				}
				.current-temp-info-right{
					display: inline-block;
					font-size: 0.2rem;
					.current-temp-info-right-link{
						color: #ecf5ff;
						span{
							em{
								padding:0 0.06rem;
								vertical-align: bottom;
							}
						}
						p{
							padding-top:0.1rem;
						}
					}
				}
			}
		}
	}
</style>