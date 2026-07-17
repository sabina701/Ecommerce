const express = require("express");
const cors = require("cors");

const app = express();
const session = require("express-session");
const flash = require("connect-flash");

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

app.use(express.json());

// app.get("/flash", (req, res) => {
//   req.flash("success", "Welcome to my E-commerce website!");
//   res.send("Flash message stored");
// });

// app.get("/message", (req, res) => {
//   const message = req.flash("success");
//   res.send(message);
// });

// app.get("/set-session", (req, res) => {
//   req.session.username = "Sabina";

//   res.send("Session Created");
// });

// app.get("/get-session", (req, res) => {
//   res.send(req.session.username);
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "sabina" && password === "123456") {
    req.session.user = username;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Username or Password",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
