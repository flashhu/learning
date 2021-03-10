const fs = require('fs');
const parse = require('csv-parse');
const mysql = require('mysql');

const rootPath = 'C:\\Users\\asus\\Desktop\\finish\\Linux MCQs'

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
    const sql = `INSERT INTO questions (cnt, sel1, sel2, sel3, sel4, qkey ) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', ${data[5]})`;
    conn.query(sql, (err, rows) => {
        if (err) {
            console.log('Add Error: ', err, data);
        }
    })
}

function init() {
    const files = fs.readdirSync(rootPath);
    files.forEach((file)=>{
        let csvData = [];
        fs.createReadStream(`${rootPath}\\${file}`)
            .pipe(parse({ delimiter: ',' }))
            .on('data', function (csvrow) {
                csvData.push(csvrow);
            })
            .on('end', function () {
                csvData.forEach((item, index) => {
                    if(index !== 0 && item.length === 6) {
                        item[0] = item[0].replace(/\'/g, "\"").replace(/\n/g, "\r\n");
                        item[1] = item[1].replace(/\'/g, "\"").replace(/\n/g, "\r\n");
                        item[2] = item[2].replace(/\'/g, "\"").replace(/\n/g, "\r\n");
                        item[3] = item[3].replace(/\'/g, "\"").replace(/\n/g, "\r\n");
                        item[4] = item[4].replace(/\'/g, "\"").replace(/\n/g, "\r\n");
                        add(item);
                    }
                })
                console.log('add: ', file);
            });
    })
}

init()