async function asyncTask() {
    console.log("任务开始");
    // let promise = await new Promise(resolve => setTimeout(resolve(10), 10000)); // 模拟异步任务
    let promise = await new Promise(resolve => setTimeout(() => resolve(10), 1000)); // 模拟异步任务

    console.log(promise)
    console.log("任务结束");
  }
  
asyncTask();
console.log("继续执行其他任务");
  