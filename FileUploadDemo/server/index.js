const express = require('express')
const cors = require('cors')
const formidable = require('formidable');
const moment = require('moment')
const fs = require('fs')
const app = express();
const port = 8090;

app.use(cors())
//设置静态目录
app.use(express.static(__dirname + '/'))

app.get('/', (req, res)=>{
    res.send('hello')
})

app.post('/upload', (req, res)=>{
    //创建IncomingForm对象
    const form = new formidable.IncomingForm()
    //设置上传文件存放位置 对应之后的 oldpath
    form.uploadDir = "./upload/test"; 

    //转换请求中所包含的表单数据 fields为所传参数，files.file为文件对象
    form.parse(req, (err1, fields, files) => {
        if(err1) {
            res.send(`err:${err}`)
        }
        
        let ext = files.file.name.split('.').slice(-1);
        let fname = `${moment().format('YYYYMMDDhhmmss')}.${ext}`;
        let oldPath = files.file.path;
        let newPath = './upload/' + fname;

        //文件重命名
        fs.rename(oldPath, newPath, (err2) => {
            if(err2) {
                res.send(`err:${err2}`)
            }else {
                res.send('upload file successfully')
            }
        })
    })
})

//设置端口号
app.listen(port, () => console.log(`Running on localhost:${port}`))