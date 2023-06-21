import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Use async/await to handle the connection
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}

connectToDatabase();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema({
  text: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "An error occurred" });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      res.send({ message: "Successfully Registered, Please login now." });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "An error occurred" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.query.userId });
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/todos", async (req, res) => {
  const { text, userId } = req.body;
  try {
    const newTodo = await Todo.create({ text, userId });
    res.json({ todo: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
