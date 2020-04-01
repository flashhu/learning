var express = require('express');
var moment = require('moment');
var fs = require('fs');
var app = express();

const port = 8900;
var data = JSON.parse(fs.readFileSync('./etc/passwd.json'))["data"];

app.get('/', (req, res) => {
	res.send('please change the url');
})

app.get('/time', (req, res) => {
	res.send(`${moment().format('YYYY-MM-DD hh:mm:ss')}`);
})

app.post('/user', (req, res) => {
	let list = []
	data.forEach((item) => {
		list = [item["name"], ...list]
	})
	res.send(list);
})

app.get('/phone/:id', (req, res) => {
	let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
	if(telStr.test(req.params.id)){
		res.send('success');
	}else {
		res.send('error');
	}
	
})

app.get('*', (req, res) => {
	res.send('404');
})

app.listen(port, ()=> console.log(`listening on port ${port}`));