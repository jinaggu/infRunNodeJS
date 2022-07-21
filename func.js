// const value = require("./var.js"); // ../ 부모 폴더 ./ 현재 내가 있는 폴더 !!!!!!!!!!!!
const { odd, even } = require("./var.js");

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = checkOddOrEven;
