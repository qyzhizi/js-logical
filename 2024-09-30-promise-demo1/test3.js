// resolve(value) 最终会返回一个新的 Promise，这个 Promise 的状态会被设置为 "fulfilled"，且值为传入的 value
let p = new Promise((resolve, reject) => {
    resolve(42);  // Promise 状态将变为 "fulfilled"，结果是 42
});
p.then(result => console.log(result)); // 输出: 42
