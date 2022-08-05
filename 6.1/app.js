const express = require("express"); // http 서버를 쓰고있는 express 서버를 우리가 쓰고있는거기때문에 http를 쓰는것임.

const app = express();
app.set("port", process.env.PORT || 3000); // process.env.PORT 가없으면 3000포트를 쓴다는것.

app.get("/", (req, res) => {
  res.send("hello express");
});

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

app.listen(3000, () => {
  console.log("익스프레스 서버 실행");
});
