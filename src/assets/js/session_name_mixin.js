/*
*监听账号密码是否存在，是，继续下一步，否请返回登录页面并清空sessionStorage
* 
 */
function session_n(){
	let get_watchstorage=sessionStorage.getItem('watchStorage');
	let get_namepath=location.pathname;//获取url端口号后面的页面的路径，例如：/jsref/prop-loc-pathname.html
	if(get_namepath=='/login'){
		sessionStorage.removeItem('watchStorage');
	}else{
		if(get_watchstorage==null||get_watchstorage==undefined||get_watchstorage==""){
			location.href="/login";
			return
		}
	}
}
var session_na=session_n();
export default {
	session_na
}