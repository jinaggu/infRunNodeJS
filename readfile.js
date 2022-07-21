const fs = require("fs").promises; // fs 가 promise 도 지원한다.

// fs.readFile("./readme.txt", (err, data) => {
//   // 콜백이다.
//   if (err) {
//     throw err;
//   }
//   console.log(data);
//   console.log(data.toString());
// });

fs.readFile("./readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
