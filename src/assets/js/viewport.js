/*
*
* 如何使用
特别强调：绝不是每个地方都要用rem，rem只适用于固定尺寸！
在相当数量的布局情境中（比如底部导航元素平分屏幕宽，大尺寸元素），你必须使用百分比或者flex才能完美布局！
此方案也是默认 1rem = 100px，所以你布局的时候，完全可以按照设计师给你的效果图写各种尺寸啦。
比如你在效果图上量取的某个按钮元素长 55px, 宽37px ，那你直接可以这样写样式：
.myBtn {
      width: 0.55rem;
      height: 0.37rem;
}。

* flex(false, 100, 1)，默认情况下页面是开启压缩的。
如果你需要禁止压缩，由于我们的源码执行后，直接将flex函数挂载到全局变量window上了，
此时你直接在需要禁止压缩的页面执行 window.flex(true) 就可以了，而rem的用法保持不变。
有一点美中不足的是，如果禁止了页面压缩，高清屏的1像素就不能实现了。

*在X5新内核Blink中，在排版页面的时候，会主动对字体进行放大，会检测页面中的主字体，
当某一块字体在我们的判定规则中，认为字号较小，并且是页面中的主要字体，就会采取主动放大的操作。
然而这不是我们想要的，可以采取给最大高度解决，（*, *:before, *:after { max-height: 100000px }）。


*把下面这段已压缩过的 原生JS（仅1kb）放到html的head标签中即可（注:不要手动设置viewport，该方案自动帮你设置）。
*
*https://www.yudouyudou.com/jiaochengheji/Html_css/1210.html
 */
!function(e) {
	function t(a) {
		if (i[a]) return i[a].exports;
		var n = i[a] = {
			exports: {},
			id: a,
			loaded: !1
		};
		return e[a].call(n.exports, n, n.exports, t),
		n.loaded = !0,
		n.exports
	}
	var i = {};
	return t.m = e,
	t.c = i,
	t.p = "",
	t(0)
} ([function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var i = window;
	t["default"] = i.flex = function(normal, e, t) {
		var a = e || 100,
		n = t || 1,
		r = i.document,
		o = navigator.userAgent,
		d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
		l = o.match(/U3\/((\d+|\.){5,})/i),
		c = l && parseInt(l[1].split(".").join(""), 10) >= 80,
		p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
		s = i.devicePixelRatio || 1;
		p || d && d[1] > 534 || c || (s = 1);
		var u = normal ? 1 : 1 / s,
		m = r.querySelector('meta[name="viewport"]');
		m || (m = r.createElement("meta"), m.setAttribute("name", "viewport"), r.head.appendChild(m)),
		m.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + u + ",maximum-scale=" + u + ",minimum-scale=" + u),
		r.documentElement.style.fontSize = normal ? "50px": a / 2 * s * n + "px"
	},
	e.exports = t["default"]
}]);
flex(true, 100, 1);
