// 버퍼는 예를들면 무슨 파일을 다운받을때 1퍼...2퍼...3퍼... 하는 그런걸 버퍼라고 함.
const buffer = Buffer.from("저를 버퍼로 바꿔보세요.");
console.log(buffer);
console.log("버퍼길이 : " + buffer.length);
console.log("버퍼toString : " + buffer.toString());

// 예를 들어 버퍼여러개가 배열에 들어있고 버퍼열개가 모였을때 한방에 보낸다고 생각하면 됌
const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];

console.log("합친 버퍼 : " + Buffer.concat(array).toString()); // 버퍼 콘캣으로 합칠 수 있다.

console.log(Buffer.alloc(5)); //5바이트 버퍼를 만든것
