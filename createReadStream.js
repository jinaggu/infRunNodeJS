const fs = require("fs");
const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 }); // 16으로 쪼개받는다는 소리

const data = [];
readStream.on("data", (chunk) => {
  // data가 chunk로 조각조각 날라올때마다 data array에 넣어줘야한다.
  data.push(chunk);
  console.log("data : ", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log(Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("err : ", err);
});
