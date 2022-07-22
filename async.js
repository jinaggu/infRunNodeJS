const fs = require("fs");

// 비동기 이기 때문애 console.log 찍히는게 1 2 3 4 이렇게 안찍힐 수 도 있다.
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throwerr;
  }
  console.log("1번", data.toString());
});

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throwerr;
  }
  console.log("2번", data.toString());
});

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throwerr;
  }
  console.log("3번", data.toString());
});

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throwerr;
  }
  console.log("4번", data.toString());
});
