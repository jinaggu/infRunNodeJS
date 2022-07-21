console.log(this); // 이렇게 쓰면 전역객체가 된다. global ?
console.log(this == module.exports);

function a() {
  console.log(this === global); // 이건 global 이된다.
}
a();
