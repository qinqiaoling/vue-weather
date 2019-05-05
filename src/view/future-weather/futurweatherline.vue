<template>
	<div class="futurtemp_center" id="futurtemp_center"></div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				
			}
		},
		components:{
		},
		created(){
		},
		computed:{
		},
		mounted(){
			// this.futurtempcenter(this.line_a,this.line_b)
		},
		methods:{
			futurtempcenter(a,b){
				console.log(a,b)
				let _this = this;
				let fontSize = document.getElementsByTagName('html')[0].style.fontSize.replace('px', '');
		    	let myChart_a = this.$echarts.init(document.getElementById('futurtemp_center'));
		    	myChart_a.setOption({
					xAxis: {
						type: 'category',
						data:a,
					  	axisTick: {
				            show: false
				        },
					  	axisLine: {
					  		show: false,
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#fff0',
				                fontSize: fontSize*0
				            }
				        },
				        splitLine:{
				        	show: false,
				        },
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
				            show: false
				        },
				        splitLine:{
				        	show: false,
				        },
					},
					grid: {
				        left: '0%',
				        right: '0%',
				        bottom: '5%',
				        top: '30%',
				        containLabel: true
				    },
					series: [{
					  	name: '高温',
					  	type: 'line',
					  	data: a,
					  	smooth: true,
					  	barWidth:fontSize/5,
					  	itemStyle: {
			                normal: {
			                    color: new this.$echarts.graphic.LinearGradient(
			                        0, 1, 0, 0,
			                        [
			                            {offset: 0, color: '#ffd483'},
			                            {offset: 1, color: '#fad384'}
			                        ]
			                    ),
			                    barBorderRadius:[4,4,0,0],
			                },
			            },
			            label:{
			            	normal: {
						        show: true,
						        position: 'top',
						        distance: 10,
						        align: 'center',
						        verticalAlign: 'middle',
						        rotate: 0,
						        fontSize: fontSize/5*1.4,
						        lineHeight:fontSize/5*1.6,
						        color:'#757c82',
						        formatter:'{c}'+'°',
						    }
			            },
			            lineStyle:{
			            	shadowColor: 'rgba(252,212,127,0.8)',
		    				shadowBlur: 8,
		    				shadowOffsetX:3,
		    				shadowOffsetY:5,
			            }
					},{
						name: '低温',
					  	type: 'line',
					  	data: b,
					  	smooth: true,
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
						        position: 'bottom',
						        distance: 15,
						        align: 'center',
						        verticalAlign: 'middle',
						        rotate: 0,
						        fontSize: fontSize/5*1.4,
						        lineHeight:fontSize/5*1.6,
						        color:'#757c82',
						        formatter:'{c}'+'°',
						    }
			            },
			            lineStyle:{
			            	shadowColor: 'rgba(136,218,245,0.35)',
		    				shadowBlur: 8,
		    				shadowOffsetX:3,
		    				shadowOffsetY:5,
			            }
					}]
				},true);
				window.onresize = myChart_a.resize;
			},
		},
		watch:{
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.futurtemp_center{
		min-width: 15rem;
		width: 100vw;
		height: 4rem;
	}
</style>