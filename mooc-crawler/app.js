const cheerio = require('cheerio');
const axios = require('axios');
const mysql = require('mysql');

const baseUrl = 'https://www.sanfoundry.com/technical-interview-questions/';

const dbConf = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'webserver'
}

const conn = mysql.createConnection(dbConf);

/**
 * 插入数据
 */
const add = (data) => {
    const { url, cnt, sel1, sel2, sel3, sel4, qkey } = data;
    const sql = `INSERT INTO question (cnt, sel1, sel2, sel3, sel4, qkey, from_url ) VALUES ('${cnt}', '${sel1}', '${sel2}', '${sel3}', '${sel4}', ${qkey}, '${url}')`;
    conn.query(sql, (err, rows) => {
        if (err) {
            console.log('Add Error: ', err, data);
        } else {
            console.log('Add successfully: ', url);
        }
    })
}

/**
 * 截取选项（选项可能不足四个）
 */
function getOption(text, start, end, defEnd = 'View Answer') {
    let res = '';
    if (text.indexOf(start) !== -1) {
        const sIndex = text.indexOf(start) + start.length;
        const eIndex = text.indexOf(end) === -1 ? text.indexOf(defEnd) : text.indexOf(end);
        res = text.slice(sIndex, eIndex).trim();
    }
    return res;
}

/**
 * 获取某 url 内的题目
 */
async function getDetail(url) {
    const r = await axios.get(url);
    let $ = cheerio.load(r.data);

    $('.entry-content .collapseomatic_content').each((index, item) => {
        // 获取题目文本
        let dom = $(item).prev();
        let text = dom.text().trim().replace('advertisement', '');
        while (!(/^\d+\./.test(text))) {
            dom = dom.prev();
            if (!dom.text().length) {
                continue;
            }
            let newText = dom.text().trim().replace('advertisement', '');
            text = `${newText}\n${text}`;
        }

        // 截取题目的各字段
        const cnt = text.slice(text.indexOf('.') + 1, text.indexOf('a)')).trim();
        const sel1 = getOption(text, 'a)', 'b)');
        const sel2 = getOption(text, 'b)', 'c)');
        const sel3 = getOption(text, 'c)', 'd)');
        const sel4 = getOption(text, 'd)', 'View Answer');

        // 截取答案
        const ansText = $(item).text();
        const qkey = ansText.slice(ansText.indexOf(':') + 1, ansText.indexOf('\n')).trim().charCodeAt() - 97;

        // 插入数据
        add({ cnt, sel1, sel2, sel3, sel4, qkey, url });
    })
}

/**
 * 爬取题目
 */
async function getQ(baseUrl) {
    const r = await axios.get(baseUrl);
    if (!r || r.status !== 200) {
        return;
    }

    const $ = cheerio.load(r.data);

    // 获取待爬链接
    let urls = [];
    $('.entry-content table a').each((index, item) => {
        let url = $(item).attr('href')
        urls.push(url)
    })
    console.log('get urls successfully');

    // 获取题目
    for (let url of urls) {
        getDetail(url);
    }
}

getQ(baseUrl);