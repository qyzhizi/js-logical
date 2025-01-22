const http = require('http');
const url = require('url');
const crypto = require('crypto');
const querystring = require('querystring');

// 用于生成 CSRF 令牌
const secret = 'your-secret-key'; 
const tokens = {}; // 存储 CSRF 令牌

// 生成 CSRF 令牌
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

// 验证 CSRF 令牌
function validateToken(formToken, cookieToken) {
    return formToken === cookieToken && tokens[cookieToken] !== undefined;
}

// 解析 cookie 字符串的简单函数
function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    cookieHeader.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = decodeURIComponent(value);
    });
    return cookies;
}

// 创建服务器
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // 解析 cookie
    const cookies = parseCookies(req.headers.cookie);

    // 处理 GET 请求以生成 CSRF 令牌
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        const token = generateToken();
        tokens[token] = true; // 存储令牌
        res.setHeader('Set-Cookie', `csrfToken=${token}; HttpOnly; Path=/`);
        
        // 返回一个简单的 HTML 表单
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CSRF Protection Example</title>
            </head>
            <body>
                <h1>CSRF Protection Example</h1>
                <form method="POST" action="/submit">
                    <input type="hidden" name="_csrf" value="${token}">
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `);
        return;
    }

    // 处理 POST 请求以验证 CSRF 令牌
    if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // 将数据拼接到 body 中
        });
        req.on('end', () => {
            const postData = querystring.parse(body);
            const formToken = postData._csrf;
            const cookieToken = cookies.csrfToken; // 从 cookie 中获取 CSRF 令牌

            // 验证 CSRF 令牌
            if (validateToken(formToken, cookieToken)) {
                delete tokens[cookieToken]; // 验证后删除令牌
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('CSRF token is valid. Form submitted successfully.');
            } else {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('Invalid CSRF token.');
            }
        });
        return;
    }

    // 处理其他请求
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
