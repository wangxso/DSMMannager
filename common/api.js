import Request from '@/utils/request.js'
let request = new Request().http

//全局定义请求头
const sys = {
	info(){
		return request({
			url: '/sys/info',
			method: 'GET',
			hideLoading: true,
		})
	},
	status() {
		return request({
			url: '/sys/status',
			method: 'GET',
			hideLoading: true,
		})
	}
}

const user = {
	login(username, password){
		return request({
			url: '/sys/login',
			method: 'POST',
			data: {
				'username': username,
				'password': password
			},
			header: {
				'content-type': 'application/json'
			}
		})
	}
}


const api = {
	sys,
	user,
	
}
/*
请求样式：
    自定义名字: function(data) {
        return request({
            url: "/banner", //请求头
            method: "GET", //请求方式 
            data: data,    //请求数据
            token: token, // 可传  
            hideLoading: false, //加载样式
        })
    },
*/

export default api