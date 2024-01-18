const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/students");
const userRouter = require("./routers/users");

const url = "mongodb://127.0.0.1/rough";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(url);
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

// const alienRouter = require('./routes/aliens')
// app.use('/aliens',alienRouter)

app.get("/", async (req, res) => {
  res.render("login");
  console.log(await Student.find());
});

app.use("/users", userRouter);

// app.get("/students", (req, res) => {
//   Student.find()
//     .then((students) => {
//       res.json(students);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const student = new Student({
//     name: req.body.name,
//     age: req.body.age,
//     hobbies: req.body.hobbies,
//   });
//   student
//     .save()
//     .then((data) => {
//       res.send("Saved");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

app.listen(9000, () => {
  console.log("Server started");
});
