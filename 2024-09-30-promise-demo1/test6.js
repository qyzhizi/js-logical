function myPromise(callback) {
    // 保存 Promise 的状态和结果
    let state = 'pending';
    let result = undefined;
    const onFulfilledCallbacks = [];
    const onRejectedCallbacks = [];

    // 定义 resolve 函数
    function resolve(value) {
        if (state === 'pending') {
            state = 'fulfilled';
            result = value;
            // 执行所有 onFulfilled 回调
            onFulfilledCallbacks.forEach(cb => cb(result));
        }
    }

    // 定义 reject 函数
    function reject(reason) {
        if (state === 'pending') {
            state = 'rejected';
            result = reason;
            // 执行所有 onRejected 回调
            onRejectedCallbacks.forEach(cb => cb(result));
        }
    }

    // 执行传入的回调函数
    try {
        callback(resolve, reject);
    } catch (error) {
        reject(error);
    }

    // 返回一个具有 then 方法的对象
    return {
        then: function (onFulfilled, onRejected) {
            return myPromise((resolve, reject) => {
                // 根据 Promise 的状态调用相应的回调函数
                if (state === 'fulfilled') {
                    onFulfilled ? resolve(onFulfilled(result)) : resolve(result);
                } else if (state === 'rejected') {
                    onRejected ? reject(onRejected(result)) : reject(result);
                } else {
                    // 如果还是 pending 状态，保存回调函数
                    onFulfilledCallbacks.push(value => {
                        if (onFulfilled) {
                            resolve(onFulfilled(value));
                        } else {
                            resolve(value);
                        }
                    });
                    onRejectedCallbacks.push(reason => {
                        if (onRejected) {
                            reject(onRejected(reason));
                        } else {
                            reject(reason);
                        }
                    });
                }
            });
        },
    };
}

// 使用手写的 Promise
const promise = myPromise(function (resolve, reject) {
    setTimeout(function () {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
            resolve(randomNumber);
        } else {
            reject(`Error: Random number ${randomNumber} is less than 0.5`);
        }
    }, 10);
});

// 使用 then 方法处理 Promise 的结果
promise.then(
    function (value) {
        console.log('Fulfilled:', value);
        return value + 1; // 返回一个新的值以测试链式调用
    },
    function (reason) {
        console.log('Rejected:', reason);
        return reason
    }
).then(
    function (value) { 
        console.log('Chained Fulfilled:', value); 
    },
    function (reason) { 
        console.log('Chained Rejected:', reason); 
    }
);