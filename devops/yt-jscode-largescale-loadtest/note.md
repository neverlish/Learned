# 1.5 [실습] EC2에 간단한 API 서버 세팅하기

- sudo su
-

```
apt-get update & /
apt-get install -y ca-certificates curl gnupg && /
mkdir -p /etc/apt/keyrings && /
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && /
NODE_MAJOR=20 && /
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list && /
apt-get update && /
apt-get install nodejs -y
```

- node -v

- mkdir my-server
- cd my-server

- npm init
- npm i express

- vi app.js

```
const express = require('express')
const app = express();

const port = 80

app.get('/boards', (req, res) => {
  res.send([
    { id: 1, title: '첫 번째 게시글', content: '이것은 첫 번째 게시글의 내용입니다.' },
    { id: 2, title: '두 번째 게시글', content: '이것은 두 번째 게시글의 내용입니다.' },
    { id: 3, title: '세 번째 게시글', content: '이것은 세 번째 게시글의 내용입니다.' },
  ]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

- npm i -g pm2
- pm2 start app.js
