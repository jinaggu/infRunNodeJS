const http = require("http");

const server = http
  .createServer((req, res) => {
    // 응답을 보낼때 이게 html인지 알려줘야하기 떄문에 헤드에 넣어보낸다.
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h1>hello Node2</h1>");
    res.write("<h1>hello Server</h1>");
    res.end("<p>Hello ZeroCho</p>");
  })
  .listen(8080, () => {
    console.log("8080 포트에서 서버 대기중입니다.");
  });

server.on("listening", () => {
  console.log("8080 서버에서 대기중입니다.");
});

server.on("error", (error) => {
  console.error(error);
});

// 이렇게 서버 두개를 돌릴수 있다. (2-3개도 그 이상도 가능. 하지만 그렇게는 잘 안함.)
const server1 = http
  .createServer((req, res) => {
    // 응답을 보낼때 이게 html인지 알려줘야하기 떄문에 헤드에 넣어보낸다.
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h1>hello Node2</h1>");
    res.write("<h1>hello Server</h1>");
    res.end("<p>Hello ZeroCho</p>");
  })
  .listen(8081, () => {
    console.log("8080 포트에서 서버 대기중입니다.");
  });
