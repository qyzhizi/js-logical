const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置重定向路由
app.get('/redirect', (req, res) => {
    res.redirect('https://www.example.com?code=1234345'); // 修改为你想重定向的URL
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});