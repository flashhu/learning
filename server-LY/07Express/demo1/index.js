var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var hbs = require('express-handlebars')
var app = express();

//设置模板引擎
app.set('view engine', 'hbs');
//设置静态资源目录
app.set('views', path.join(__dirname, 'views'));

// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// 解析 application/json
app.use(bodyParser.json()); 
// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function(req, res){
   res.render('form');
});

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

app.listen(8000);
