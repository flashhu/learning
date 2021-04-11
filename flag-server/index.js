const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');
const app = express();
const { query, add, selectAll } = require('./db.js');
const port = 8081;

app.use(express.json());
app.use(cors());

/**
 * collect - onload
 */
app.get('/api/avatar.jpg/', async (req, res) => {
    const data = req.query;
    data.date = dayjs(new Date()).format('YYYY-MM-DD');
    try {
        await add('load_log', data);
        console.log('load log success:', data);
    } catch (error) {
        console.log('load log error:', error);
    }
})

/**
 * collect - error
 */
app.get('/api/error.jpg/', async (req, res) => {
    const data = req.query;
    data.date = dayjs(new Date()).format('YYYY-MM-DD');
    console.log(data);
    try {
        await add('error_log', data);
        console.log('error log success:', data);
    } catch (error) {
        console.log('error log error:', error);
    }
})

app.get('/api/log/:type', async (req, res) => {
    const type = req.params.type;
    try {
        const data = await selectAll(type === 'error' ? 'error_log': 'load_log');
        console.log('get log success:', data.length);
        res.send(data);
    } catch (error) {
        console.log('get log error:', error);
        res.send({
            code: 0
        })
    }
})

app.listen(port, () => { console.log('Running on localhost:8081') });