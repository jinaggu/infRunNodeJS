const http = require("http");

http
  .createServer((req, res) => {
    res.write("<h1>hello Node</h1>");
    res.write("<h1>hello Server</h1>");
    res.end("<p>Hello ZeroCho</p>");
  })
  .listen(8080, () => {
    console.log("8080 포트에서 서버 대기중입니다.");
  });
