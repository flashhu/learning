class MyPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fullfilled';
    static REJECTED = 'rejected';
    constructor(executor) {
        this.value = null;
        this.status = MyPromise.PENDING;
        this.callbacks = [];
        try {
            // 如不绑定 this, this 会指向调用时的位置，非类实例
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(value) {
        // 状态只能改变一次
        if (this.status === MyPromise.PENDING) {
            this.value = value;
            this.status = MyPromise.FULFILLED;
            // 注意异步处理的情况  => 这里顺序就不太行了！
            setTimeout(() => {
                // 是否有存入的回调需要处理
                this.callbacks.map(cb => {
                    cb.onResolved(value);
                })
            });
        }
    }

    reject(reason) {
        // 状态只能改变一次
        if (this.status === MyPromise.PENDING) {
            this.value = reason;
            this.status = MyPromise.REJECTED;
            setTimeout(() => {
                // 是否有存入的回调需要处理
                this.callbacks.map(cb => {
                    cb.onRejected(reason);
                })
            });
        }
    }

    then(onResolved, onRejected) {
        // 传入非函数, 会发生值透传
        if(typeof onResolved !== 'function') {
            onResolved = value => value;
        }
        if (typeof onRejected !== 'function') {
            onRejected = value => value;
        }
        // 链式调用 => 返回 Promise
        let promise = new MyPromise((resolve, reject) => {
            if (this.status === MyPromise.PENDING) {
                // 此时改变状态是异步的
                // 将错误处理放到 onRejected 中统一处理
                this.callbacks.push({
                    onResolved: (value) => {
                        this.parse(promise, onResolved(value), resolve, reject);
                    },
                    onRejected: (value) => {
                        this.parse(promise, onRejected(value), resolve, reject);
                    }
                })
            }
            if (this.status === MyPromise.FULFILLED) {
                // 注意异步处理顺序，不会立即执行
                setTimeout(() => {
                    this.parse(promise, onResolved(this.value), resolve, reject);
                });
            }
            if (this.status === MyPromise.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject);
                });
            }
        })

        return promise;
    }

    parse(promise, result, resolve, reject) {
        if(promise === result) {
            throw new TypeError('Chaining cycle detected for promise');
        }
        try {
            // 判断是不是返回 promise 形式
            if (result instanceof MyPromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }

    static reject(reason) {
        // 不用判断是否为 promise, 直接返回
        return new MyPromise((_, reject) => {
            reject(reason);
        });
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let values = []
            promises.forEach(promise => {
                promise.then((value) => {
                    values.push(value);
                    if(values.length === promises.length) {
                        resolve(values);
                    }
                }, (reason) => {
                    reject(reason);
                })
            });
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then((value) => {
                    resolve(value);
                }, (reason) => {
                    reject(reason);
                })
            });
        })
    }
}