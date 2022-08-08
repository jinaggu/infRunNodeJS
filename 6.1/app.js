const express = require("express"); // http 서버를 쓰고있는 express 서버를 우리가 쓰고있는거기때문에 http를 쓰는것임.
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000); // process.env.PORT 가없으면 3000포트를 쓴다는것.

app.use((req, res, next) => {
  // 위에서 부터 아래로 실행이 된다.
  console.log("모든 요청에 실행하고 싶어요.");
  next(); // app.use 같은 미들웨어는 next() 를 해줘야 다음걸로 넘어 간다.
});

app.get("/", (req, res) => {
  console.log("app.get('/')");
  console.log(`dirname : ${__dirname}`);
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/", (req, res) => {
  console.log("app.post('/')");
  res.send("hello express");
});

app.get("/category/Javascript", (req, res) => {
  res.send("hello Javascript");
});

app.get("/category/:name", (req, res) => {
  // 이렇게 파람으로 url 을 받아오는 와일드 카드같은 경우에는 후반부에 넣어줘야한다.
  // 위에넣어놓으면 위에서 먼저 걸려서 밑에 지정 url이 있어도 그 지정 url이 실행이 안되는 경우가 있다.
  res.send("hello wildcard");
});

app.get("/about", (req, res) => {
  console.log("app.get('/about')");
  res.send("hello express");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
