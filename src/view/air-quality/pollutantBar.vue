<template>
	<div class="pollutant-bar">
		<div class="myChart" id="myChart"></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				xAxisData:["今天", "明天", "周三", "周四", "周五", "周六"],
			}
		},
		components:{
			
		},
		created(){
		},
		computed:{
		},
		props:['sersiesData'],
		mounted(){
			this.pollutantbar();
		},
		methods:{
			pollutantbar(){
				let _this = this;
				_this.countweek();
				let fontSize = document.getElementsByTagName('html')[0].style.fontSize.replace('px', '');
		    	let myChart = this.$echarts.init(document.getElementById('myChart'));
		    	myChart.setOption({
					title: { 
						text: '未来多天',
			            x:'0%',
			            top:fontSize/5,
			            textStyle:{
			                color:'#000',
			                fontSize: fontSize/5*1.4,
			                fontWeight:'normal'
			            },
			            subtext:'0－50:优;51－100:良;101－150:轻度;151-200:中度;\n201-300:重度;300+:严重',
			            subtextStyle:{
			            	color:'#888',
			            	fontSize: fontSize/5*1.0,
			            },
			            padding:[0 ,0, 0, 0],
			            itemGap:5
					},
					tooltip: {
						trigger: 'axis',
				        textStyle: {
				            fontSize: fontSize/5*1.2
				        },
				        formatter:function(params)  { 
				            var relVal = params[0].name;  
				            for (var i = 0, l = params.length; i < l; i++) {  
				                relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value;  
				            }  
				            return relVal; 
				        }   
					},
					xAxis: {
						type: 'category',
					  	data: _this.xAxisData,
					  	axisTick: {
				            show: true
				        },
					  	axisLine: {
					  		show: true,
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#000',
				                fontSize: fontSize/5*1.2
				            },
				            interval: 0,
				            align: 'center'
				            // formatter: function(value, index) {
				            //     if(index == 0 || index == _this.result2.time.length-1) {
				            //         return value.substring(5);
				            //     }else {
				            //         return '';
				            //     }
				            // }
				        },
				        splitLine: {
				            lineStyle: {
				                color: ['#e5f1ff']
				            }
				        }
					},
					yAxis: {
						type: 'value',
				        scale: false, //truey轴不从0开始,反之
				        axisTick: {
				            show: false,
				        },
				        axisLine: {
				            show: false
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#888',
				                fontSize: fontSize/5*1.2
				            }
				        },
				        splitLine: {
				            lineStyle: {
				                color: ['#e5f1ff']
				            }
				        }
					},
					grid: {
				        left: '0%',
				        right: '0%',
				        bottom: '5%',
				        top: '32%',
				        containLabel: true
				    },
					dataZoom: [
				        {
				            type: 'inside',
				            xAxisIndex: [0],
					        start: 0,
				            end: 100
				        }
				    ],
					series: [{
					  	name: '空气质量',
					  	type: 'bar',
					  	data: _this.sersiesData,
					  	barWidth:fontSize/5,
					  	itemStyle: {
			                normal: {
			                    color: new this.$echarts.graphic.LinearGradient(
			                        0, 1, 0, 0,
			                        [
			                            {offset: 0, color: '#6e67ff'},
			                            {offset: 1, color: '#62e0ff'}
			                        ]
			                    ),
			                    barBorderRadius:[4,4,0,0],
			                },
			            },
			            label:{
			            	normal: {
						        show: true,
						        position: 'top',
						        distance: 15,
						        align: 'center',
						        verticalAlign: 'middle',
						        rotate: 0,
						        formatter:function(params) {
						        	let labeltext = '';
					        		if(params.value<51){
					        			labeltext="优\n"+params.value;
					        		}else if(params.value>50&&params.value<101){
					        			labeltext="良\n"+params.value;
					        		}else if(params.value>100&&params.value<151){
					        			labeltext="轻度\n"+params.value;
					        		}else if(params.value>150&&params.value<201){
					        			labeltext="中度\n"+params.value;
					        		}else if(params.value>200&&params.value<301){
					        			labeltext="重度\n"+params.value;
					        		}else{
					        			labeltext="严重\n"+params.value;
					        		}
						        	// console.log(params)
						        	return labeltext;
						        },
						        fontSize: fontSize/5*1.2,
						        lineHeight:fontSize/5*1.6,
						        color:'#178ceb',
						        rich: {
						            name: {
						                textBorderColor: '#178ceb'
						            }
						        }
						    }
			            },
			            lineStyle:{
			            	shadowColor: 'rgba(136,218,245,0.35)',
		    				shadowBlur: 8,
		    				shadowOffsetX:3,
		    				shadowOffsetY:5,
			            },
					}]
				},true);
				window.onresize = myChart.resize;
			},
			countweek(){
				let _this = this;
				let getweek = new Date().getDay();//今天星期几(0-6),0是星期天
				_this.xAxisData.forEach((item,index,val)=>{
					if(getweek == 0){
						_this.xAxisData = ["今天", "明天", "周二", "周三", "周四", "周五"]
					}else if(getweek==1){
						_this.xAxisData = _this.xAxisData
					}else if(getweek==2){
						_this.xAxisData = ["今天", "明天", "周四", "周五", "周六", "周日"]
					}else if(getweek==3){
						_this.xAxisData = ["今天", "明天", "周五", "周六", "周日", "周一"]
					}else if(getweek==4){
						_this.xAxisData = ["今天", "明天", "周六", "周日", "周一", "周二"]
					}else if(getweek==5){
						_this.xAxisData = ["今天", "明天", "周日", "周一", "周二", "周三"]
					}else if(getweek==6){
						_this.xAxisData = ["今天", "明天", "周一", "周二", "周三", "周四"]
					}
					return _this.xAxisData;
					// console.log(item,index,val)
				})
			},
		},
		watch:{
			sersiesData:{
				handler(val, oldVal){
		            // console.log('newVall:',val,oldVal)
		            this.pollutantbar();
		        },
		        deep: true
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.pollutant-bar{
		background: #fff;
		margin: 0.2rem 0;
		padding: 0 0.2rem;
		position: relative;
		.myChart{
			height: 5rem;
			width: calc(100vw-0.4rem);
			margin: 0 auto;
		}
	}
</style>