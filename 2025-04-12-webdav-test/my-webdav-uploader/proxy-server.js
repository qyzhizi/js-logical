const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' })); // increase the limit


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.put('/upload', bodyParser.json(), async (req, res) => {
  const { fileContent, fileName } = req.body;
  const remotePath = req.query.remotePath; // 从查询参数获取远程路径
  if (!remotePath) {
    return res.status(400).send('Missing remote path');
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).send('Unauthorized');
  }

  // 解析 Basic Auth
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // 构造坚果云 WebDAV URL
  // const targetUrl = `https://abc.qyzhizi.cn:8081/remote.php/dav/files/qy/${remotePath}/backup.json`;

  // const authHeadersend = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  // console.log("Auth header:", authHeadersend);
  
  const targetUrl = `https://dav.jianguoyun.com/dav/${remotePath}/${fileName}`;
  console.log('targetUrl: ', targetUrl)

  try {
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: fileContent  // fileContent 最好是字符串
    });
    console.log("[Any Proxy]", targetUrl, {
      status: response.status,
      statusText: response.statusText,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy error');
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});