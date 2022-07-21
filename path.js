const path = require("path"); // 경로처리할때 유용하다.const { cannotHaveAUsernamePasswordPort } = require("whatwg-url");

path.join(__dirname, "var.js"); // 현재폴더/var.js
console.log(path.join(__dirname, "..", "var.js")); // .. <- 부모폴더로 올라가서 /var.js붙여줌.

console.log(path.resolve(__dirname, "..", "/var.js")); // ./var.js는 ./ 이게 현재폴더에서 var.js를 찾으란소리.
// 그냥 /var.js는 절대경로라고해서 제일 root경로로 가서 붙는다.

// join은 절대경로를 무시하고 그냥 현재 경로에 붙는다.
// resolve는 절대경로무시 x하고 루트경로로 가서 붙는다.
