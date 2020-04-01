const express = require('express')
var things = require('./things.js')
const app = express()

app.use('/things', things);

app.get('/', (req, res) => {
    res.send('Hello world.')
})

app.get('/about', (req, res) => {
    res.send('About page of GET')
})

app.post('/about', (req, res) => {
    res.send('About page of POST')
})

app.all('/test', (req, res) => {
   res.send("HTTP method doesn't have any effect on this route!");
});

app.get('/:id', (req, res) => {
   res.send('The id is ' + req.params.id);
});

app.get('/number/:no([0-9]{5})', function(req, res){
   res.send('no: ' + req.params.no);
});

app.get('/more/:name/:id', (req, res) =>  {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.get('*', function(req, res){
   res.send('404. Sorry, this is an invalid URL.');
});

app.listen(3000, () => console.log('listening on port 3000'))