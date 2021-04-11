const mysql = require('mysql');
const { conf } = require('./config.js');
const pool = mysql.createPool(conf);

/**
 * 通用语句
 * @param {string} sql 输入完整 SQL
 * @returns 
 */
const query = function (sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if(error) {
                console.log('query error:', sql);
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * 查询语句(*)
 * @param {string} table
 * @returns 
 */
const selectAll = function (table) {
    return new Promise((resolve, reject) => {
        const sql = `select * from ${table}`;
        pool.query(sql, (error, result) => {
            if (error) {
                console.log('selectAll error:', sql);
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * 插入语句
 * @param {string} table 
 * @param {object} params 
 * @returns 
 */
const add = function (table, params) {
    return new Promise((resolve, reject) => {
        const sql = `insert into ${table} (${Object.keys(params).join(',')}) values('${Object.values(params).join('\',\'')}')`;
        pool.query(sql, (error, result) => {
            if (error) {
                console.log('add error:', sql);
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

exports.query = query;
exports.selectAll = selectAll;
exports.add = add;