<template>
	<div class="pollutant">
		<div class="pollutant-title">主要污染物</div>
		<ul>
			<li v-for="(item,index) in pollutant" :key="index">
				<span>{{item.pindex}}</span>
				<p>{{item.cont}}</p>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				pollutant:[],
				contaminants:['SO₂','O₃','CO','NO₂','PM10','PM2.5'],
				pollutantarray:[],
			}
		},
		components:{
		},
		created(){
		},
		computed:{
		},
		props:['pollutantindexs'],
		mounted(){
			this.pollutants();
		},
		methods:{
			pollutants(){
				let _this = this;
				//两个一维数组合并成一个二维数组
				this.$nextTick(() => {
					_this.pollutant=[];
					let objay={
						pindex:'',
						cont:''
					};
					_this.pollutantarray=_this.contaminants.map((key,val)=>[key,_this.pollutantindexs[val]])
					_this.pollutantarray.forEach((item, index, val) => {
						objay={
							pindex:'',
							cont:''
						};
						objay.pindex = item[1]
						objay.cont = item[0]
						_this.pollutant.push(objay);
						// console.log(item,index,val,objay)
					})
				})
			},
		},
		watch:{
			pollutantindexs:{
				handler(val, oldVal){
		            // console.log('newVall:',val,oldVal)
		            this.pollutants();
		        },
		        deep: true
			},
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.pollutant{
		background:#fff;
		.pollutant-title{
			text-align: left;
			font-size: 0.3rem;
			color: #000;
			padding:0.2rem;
		}
		ul{
			padding:0.1rem 0.2rem;
			display: flex;
			justify-content: space-between;
			li{
				span{
					font-size: 0.34rem;
					color: #000;
				}
				p{
					font-size: 0.2rem;
					color: #888;
					padding:0.1rem 0;
				}
			}
		}
	}
</style>