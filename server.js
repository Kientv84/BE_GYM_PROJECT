const express = require("express");
const db = require("./config");
const route = require("./src/routes/index");
const app = express();
const cors = require("cors");
const port = 3000;

// Middleware để đọc dữ liệu JSON từ request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cho phép bất kỳ domain nào truy cập (mở CORS cho tất cả)
app.use(cors());

// Xử lý request OPTIONS cho preflight CORS
app.options("*", cors());

// Kết nối đến cơ sở dữ liệu
db.ConnectDB();

// Thiết lập các route
route(app);

// Lắng nghe cổng
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
