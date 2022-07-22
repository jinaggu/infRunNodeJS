const fs = require("fs").promises; // fs promise 화 해서 쓰기

fs.readFile("./readme.txt")
  .then((data) => {
    console.log("1번", data.toString());
    return fs.readFile("./readme.txt");
  })
  .then((data) => {
    console.log("2번", data.toString());
    return fs.readFile("./readme.txt");
  })
  .then((data) => {
    console.log("3번", data.toString());
    return fs.readFile("./readme.txt");
  })
  .then((data) => {
    console.log("4번", data.toString());
    return fs.readFile("./readme.txt");
  });
