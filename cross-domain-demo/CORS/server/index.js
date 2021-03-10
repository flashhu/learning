const express = require('express');
const app = express();
const cors = require('cors');

let whitList = ['http://localhost'] //设置白名单

// app.use(cors);
app.use(
    function (req, res, next) {
        let origin = req.headers.origin
        if (whitList.includes(origin)) {
            // 设置哪个源可以访问我
            res.setHeader('Access-Control-Allow-Origin', origin)
            // 允许携带哪个头访问我
            res.setHeader('Access-Control-Allow-Headers', 'name')
            // 允许哪个方法访问我
            res.setHeader('Access-Control-Allow-Methods', 'PUT')
            // 允许携带cookie
            res.setHeader('Access-Control-Allow-Credentials', true)
            // 预检的存活时间
            res.setHeader('Access-Control-Max-Age', 6)
            res.setHeader('Set-Cookie', `test=${Math.random()}`)
            // 允许返回的头
            res.setHeader('Access-Control-Expose-Headers', 'name')
            if (req.method === 'OPTIONS') {
                res.end() // OPTIONS请求不做任何处理
            }
        }
        next()
    }
)

app.put('/getData', function (req, res) {
    console.log(req.headers)
    res.setHeader('name', 'jw') //返回一个响应头，后台需设置
    res.end('ok')
})
app.get('/getData', function (req, res) {
    console.log(req.headers)
    res.send('ok')
})

// app.use(express.static(__dirname));

app.listen(8080);