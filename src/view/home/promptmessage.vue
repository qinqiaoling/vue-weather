<template>
	<div class="prompt-message">
		<div class="prompt-info">
			<p>{{notice}}</p>
			<div class="prompt-time">
				<span><i>日出</i><i>{{sunrise}}</i></span>
				<span><i>日落</i><i>{{sunset}}</i></span>
			</div>
		</div>
		<div class="prompt-nav">
			<ul>
				<li v-for="(item,index) in promptnav" :key="index">
					<img :src="item.pico">
					<p>{{item.text}}</p>
					<span>{{item.hint}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: '',
		data () {
			return {
				promptnav:[],
				changeobj:{}
			}
		},
		components:{

		},
		props:['notice','sunrise','sunset','weathernotice'],
		mounted(){
			this.prompts(this.weathernotice);
		},
		methods:{
			prompts(w){
				let _this = this;
				let n='';
				let obj={
					pico:"/static/images/01.png",
					text:"1级",
					hint:'西南风'
				}
				_this.changeobj = w;
				// console.log(_this.changeobj,w)
				_this.promptnav=[];
				for(let i=0;i<4;i++){
					obj={
						pico:"/static/images/01.png",
						text:"1级",
						hint:'西南风'
					}
					n=parseInt(i)+1;
					obj.pico='/static/images/0'+n+'.png';
					if(i==0){
						obj.hint=_this.changeobj.fx;
						obj.text=_this.changeobj.fl;
					}else if(i==1){
						obj.hint='空气湿度';
						obj.text=_this.changeobj.humidity;
					}else if(i==2){
						obj.hint='体感温度';
						obj.text=_this.changeobj.tgtemp+'℃';
					}else if(i==3){
						obj.hint='气体压强';
						obj.text='1013hPa';
					}
					_this.promptnav.push(obj);
					// this.$set(_this.promptnav,i,_this.promptnav[0]);//数组增加(array,index,value)
					// this.$set(_this.promptnav[i],'pico','../../../static/images/0'+n+'.png');//增加字段(target,key,value)
					// console.log(n,_this.promptnav[i])
				}
				// console.log(_this.promptnav)
			},
		},
		watch:{
			weathernotice:{
				handler(val, oldVal){
		            // console.log('newVal:'+val,oldVal)
		            this.prompts(this.weathernotice);
		        },
		        deep: true
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.prompt-message{
		background:#fff;
		border-top:1px solid #ccc;
		border-bottom:1px solid #ccc;
		margin:0.2rem 0;
		padding:0.4rem;
		.prompt-info{
			text-align: left;
			font-size: 0.28rem;
			letter-spacing: 0.02rem;
			line-height: 0.4rem;
			p{}
			.prompt-time{
				font-size: 0.2rem;
				color: #888;
				padding:0.2rem 0 0.4rem 0;
				span{
					padding-right: 0.2rem;
					i{
						padding-right:0.1rem;
					}
				}
			}
		}
		.prompt-nav{
			ul{
				display: flex;
				justify-content: space-between;
				text-align: center;
				li{
					font-size: 0.3rem;
					img{
						width: 0.8rem;
						height: 0.8rem;
					}
					p{
						padding:0.3rem 0 0.1rem 0;
					}
					span{
						color: #888;
						font-size: 0.2rem;
					}
				}
			}
		}
	}
</style>