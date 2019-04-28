<template>
	<div class="short-term-forecasting">
		<ul>
			<li v-for="(item,index) in temps" :key="index">
				<p class="is-temp">{{item.temp}}</p>
				<i class="is-ico">{{item.isico}}</i>
				<div class="is-rain">{{item.israin}}</div>
				<div class="is-time">{{item.istime}}</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import weathericojson from "@/assets/js/_weatherico.json"
	export default {
		name: '',
		data () {
			return {
				temps:[
					{
						temp:'22°',
						isico:"⛅",
						israin:'无雨',
						istime:'16:00'
					}
				],
				weatherico:weathericojson,
			}
		},
		components:{

		},
		mounted(){
			// this.addtemps();
		},
		methods:{
			addtemps(w){
				let _this = this;
				let addtempsarray = w;
				this.$nextTick(()=>{
					addtempsarray.forEach((item,index,val)=>{
						_this.temps = val;
						_this.weatherico.filter((itm,ind,vau)=>{
							if(item.israin.indexOf(itm.icotxt)>-1){
								this.$set(_this.temps[index],'isico',itm.ico);
								// console.log(itm.ico)
							}
						});
					})
				})
				console.log(w)
			},
		},
		watch:{

		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.short-term-forecasting{
		padding:0.2rem;
		background:#fff;
		border-bottom:1px solid #ccc;
		overflow: hidden;
		ul{
			display: flex;
			justify-content: space-between;
		    overflow-x: auto;
		    overflow-y: hidden;
			li{
				min-width: 1rem;
				text-align: center;
				.is-temp{
					font-size: 0.28rem;
					padding-left:0.1rem;
				}
				.is-ico{
					margin:0.1rem 0 0 0;
					width: 0.4rem;
					height: 0.4rem;
					font-size: 0.28rem;
					color: #66b1ff;
				}
				.is-rain{
					font-size: 0.2rem;
					padding:0.1rem 0;
					color: #888;
				}
				.is-time{
					font-size: 0.22rem;
					color: #888;
				}
			}
		}
	}
</style>