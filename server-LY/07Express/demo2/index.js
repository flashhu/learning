var express = require('express');
//cookie详细文章 https://segmentfault.com/a/1190000004139342
//官网api http://expressjs.com/en/5x/api.html#res.cookie
var cookieParser = require('cookie-parser');
//https://segmentfault.com/a/1190000010306099
var session = require('express-session');
//跨域 https://github.com/Nealyang/YOU-SHOULD-KNOW-JS/blob/master/doc/basic_js/JavaScript%E4%B8%AD%E7%9A%84%E8%B7%A8%E5%9F%9F%E6%80%BB%E7%BB%93.md
var cors = require('cors');
//
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
//
var hbs = require('express-handlebars');
var multer = require('multer');
//告诉 Multer 将上传文件保存在哪
var upload = multer({dest:'upload/'});
var app = express();

var opt = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000 }
}

//此处不加（）会导致页面无法正常打开
app.use(cookieParser());
app.use(session(opt));

//全部路由
// app.use(cors());

// 创建写文件流 追加模式
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// 设置日志对象
app.use(morgan('combined', {stream: accessLogStream}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

//段1 段2不能同时执行 https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client#
app.get('/', function(req, res) { 
	console.log(req.session);
	//段2
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
    //段1
	// res.cookie('name', 'express').send('cookie set');
	//此处添加该句后 浏览器内再使用该句会报错 req not defined
	// console.log('Cookies: ', req.cookies);
})

// app.get('/products/:id', function (req, res, next) { //all
app.get('/products/:id', cors(), function (req, res, next) { //single
  res.json({msg: 'This is CORS-enabled for ~ origins!'})
})

app.get('/upload', (req, res) => {
  res.render('upload');
})

app.post('/upload', upload.single('avatar'), function (req, res, next) {
  let file = req.file
  let params = req.body
  res.send('upload finished')
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});