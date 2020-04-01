var express = require('express');
//解析附加了有效负载的请求主体
var bodyParser = require('body-parser');
//解析Cookie头，填充req.cookies
//具体使用 https://segmentfault.com/a/1190000004139342
// var cookieParser = require('cookie-parser');
//提供静态文件
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//不使用签名
// app.use(cookieParser());

//http://localhost:3000/image/blog.png 可查看图片  根目录为public文件夹内
//设置多个时，按顺序查找， 可设置虚拟路径前缀
//使用内置中间件函数  https://expressjs.com/zh-cn/starter/static-files.html
// app.use(express.static(__dirname + '/public'))
//使用path
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next){
   console.log("Start");
   next();
});

app.get('/', function(req, res, next){
   res.send("Middle");
   next();
});

app.post('/', function(req, res){
	let params = JSON.stringify(req.body);
	// 加不加bodyParser 都很长很长orz
	// console.log(req);
	//加 string类型 {}；不加 undefined类型
	console.log(params);
	res.send(params);
})

app.use('/', function(req, res){
   console.log('End');
});

app.use('things', function(req, res, next) {
	console.log("A new request received at " + Date.now());

	next();
})

app.get('/things', function(req, res) {
	res.send("things");
})

app.listen(3000);