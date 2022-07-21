const exec = require("child_process").exec; // { } 이렇게 쓰는거는 구조분해 할때 쓰는것.

var process = exec("dir");

process.stdout.on("data", function (data) {
  // console.log(data);
  console.log(data.toString());
});
