<template>
	<div class="recommend">
		<div class="airquality-head">
			<router-link to="/home" class="airquality-link">
				<i class="el-icon-arrow-left"></i>每日推荐
			</router-link>
		</div>
		<div class="recommendinfo">推荐信息</div>
	</div>
</template>
<script type="text/javascript">
	
</script>
<style type="text/css" lang="scss" scoped="scoped">
	/deep/.recommend{
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
				i{
					padding-right:0.2rem;
				}
			}
		}
	}
</style>