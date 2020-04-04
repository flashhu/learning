var express = require('express');
var multer = require('multer');
var path = require('path');
var hbs = require('express-handlebars');
var formidable = require('formidable');
var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //设置保存文件的路径
    cb(null, 'uploads/'+ req.body.type)
  },
  filename: function (req, file, cb) {
    //修改上传文件名称
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
  }
})
var upload = multer({ storage: storage })

// function uploadImg(file,id,type) {
//     let config = { w:1080, h:1080, p: 0.35 }
//     let blob = await fileToBlob(file,config.w,config.h,config.p)
//     let forms = new FormData()
//     forms.append('file',blob,'upload.jpg')
//     let r = await this.post(urls.API_UPLOAD_IMG, forms, true)
//     if (r && r.code === 200) {
      
//     }
// }

// function fileToBlob(file, width, height, quality) {
//     let drawable = await createImageBitmap(file)
//     let sw = drawable.width
//     let sh = drawable.height
//     let type = "image/jpeg"

//     const canvas  = document.createElement('canvas')
//     canvas.width  = width
//     canvas.height = height
//     const ctx = canvas.getContext('2d')
//     if (!ctx) throw new Error('Could not create canvas context')
//     ctx.drawImage(drawable, 0, 0, sw, sh, 0, 0, width, height)
//     let blob = await new Promise(r => canvas.toBlob(r, type, quality))
//     return  blob
// }

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

app.get('/', function(req, res){
   //创建一个错误并且将其传递到下个函数
   var err = new Error("Something went wrong");
   next(err);
});

app.post('/upload', function(req, res, next) {
  var uploadFile = "";
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';                  //上传文件编码格式
  form.uploadDir = "upload";                //上传文件保存路径
  form.keepExtensions = true;               //保持上传文件后缀
  form.maxFieldsSize = 300 * 1024 * 1024;  
  form.parse(req);
  // console.log(req); //巨长

  form
    .on('file', function(field, file) {
      // avator ?
      // console.log(field);
      //file.path 文件路径 file.name 原有文件名 file.type 文件类型
      // console.log(file);  
      uploadFile = file.path;               //上传的文件数据
    })
    .on('end', function() {
      res.status(200).json({
        code: 200,
        msg: '上传成功',
        data:uploadFile
      })
    });
})

app.get('/upload', function(req, res){
   res.render('upload');
});

app.use(function(err, req, res, next) {
   res.status(500);
   res.send("something went wrong.")
});

app.listen(8000);