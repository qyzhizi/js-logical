async function fetchData() {
    return 'data';  // 实际上返回的是一个 Promise
}

fetchData().then(data => console.log(data)); // 输出 'data'