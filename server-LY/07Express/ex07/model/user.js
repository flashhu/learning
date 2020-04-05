/**
 * 用户数据模型
 */
module.exports = class User extends require('./model') {
    /**
     * 新增用户
     */
    static signUp(email, passwd) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `user` SET email = ?, passwd = ?';
            this.query(sql, [email, passwd]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`添加用户失败：${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 查询用户
     */
    static findOne(email) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `user` WHERE email = ?';
            this.query(sql, email).then(results => {
                resolve(results.length);
            }).catch(err => {
                console.log(`查询用户失败：${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 用户登录
     */
    static login(email, passwd) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `user` WHERE email = ? AND passwd = ?';
            this.query(sql, [email, passwd]).then(results => {
                resolve(results.length);
            }).catch(err => {
                console.log(`用户登录失败：${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取用户列表
     */
    static getUser() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `user` ORDER BY `email`';
            this.query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                console.log(`获取用户列表失败：${err.message}`);
                reject(err);
            })
        }) 
    }
}