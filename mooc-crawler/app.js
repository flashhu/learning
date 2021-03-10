const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const baseUrl = 'https://www.sanfoundry.com/technical-interview-questions/';

/**
 * 截取选项 选项可能不足四个，可能形如\n a) 或\na)
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
 * 获取某单元格内容
 */
function getContent(value) {
    if (/[\/.-]/g.test(value) && /^\d+$/.test(value.replace(/[\/.-]/g, ''))) {
        console.log('change');
        // 形如1/1/1 csv中自动转化为日期
        return `="${value}"`;
    }
    return `"${value}"`;
}

/**
 * 获取某 url 内的题目
 */
async function getDetail(url) {
    const r = await axios.get(url);
    let $ = cheerio.load(r.data);

    let csvContent = 'cnt,sel1,sel2,sel3,sel4,qkey\r\n';

    $('.entry-content .collapseomatic_content').each((index, item) => {
        // 获取题目文本
        let dom = $(item).prev();
        let text = dom.text().trim().replace('advertisement', '');
        while (!(/^\d+\./.test(text))) {
            dom = dom.prev();
            if (!dom.text().length) {
                continue;
            }
            let newText = ''
            if(dom.find('ol').length) {
                // ol包裹的代码块
                $(dom.find('ol')[0]).children('li').each((index, item)=>{
                    if(index === 0) {
                        newText += $(item).text();
                    }else {
                        newText += `\n${$(item).text()}`;
                    }
                })
            } else {
                newText = dom.text().trim().replace('advertisement', '');
            }
            text = `${newText}\n${text}`;
        }
        text = text.replace(/[\"“”]/g, "\"\"").replace(/[‘’]/g, "\'");

        // 截取题目的各字段
        // const cnt = text.slice(text.indexOf('.') + 1, text.search(/(\\n|\s)a\)/) + 3).trim(); //考虑\n a)
        const cnt = text.slice(text.indexOf('.') + 1, text.indexOf('a)')).trim();
        const sel1 = getOption(text, 'a)', '\nb)');
        const sel2 = getOption(text, '\nb)', '\nc)');
        const sel3 = getOption(text, '\nc)', '\nd)');
        const sel4 = getOption(text, '\nd)', 'View Answer');

        // 截取答案
        const ansText = $(item).text();
        const qkey = ansText.slice(ansText.indexOf(':') + 1, ansText.indexOf('\n')).trim().charCodeAt() - 97;

        // 插入数据
        // console.log({ text, cnt, sel1, sel2, sel3, sel4, qkey, url });
        // console.log(`"${cnt}",${getContent(sel1)},${getContent(sel2)},${getContent(sel3)},${getContent(sel4)},${qkey}\r\n`);
        csvContent += `"${cnt}","${sel1}","${sel2}","${sel3}","${sel4}",${qkey}\r\n`;
    })

    const fileName = url.substr(url.indexOf('com/') + 4).replace('/', '');
    fs.writeFileSync(`./data/${fileName}.csv`, csvContent, { flag: 'a' });
    console.log('Add successfully: ', url);
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
    // let urls = [];
    // $('.entry-content table a').each((index, item) => {
    //     let url = $(item).attr('href')
    //     urls.push(url)
    // })
    // console.log('get urls successfully: ', urls.length);
    // console.log(urls);

    // getDetail('https://www.sanfoundry.com/unix-internals-interview-questions/');
    getDetail('https://www.sanfoundry.com/linux-debugging-questions-answers-unix-domain-sockets/');

    // 获取题目
    // for (let url of urls) {
    //     getDetail(url);
    // }
}

getQ(baseUrl);