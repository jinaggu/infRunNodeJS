// .env 파일은 제일 위로올라가야 좋다. 여기에 비밀키나 디비비밀번호나 이런거를 보관하기 때문에
const dotenv = require("dotenv"); // 그래야 서버에서 설정값을 잘 가지고 올수도있고...뭐..
dotenv.config(); // 비밀키들이 모여있으면 관리하기 쉽다. 그래서 닷엔브파일은 깃허브에 올리지 않는다.
// 비밀스럽게 멤버들끼리 공유를 할수도있고...

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// 라우터 장착
app.use("/", indexRouter);
app.use("/user", userRouter);
