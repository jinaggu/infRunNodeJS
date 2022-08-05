const http = require("http");
const fs = require("fs").promises;

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    if (req.url == "/") {
      const data = await fs.readFile("./restFront.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    }
    try {
      const data = await fs.readFile(`.${req.url}`);
      return res.end(data);
    } catch (err) {
      // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
    }
  })
  .listen(8082, () => {
    console.log("8082 서버 대기중입니다.");
  });
