// 요즘은 body-parser를 안쓴다. 쓰면 옛날 사람임 ...ㅋㅋㅋㅋ
// http 서버를 쓰고있는 express 서버를 우리가 쓰고있는거기때문에 http를 쓰는것임.
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer"); // 이렇게 변수로 받으면 이 변수에 4가지 미들웨어가 들어있음!!
const fs = require("fs");
const app = express(); // 1. app 먼저 만듬.

try {
  fs.readdirSync("uploads"); // sync를 거의 쓰지는 않지만 서버시작전에 무언가를 다 셋팅해줘야할때 싱크로 써서 다 셋팅해줄수있다.
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    // 업로드한 파일을 어디에 저장할거냐
    destination(req, file, done) {
      // 어디에 저장할지 그 폴더가 없으면 에러가 난다...
      done(null, "uploads/"); // done 함수는 첫번재 인수는 거의 null이고 두번째에 값을 넣어준다.
      // done 첫번째 인수에 값을 넣어주는 경우는 거의 에러가 났을때이다.
    },
    filename(req, file, done) {
      // 어떤이름으로 저장할지
      const ext = path.extname(file.originalname); // ext -> 확장자
      // 이름이 같으면 덮어씌워주게 된다. 그래서 데이터를 넣어준것.
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limit: { fileSize: 5 * 1024 * 1024 }, // 파일 사이즈나 ,파일갯수 이런거를 넣어줄수 있다.
});

// 2. app에 관한 set설정을 해줌.
app.set("port", process.env.PORT || 3000); // process.env.PORT 가없으면 3000포트를 쓴다는것.

// morgan은 서버실행 시간과 응답 등등을 콘솔로 찍어줌.
app.use(morgan("dev")); // 개발할때는 dev로

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
// multer 설정을해준 upload라는 객체를 라우터에 장착해주면 된다.
// 한라우터에서만 미들웨어를 장착해주기 위해서.
// single 이라는게 한개의 파일만 업로드 하겠다.
// upload.single("image") 싱글파일로 넘어올떄는 이렇게.
// app.post("/upload", upload.array("image"), (req, res) => {
//   // 멀티파일로 넘어올때는 이렇게.
//   // console.log(req.file); // 싱글파일일때
//   console.log(req.files); // 멀티파일일때 files
//   res.send("ok");
// });

// 여러개의 input file 객체가 넘어올때. // upload.none() 로도 쓸수있다.
app.post(
  "/upload",
  upload.fields[({ name: "image" }, { name: "image2" }, { name: "image3" })],
  (req, res) => {
    console.log(req.files.image);
    console.log(req.files.image2);
    console.log(req.files.image3);
    res.send("ok");
  }
);

// app.use("요청경로를 적어줌", express.static("실제경로를 적어줌."));
// app.use("/", express.static(__dirname, "public-3030")); // 미들웨어들간에도 순서가 중요하다.
// 사진같은 정적파일은 이 미들웨어에서 쓰이고 밑으로 내려가지 않는다.
// 그래서 밑에 쿠키파서라던지, 세션이라던지 다른 미들웨어를 사용할필요가 없다. 그래서 거의 윗쪽에 적어둠.
// 성능적인 문제로 미들웨어간의 순서도 매우 중요하다. 하지만 정해진건없음. 그 서비스에 맞게 미들웨어의 순서를 써주면됌.

// app.use(morgan("combined")); // 배포할때는 combined로 더 자세하게 기록된다.
app.use(cookieParser("ginapassword")); // 이렇게 암호회된 쿠키를 쓸수도 있음.
app.use(express.json()); // 이제 바디파서안쓰고 이렇게씀 !!
app.use(express.urlencoded({ extended: true })); // 이렇게쓰면 알아서 바디를 파싱해준다!! 이게 폼파싱해주는거임.
app.use(
  session({
    // session 설정
    resave: false,
    saveUninitialized: false,
    secret: "ginapassword",
    cookie: {
      httpOnly: true, // 이렇게 해놔야 자바스크립트로 공격을 안당함.
    },
    name: "connect.sid", // 네임은 기본으로 커넥트점 sid
  })
);
app.use(multer().array());

