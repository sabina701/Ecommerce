const express = require("express");
const cors = require("cors");

const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model/user.js");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product");
const category = require("./model/category.js");
const categoryRoutes = require("./routes/category");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
}

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.get("/test", async (req, res) => {
  let cate = new category({
    name: "fijajj",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFhj3WcsI_gNq_LE0jwi1xoIDZcciJGnKWhITRz42ovugRB78pyiDY1ZH&s=10",
  });
  await cate.save();
  res.send(cate);
  console.log("data was saved");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
