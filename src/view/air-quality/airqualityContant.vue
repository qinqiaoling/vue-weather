<template>
	<div class="airquality-contant">
		<div class="airquality-score">{{airqualityscore}}<sup>{{airqualityindex}}</sup></div>
		<p>全国空气质量排名<i>{{airqualityranking}}</i></p>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				airqualityindex:'',
				airqualityscore:''
			}
		},
		components:{
		},
		created(){
		},
		computed:{
		},
		props:['airqualityranking'],
		mounted(){
			// this.airqualityindexs()
		},
		methods:{
			airqualityindexs(val){
				this.airqualityscore = val;
				if(val<51){
        			this.airqualityindex="优";
        		}else if(val>50&&val<101){
        			this.airqualityindex="良";
        		}else if(val>100&&val<151){
        			this.airqualityindex="轻度";
        		}else if(val>150&&val<201){
        			this.airqualityindex="中度";
        		}else if(val>200&&val<301){
        			this.airqualityindex="重度";
        		}else{
        			this.airqualityindex="严重";
        		}
			}
		},
		watch:{
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.airquality-contant{
		padding-left:0.2rem;
		.airquality-score{
			font-size: 0.8rem;
			color: #658db8;
			sup{
				background:#658db8;
				color: #fff;
				font-size: 0.2rem;
				padding:0.02rem;
				border-radius: 0.06rem;
				margin-left: 0.1rem;
			}
		}
		p{
			color: #888;
			font-size: 0.2rem;
			padding-top:0.1rem;
			letter-spacing: 0.04rem;
			i{
				padding-left:0.1rem;
			}
		}
	}
</style>