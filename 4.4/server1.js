const http = require("http"); // 실무에서는 https를 써야한다.

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중입니다 !");
  });
