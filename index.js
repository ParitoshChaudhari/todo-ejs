const express = require("express");
const path = require("path");
const app = express();
const dbConnect = require("./connections/db.js");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const Task = require("./models/task.js");

dotenv.config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

dbConnect();

// routes

app.get("/",(req,res)=>{
  res.redirect("/tasks");
})

// all tasks
app.get("/tasks", async (req, res) => {
  let tasks = await Task.find();
  let title = "All Tasks";
  res.render("index.ejs", { tasks, title });
});

// new
app.get("/tasks/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/tasks", async (req, res) => {
  let { taskTitle, taskDescription, taskPriority, taskStatus } = req.body; // Use req.body
  let newTask = new Task({
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    taskPriority: taskPriority,
    taskStatus: taskStatus,
    created_at: new Date(),
  });
  await newTask.save();
  res.redirect("/tasks");
});

// Delete
app.delete("/tasks/:id", async (req, res) => {
  let { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect("/tasks");
});

// edit
app.get("/tasks/:id/edit", async (req, res) => {
  let { id } = req.params;
  let task = await Task.findById(id);
  res.render("edit.ejs", { task });
});

app.put("/tasks/:id", async (req, res) => {
  let { id } = req.params;
  let {
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    taskPriority: taskPriority,
  } = req.body;
  await Task.findByIdAndUpdate(
    id,
    {
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      taskPriority: taskPriority,
    },
    { new: true, runValidators: true }
  );

  res.redirect("/tasks");
});

// Filters
app.get("/tasks/p/low", async (req, res) => {
  let tasks = await Task.find({ taskPriority: "low" });
  let title = "Low Priority Tasks";
  res.render("index.ejs", { tasks, title });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
