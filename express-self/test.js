const express = require('./express');
const app = express();
const port = 8080;

app.get('/', (req, res) =>{
	res.end('hello world')
})

app.get('/name', (req, res) => {
	res.end('name')	
})

app.post('/front', (req, res) => {
	res.json({
		message: 'success'
	})
})

app.listen(port, () => {
	console.log('Server at port 8080');
})