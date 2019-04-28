<template>
	<div class="echartsdome">
		<div class="echarts" id="myChart"></div>
		<div class="echarts" id="myChart_a"></div>
		<div class="echarts" id="myChart_b"></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"echartsdome",
		data () {
			return {
				xdata:["2019-04-01", "2019-04-02", "2019-04-03", "2019-04-04"]
			}
		},
		computed:{
	    	
	    },
	    mounted(){
	    	this.drawLine();
	    	this.bar();
	    	this.piedome();
	    },
	    methods:{
	    	drawLine() {
				// 基于准备好的dom，初始化echarts实例
				var fontSize = $('html').css('fontSize').replace('px', '');
				let myChart_a = this.$echarts.init(document.getElementById('myChart_a'));
				//或者使用class获取div
				//var myChart = this.$echarts.init($('.chart').get(0));
				// 绘制图表
				let option = {
		    		title: { 
		    			text: 'ECharts K线图' ,
		    			textStyle:{
			                color:'#4d4d4d',
			                fontSize: fontSize*0.8,//动态改变字体大小
			            },
		    		},
					tooltip: {},
					xAxis: {
					  	data: this.xdata
					},
					yAxis: {},
					series: [{
					  	name: 'k线图',
					  	type: 'k',
					  	itemStyle:{
					  		normal:{
					  			color: '#f00',//阳线填充色
					  			color0:'blue',//阴线填充色
					  			lineStyle:{
					  				width: 5,
					  				color:'#000',
					  				color0:'yellow'
					  			},
					  		}
					  	},
					  	markPoint : {
			                symbol: 'star',
			                symbolSize:1,
			                itemStyle:{
			                    normal:{
			                    	label:{
			                    		position:'top',
			                    		textStyle:{
			                    			fontSize:14,
			                    			color:'#000'
			                    		}
			                    	}
			                    }
			                },
			                data : this.markp(),
			            },
					  	data: this.updataKline(),//每个数组【开盘，收盘，最低，最高】
					}]
		    	}
		    	//更新数据
		    	option.title.text = "ECharts";
			    console.log(option) 
				myChart_a.setOption(option,true);
				window.onresize = function(){
				    myChart_a.resize();    //若有多个图表变动，可多写
				}
		    },
		    bar(){
		    	var fontSize = $('html').css('fontSize').replace('px', '');
		    	let myChart = this.$echarts.init(document.getElementById('myChart'));
		    	myChart.setOption({
					title: { 
						text: 'ECharts 入门示例',
			            x:'10%',
			            top:fontSize*0.15,
			            textStyle:{
			                color:'#4d4d4d',
			                fontSize: fontSize*0.8,
			            },
			            subtext:'bar---dome',
			            subtextStyle:{
			            	color:'#999',
			                fontSize: fontSize*0.6,
			            },
			            padding:[0 ,0, 0, 0],
			            itemGap:5
					},
					tooltip: {
						trigger: 'axis',
				        textStyle: {
				            fontSize: fontSize/1.2
				        }
				        /* formatter:function(params)  { 
				            var relVal = params[0].name;  
				            for (var i = 0, l = params.length; i < l; i++) {  
				                relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value+"万元";  
				            }  
				            return relVal; 
				        }   */
					},
					legend: {
				    	show:true,
				        // icon: 'rect',
				        // itemWidth: fontSize,
				        // itemHeight: fontSize/1.4,
				        // itemGap: fontSize,
				        right: 0,
				        top: fontSize*1,
				        data: ['销量','日售平均额','面积线图'],
				        textStyle: {
				            color: '#4d4d4d',
				            fontSize: fontSize*0.8
				        }
				    },
				    grid: {
				        left: '0',
				        right: '0',
				        bottom: '0',
				        top: '30%',
				        containLabel: true
				    },
					xAxis: {
						type: 'category',
					  	data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
					  	axisTick: {
				            show: true
				        },
					  	axisLine: {
					  		show: true,
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#666',
				                fontSize: fontSize*.8
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
				            show: true
				        },
				        axisLine: {
				            show: true
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#666',
				                fontSize: fontSize*.9
				            }
				        },
				        splitLine: {
				            lineStyle: {
				                color: ['#e5f1ff']
				            }
				        }
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
					  	name: '销量',
					  	type: 'bar',
					  	data: [5, 20, 36, 10, 10, 20],
					  	itemStyle: {
			                normal: {
			                    color: new this.$echarts.graphic.LinearGradient(
			                        0, 0, 1, 0,
			                        [
			                            {offset: 0, color: '#6e67ff'},
			                            {offset: 1, color: '#62e0ff'}
			                        ]
			                    )
			                }
			            },
			            lineStyle:{
			            	shadowColor: 'rgba(136,218,245,0.35)',
		    				shadowBlur: 8,
		    				shadowOffsetX:3,
		    				shadowOffsetY:5,
			            },
					},{
						name: '日售平均额',
						type: 'line',
						data: [35, 20, 16, -10, 10, 50],
						itemStyle: {
			                normal: {
			                    color: new this.$echarts.graphic.LinearGradient(
			                        0, 0, 1, 0,
			                        [
			                            {offset: 0, color: '#740BF6'},
			                            {offset: 1, color: '#F6260B'}
			                        ]
			                    )
			                }
			            },
			            lineStyle:{
			            	width: 2,
			            	shadowColor: 'rgba(0,0,0,0.5)',
		    				shadowBlur: 18,
		    				shadowOffsetX:10,
		    				shadowOffsetY:10,
			            },
					},{
						name: '面积线图',
						type: 'line',
						data: [25, -20, 26, 10, -10, 40],
						itemStyle: {
			                normal: {
			                	areaStyle:{
			                		color: new this.$echarts.graphic.LinearGradient(
				                        0, 0, 1, 0,
				                        [
				                            {offset: 0, color: '#B4F60B'},
				                            {offset: 1, color: '#F6DD0B'}
				                        ]
				                    )
			                	},
			                    color: new this.$echarts.graphic.LinearGradient(
			                        0, 0, 1, 0,
			                        [
			                            {offset: 0, color: '#0BF6F4'},
			                            {offset: 1, color: '#0B39F6'}
			                        ]
			                    )
			                }
			            },
			            lineStyle:{
			            	width: 2,
			            	shadowColor: 'rgba(0,0,0,0.5)',
		    				shadowBlur: 10,
		    				shadowOffsetX:10,
		    				shadowOffsetY:10,
			            },
					}]
				},true);
				window.onresize = myChart.resize;
		    },
		    updataKline(){
		    	let a = [20,10,-50,60,10];
	    		let c0 = [];//二维数组第一列单个数组
	    		let c1 = [];//二维数组第二列单个数组
	    		let d = a[0];//单个数组的第一个数
	    		let e = 0;//单个数组的第二个数
	    		for(let i = 0;i < a.length - 1;i ++ ){
	    			d = d + a[i + 1];
	    			c1.push(d);
	    		}
	    		for(let j = 0;j < a.length - 1;j ++ ){
    				e = e + a[j];
    				c0.push(e);
    			}
    			//map,多个一维数组可以合并成一个多维数组
    			c0 = c0.map((key, value, index, item) => [key, c1[value], key>c1[value]?c1[value]:key, key>c1[value]?key:c1[value]]);
    			console.log(c0,c1);
    			return c0;
		    },
		    markp(){
		    	let markpdata = [];
	    		let markpobj = {};
	    		this.updataKline().forEach((item,index) => {
	    			markpobj = {};
	    			markpobj.xAxis = this.xdata[index];
	    			markpobj.yAxis = Math.max.apply(Math,item);
	    			markpobj.value = Math.max.apply(Math,item) - Math.min.apply(Math,item);
	    			markpdata.push(markpobj);
	    			console.log(markpobj);
	    		});
	    		return markpdata;
		    },
		    piedome(){
		    	var fontSize = $('html').css('fontSize').replace('px', '');
		    	let myChart_b = this.$echarts.init(document.getElementById('myChart_b'));
		    	let option_b = {
		    		title : {
				        text: '浏览器占比变化',
				        subtext: '纯属虚构',
				        x:'right',
				        y:'bottom'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        x : 'left',
				        data:['Chrome','Firefox','Safari','IE9+','IE8-']
				    },
				    calculable : false,
				    grid: {
				        left: '0',
				        right: '0',
				        bottom: '20',
				        top: '20',
				        containLabel: true
				    },
				    series : (function (){
				        var series = [];
				        for (var i = 0; i < 16; i++) {
				        	//修改i的值控制千层饼的环数
				            series.push({
				                name:'浏览器（数据纯属虚构）',
				                type:'pie',
				                itemStyle : {normal : {
				                	//修改i大于的值，表示显示饼图外label的值和线的多少
				                    label : {show : i > 14},
				                    labelLine : {show : i > 14, length:14}
				                }},
				                radius : [i * 5 + 40, i * 5 + 43],
				                data:[
				                    {value: i * 128 + 80,  name:'Chrome'},
				                    {value: i * 64  + 160,  name:'Firefox'},
				                    {value: i * 32  + 320,  name:'Safari'},
				                    {value: i * 16  + 640,  name:'IE9+'},
				                    {value: i * 8  + 1280, name:'IE8-'}
				                ]
				            })
				        }
				        series[0].markPoint = {
				            symbol:'emptyCircle',
				            symbolSize:series[0].radius[10],//radius[10]里的10控制内圈大小
				            effect:{
				            	show:true,
				            	scaleSize:12,
				            	color:'rgba(250,225,50,0.8)',
				            	shadowBlur:10,
				            	period:30
				            },
				            data:[
				            	{
				            		x:'50%',
				            		y:'50%',
				            		value: 1280,
				            		name: '内圈的字'
				            	}
				            ]
				        };
				        return series;
				    })()
		    	}
		  //   	setTimeout(function (){
				//     var _ZR = myChart_b.getZr();
				//     // 补充千层饼
				//     _ZR.add(new this.$echarts.graphic.Text({
				//         style : {
				//             x : _ZR.getWidth() / 2,
				//             y : _ZR.getHeight() / 2,
				//             color: '#666',
				//             text : '恶梦的过去',
				//             textAlign : 'center'
				//         }
				//     }));
				//     _ZR.add(new this.$echarts.graphic.Text({
				//         style : {
				//             x : _ZR.getWidth() / 2 + 200,
				//             y : _ZR.getHeight() / 2,
				//             brushType:'fill',
				//             color: 'orange',
				//             text : '美好的未来',
				//             textAlign : 'left',
				//             textFont:'normal 20px 微软雅黑'
				//         }
				//     }));
				//     _ZR.refresh();
				// }, 2000);
			    console.log(option_b) 
				myChart_b.setOption(option_b,true);
		    	window.onresize = myChart_b.resize;
		    },
	    },
	    watch:{
	    	
	    }
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.echartsdome{
		.echarts{
			width: 100%;
			height: 300px;
			// height:-moz-calc((100vh - 100px)/2);
   //  		height:-webkit-calc((100vh - 100px)/2);
   //  		height: calc((100vh - 100px)/2);
		}
	}
</style>