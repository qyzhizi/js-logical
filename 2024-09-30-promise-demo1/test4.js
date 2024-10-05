console.log("任务1开始");

setTimeout(() => {
  console.log("异步任务完成");
}, 0);


console.log("任务2开始");

// 模拟一个耗时的同步任务
for (let i = 0; i < 1e9; i++) {}

console.log("任务2结束");
