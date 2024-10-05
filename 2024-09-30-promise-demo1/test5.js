function myPromise(callback) {
    // 保存 Promise 的状态和结果
    let state = 'pending';
    let result = undefined;
  
    // 定义 resolve 函数
    function resolve(value) {
      // 状态只能从 pending 转变为 fulfilled
      if (state === 'pending') {
        state = 'fulfilled';
        result = value;
      }
    }
  
    // 定义 reject 函数
    function reject(reason) {
      // 状态只能从 pending 转变为 rejected
      if (state === 'pending') {
        state = 'rejected';
        result = reason;
      }
    }
  
    // 执行传入的回调函数
    try {
      callback(resolve, reject);
    } catch (error) {
      // 如果回调函数抛出异常，将 Promise 的状态设置为 rejected
      reject(error);
    }
  
    // 返回一个具有 then 方法的对象
    return {
      then: function (onFulfilled, onRejected) {
        // 根据 Promise 的状态调用相应的回调函数
        if (state === 'fulfilled') {
          onFulfilled(result);
        } else if (state === 'rejected') {
          onRejected(result);
        }
      },
    };
  }
  
  // 使用手写的 Promise
  const promise = myPromise(function (resolve, reject) {
    // 模拟异步操作
    setTimeout(function () {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        resolve(randomNumber);
      } else {
        reject('Error: Random number is less than 0.5');
      }
    }, 10);
  });
  
  // 使用 then 方法处理 Promise 的结果

  promise.then(
    function (value) {
      console.log('Fulfilled:', value);
    },
    function (reason) {
      console.log('Rejected:', reason);
    }
  );
  