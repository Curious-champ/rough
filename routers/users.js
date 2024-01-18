const router = require("express").Router();
const Student = require("../models/students");

router.post("/register", async (req, res) => {
  const student = await Student.create({
    name: req.body.name,
    password: req.body.password,
  });
  console.log("registered", student);
  res.send(`registered ${req.body.name}`);
  // const students = await Student.find();
  // res.render("homepage", { name: student.name, students: students });
});

router.post("/login", async (req, res) => {
  const student = await Student.findOne({
    name: req.body.name,
    password: req.body.password,
  });
  console.log({
    name: req.body.name,
    password: req.body.password,
  });
  console.log(student);

  if (!student) return res.status(400).send("Invalid email or password.");
  else {
    const students = await Student.find();
    res.render("homepage", { name: student.name, students: students });
  }
});

router.post("/delete", async (req, res) => {
  const toDelete = { name: req.body.name };
  console.log("to delete.. ", toDelete);
  const deleted = await Student.deleteOne(toDelete);
  console.log(deleted);
  res.send(
    deleted.deletedCount > 0
      ? `deleted ${req.body.name}`
      : ` could not find ${req.body.name}`
  );
  // res.render("homepage", { name: student.name, students: students })
});

router.post("/update", async (req, res) => {
  const fromobj = { name: req.body.from };
  const to = req.body.to;
  console.log("to update.. ", fromobj, to);
  const student = await Student.findOne(fromobj);

  if (!student) {
    res.send(` could not find ${req.body.from}`);
  } else {
    student.name = to;
    student.save();
    res.send(` Changed ${req.body.from} to ${req.body.to}`);
  }
  // res.render("homepage", { name: student.name, students: students })
});

module.exports = router;
