(function($, window, document, undefined) {
	//定义分页类
	function Paging(element, options) {
		this.element = element;
		//传入形参
		this.options = {
			pageNo: options.pageNo||1,
			totalPage: options.totalPage,
			totalSize:options.totalSize,
			callback:options.callback
		};
		//根据形参初始化分页html和css代码
		this.init();
	}
	//对Paging的实例对象添加公共的属性和方法
	Paging.prototype = {
		constructor: Paging,
		init: function() {
			this.creatHtml();
			this.bindEvent();
		},
		creatHtml: function() {
			var me = this;
			var content = "";
			var current = me.options.pageNo;
			var total = me.options.totalPage;
			var totalNum = me.options.totalSize;
			content += "<span id='spanFirst' class='spanFirst'>首页</span><span id='spanPre' class='spanPre'>上一页</span>";
			content += "第<b class='indexPage'>"+current+"</b>页/";
			content += "<b>共</b><em id='spanTotalPage' class='spanTotalPage'>"+total+"</em><b>页/</b>";
			content += "<b>共</b><em id='spanTotalNum' class='spanTotalNum'>"+totalNum+"</em><b>条数据</b>";
			//总页数大于6时候
			// if(total > 6) {
			// 	//当前页数小于5时显示省略号
			// 	if(current < 5) {
			// 		for(var i = 1; i < 6; i++) {
			// 			if(current == i) {
			// 				content += "<span class='current'>" + i + "</span>";
			// 			} else {
			// 				content += "<span>" + i + "</span>";
			// 			}
			// 		}
			// 		content += ". . .";
			// 	} else {
			// 		 //判断页码在末尾的时候
			// 		if(current < total - 3) {
			// 			for(var i = current - 2; i < current + 3; i++) {
			// 				if(current == i) {
			// 					content += "<span class='current'>" + i + "</span>";
			// 				} else {
			// 					content += "<span>" + i + "</span>";
			// 				}
			// 			}
			// 			content += ". . .";
			// 		//页码在中间部分时候
			// 		} else {
			// 			content += "<span>1</span>";
			// 			content += ". . .";
			// 			for(var i = total - 4; i < total + 1; i++) {
			// 				if(current == i) {
			// 					content += "<span class='current'>" + i + "</span>";
			// 				} else {
			// 					content += "<span>" + i + "</span>";
			// 				}
			// 			}
			// 		}
			// 	}
			// 	//页面总数小于6的时候
			// } else {
			// 	for(var i = 1; i < total + 1; i++) {
			// 		if(current == i) {
			// 			content += "<span class='current'>" + i + "</span>";
			// 		} else {
			// 			content += "<span>" + i + "</span>";
			// 		}
			// 	}
			// }
			content += "<span id='spanNext' class='spanNext'>下一页</span>";
			content += "<span id='spanLast' class='spanLast'>末页</span>";
			content += "第<b class='hide_val'>"+current+"<input type='text' class='input_val' id='input' /></b>页";
			content += "<span id='go' class='go'>GO</span>";
			// content += "<b>第</b><span id='spanPageNum'>"+current+"</span><b>页/</b>";
			// content += "<b>共</b><em id='spanTotalPage' class='spanTotalPage'>"+total+"</em><b>页</b>";
			// content += "<b>共</b><em id='spanTotalNum' class='spanTotalNum'>"+totalNum+"</em><b>条数据</b>";
			me.element.html(content);
		},
		//添加页面操作事件
		bindEvent: function() {
			var me = this;
			// console.log(me.element);
			me.element.find('#input').focus(function(){
				$(this).css('background','#fff');
			});
			me.element.off('click', 'span');
			me.element.on('click', 'span', function() {
				var num = $(this).html();
				var id=$(this).attr("id");
				if(id == "spanPre") {
					if(me.options.pageNo == 1) {
						me.options.pageNo = 1;
					} else {
						me.options.pageNo = +me.options.pageNo - 1;
					}
				} else if(id == "spanNext") {
					if(me.options.pageNo == me.options.totalPage) {
						me.options.pageNo = me.options.totalPage
					} else {
						me.options.pageNo = +me.options.pageNo + 1;
					}

				} else if(id =="spanFirst") {
					me.options.pageNo = 1;
				} else if(id =="spanLast") {
					me.options.pageNo = me.options.totalPage;
				}else if(id=='go'){
					var input_val=$('#input').val();
					$('#input').val(input_val.replace(/\D|^0/g,''));
					if((input_val>1||input_val==1)&(input_val<me.options.totalPage||input_val==me.options.totalPage)){
						me.options.pageNo = input_val;
					}else{
						return false
					}
				}else{
					me.options.pageNo = +num;
				}
				me.creatHtml();
				if(me.options.callback) {
					me.options.callback(me.options.pageNo);
				}
			});
		}
	};
	//通过jQuery对象初始化分页对象
	$.fn.paging = function(options) {
		return new Paging($(this), options);
	}
})(jQuery, window, document);