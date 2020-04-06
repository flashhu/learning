var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var hbs = require('express-handlebars');
// var cookieParser = require('cookie-parser');
// var session = require('express-session')
// var vaildator = require('validator.tool');
// var v = new validator();
var app = express();
const LEN = 4; //验证码长度
// var Users = [];
var code = '';
const interval = 180000; //3min

const User = require('./model/user');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
	extname: '.hbs',
	defaultLayout: 'default',
	layoutDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({secret: "My secret key"}));

app.get('/', (req, res) => {
	if(code){
	  res.render('signup', {showbtn: true});
	}else {
	  res.render('signup');
	}
})

//点击获取验证码
app.post('/sendcode', function(req, res){
    for(let i = 0;i < LEN;i ++){
    	code += `${Math.floor(Math.random()*10)}`; 
    }
	console.log('code', code);
	// setTimeout(function () { code = '' }, interval);
    // req.session.code = code;
    res.redirect('/');
})

//提交信息
app.post('/', function (req, res){
	console.log('sign up post:', req.body);
	var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	console.log('code', code);
	if (!emailreg.test(req.body.email)) {
		res.render('signup', { message: "邮箱格式有误!" });
	}
	if (code !== req.body.verify) {
		console.log('code', code);
		res.render('signup', { message: "验证码错误!" });
	}
	if (req.body.passwd !== req.body.rePasswd) {
		res.render('signup', { message: "密码两次不一致!" });
	}
	User.findOne(req.body.email).then(count => {
		// console.log('findone count:', count);
		if(count > 0) {
			res.render('signup', { message: "用户已存在!" });
		}else {
			User.signUp(req.body.email, req.body.passwd).then(result => {
				// console.log('sign up:', result);
				res.redirect('login');
			}).catch(err => {
				console.log('sign up error:', err);
			})
		}
	}).catch(err => {
		console.log('find error:', err);
	})
        	
})

app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', function (req, res) {
	User.findOne(req.body.email).then(count => {
		if(count === 0){
			res.render('signup', { message: "用户不存在，请先注册!" });
		}else {
			User.login(req.body.email, req.body.passwd).then(count => {
				// console.log('login count:', count);
				if(count === 1) {
					res.redirect('/home');
				}else {
					res.render('login', { message: "邮箱或密码错误!" });
				}
			}).catch(err => {
				console.log('find error:', err);
			})
		}
	}).catch(err => {
		console.log('find error:', err);
	})
});

app.get('/home', function (req, res) {
	res.render('index');
});

app.get('/admin', function (req, res) {
	User.getUser().then(result => {
		let str = JSON.stringify(result);
		let users = JSON.parse(str);
		// console.log(users);
		res.render('admin', { users: users});
	}).catch(err => {
		console.log('admin getUser error:', err);
		res.render('admin', { message: "数据被外星人劫持了..." });
	})
})


app.listen(8000)

//两个按钮POST的不同响应，做法参考文1，文2解法目前不会orz
//https://www.cnblogs.com/xieyunc/p/9126449.html
//https://cnodejs.org/topic/56ab08a771204e03637a36c0
//分开两个路由处理之后，对一些参数传递处理，问题很多... 