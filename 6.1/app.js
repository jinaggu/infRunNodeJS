const express = require("express"); // http 서버를 쓰고있는 express 서버를 우리가 쓰고있는거기때문에 http를 쓰는것임.
const path = require("path");
const app = express(); // 1. app 먼저 만듬.
// 2. app에 관한 set설정을 해줌.
app.set("port", process.env.PORT || 3000); // process.env.PORT 가없으면 3000포트를 쓴다는것.

// 3. app에 관한 공통 미들웨어 추가.
app.use(
  (req, res, next) => {
    // 위에서 부터 아래로 실행이 된다.
    // app.use 로 그냥 해주면 모든요청에 이 미들웨어가 작동을 하고,
    // app.use('/about', (req, res, next) => {next()}) 이런식으로 해주면
    // about 요청이 왔을때 실행되고 next로 인해서 about라우터로 간다.
    console.log("모든 요청에 실행하고 싶어요.");
    next(); // app.use 같은 미들웨어는 next() 를 해줘야 다음걸로 넘어 간다.
  },
  (req, res, next) => {
    try {
      throw new Error("에러낫슈");
    } catch (err) {
      next(err); // next에 인수가 들어갈경우 에러라고 인식. 그래서 바로 에러처리 미들웨어로 들어가서 에러가 처리된다.
    }
  }
);

// 4. app에 관한 라우터 추가
app.get("/", (req, res) => {
  // 1번 방식
  // res.sendFile(path.join(__dirname, "./index.html"));

  // 2.번 방식
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(JSON.stringify({ hello: "gina" }));

  // 3. 위에 2번 두줄을 한줄로 익스프레스가 바꿔준다.
  res.json({ hello: "gina" });
});

app.post("/", (req, res) => {
  console.log("app.post('/')");
  res.send("hello express");
});

app.get("/about", (req, res) => {
  console.log("app.get('/about')");
  res.send("hello express");
});

app.get("/category/Javascript", (req, res) => {
  res.send("hello Javascript");
});

// 5. 라우터중 와일드 카드 포함 라우터 추가
app.get("/category/:name", (req, res) => {
  // 이렇게 파람으로 url 을 받아오는 와일드 카드같은 경우에는 후반부에 넣어줘야한다.
  // 위에넣어놓으면 위에서 먼저 걸려서 밑에 지정 url이 있어도 그 지정 url이 실행이 안되는 경우가 있다.
  res.send("hello wildcard");
});

app.use((req, res, next) => {
  res.status(200).send("404 지롱");
});

// app.get("*", (req, res) => {
//   console.log("hello everybody");
// });

// 6. 에러처리 미들웨어
// 에러 미들웨어에는 안에 err가 꼭들어간다.
// 그리고 4개의 인자가 반드시 들어가야한다. err, req, res, next
// 강조강조 또 강조 4 개의 인자가 무조건 있어야. 에러미들웨어이다.
app.use((err, req, res, next) => {
  console.log(err);
  res.send("에러났지롱");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