// 3. app에 관한 공통 미들웨어 추가.
app.use(
  (req, res, next) => {
    // 위에서 부터 아래로 실행이 된다.
    // app.use 로 그냥 해주면 모든요청에 이 미들웨어가 작동을 하고,
    // app.use('/about', (req, res, next) => {next()}) 이런식으로 해주면
    // about 요청이 왔을때 실행되고 next로 인해서 about라우터로 간다.
    console.log("모든 요청에 실행하고 싶어요.");

    req.session.data = "gina 비번"; // 이렇게 해서 데이터를 남겨도 된다.
    // 하지만 이번요청에만 데이터를 남기고싶다고하면 미들웨어간에 데이터를 넘겨주는 방법은
    req.data = "gina 비번"; // 이렇게 남겨주면 된다. 요청이 '/' 였으면 이 라우터로가서 req.data 이렇게 꺼내면된다.

    next(); // app.use 같은 미들웨어는 next() 를 해줘야 다음걸로 넘어 간다.
  }
  // ,
  // (req, res, next) => {
  //   try {
  //     throw new Error("에러낫슈");
  //   } catch (err) {
  //     next(err); // next에 인수가 들어갈경우 에러라고 인식. 그래서 바로 에러처리 미들웨어로 들어가서 에러가 처리된다.
  //   }
  // }
);

// 4. app에 관한 라우터 추가
app.get("/", (req, res) => {
  // 1번 방식
  // res.sendFile(path.join(__dirname, "./index.html"));

  // 2.번 방식
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(JSON.stringify({ hello: "gina" }));

  req.cookies; // {mycookie : 'test'} <- 이런식으로 cookie-parser가 자동적으로 파싱해서 가져온다.
  req.signedCookies; // 암호화된 쿠키임. (서명이 조금더 정확한것.)
  res.cookie("name", encodeURIComponent("gina"), {
    // 쿠키이름, 쿠키밸류, 쿠키옵션
    // cookie 정의.
    expires: new Date(),
    httpOnly: true,
    path: "/",
  });
  res.clearCookie("name", encodeURIComponent("gina"), {
    // clearCookie를 통해서 쿠키 삭제.
    httpOnly: true,
    path: "/",
  });

  // 개인의 저장공간을 만들어주는것이 session이라고 보면됌
  req.session.id = "hello"; // 지금 이 요청을 보낸사람의 id만 session이 hello가 됌.
  req.data; // 'gina 비번'
  // req.body.name; // 이렇게 바디에있는 값을 꺼낼수 있다. 클라이언트에서 name을 보냈으면 name이렇게 받을수 있는 것임
  // hello를 보냈으면 req.body.hello; 이렇게 받는거

  // 3. 위에 2번 두줄을 한줄로 익스프레스가 바꿔준다.
  res.json({ hello: "gina" });
});

app.post("/", (req, res) => {
  console.log("app.post('/')");
  res.send("hello express");
});

app.get("/about", (req, res) => {
  console.log("app.get('/about')");
  res.send("hello express");
});

app.get("/category/Javascript", (req, res) => {
  res.send("hello Javascript");
});

// 5. 라우터중 와일드 카드 포함 라우터 추가
app.get("/category/:name", (req, res) => {
  // 이렇게 파람으로 url 을 받아오는 와일드 카드같은 경우에는 후반부에 넣어줘야한다.
  // 위에넣어놓으면 위에서 먼저 걸려서 밑에 지정 url이 있어도 그 지정 url이 실행이 안되는 경우가 있다.
  res.send("hello wildcard");
});

app.use((req, res, next) => {
  res.status(200).send("404 지롱");
});

// app.get("*", (req, res) => {
//   console.log("hello everybody");
// });

// 6. 에러처리 미들웨어
// 에러 미들웨어에는 안에 err가 꼭들어간다.
// 그리고 4개의 인자가 반드시 들어가야한다. err, req, res, next
// 강조강조 또 강조 4 개의 인자가 무조건 있어야. 에러미들웨어이다.
app.use((err, req, res, next) => {
  console.log(err);
  res.send("에러났지롱");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
