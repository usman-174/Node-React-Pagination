import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/database.js";
import todos from "./data.json" assert { type: "json" };
import Todo from "./models/Todo.js";
import cors from "cors";
if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  //const skip = page-1*size
  return { limit, offset };
};

app.get("/seedData", async (req, res) => {
  todos.forEach(async (todox) => {
    const todo = new Todo(todox);
    console.log(todo + "\n\n");
    await todo.save();
  });
  res.json({ done: true });
});
//add Todo
app.post("/todos", async (req, res) => {
  console.log({ body: req.body });
  const data = new Todo(req.body);
  await data.save();
  return res.json({ data });
});
// Update Todo
app.patch("/todos", async (req, res) => {
  const { id } = req.query;

  await Todo.findOneAndUpdate(id, req.body, { new: true, runValidators: true });

  return res.json({ message: "Updated Todo" });
});
// Delete Todo
app.delete("/todos", async (req, res) => {
  const { id } = req.query;
  await Todo.findByIdAndDelete(id);

  return res.json({ message: "Deleted" });
});

app.get("/", async (req, res) => {
  const todos = await Todo.find({ userId: 1 });
  return res.json(todos);
});
app.get("/todos", async (req, res) => {
  const { page, size, title, completed, userId } = req.query;
  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  condition = completed ? { completed, ...condition } : condition;

  condition = userId ? { userId, ...condition } : condition;

  const { limit, offset } = getPagination(page - 1, size);
  try {
    const data = await Todo.paginate(condition, { offset, limit });

    return res.json(data);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// http://localhost:500/todos?page=1&size=5&title=work&userId=1
app.get("/todo2", async (req, res) => {
  const { page, size, ...query } = req.query;
  const skip = (page - 1) * size; // 10 *2 = 20
  console.log(query);
  const count = await Todo.countDocuments(query); // 20
  const todos = await Todo.find(query);
  let totalPages = count / size; // 20/10 = 2.5
  console.log(todos);
  if (totalPages % 1 !== 0) {
    // if value has . 2.5 +1 =3.5 = 3
    totalPages = Math.trunc(totalPages + 1);
  }

  // const [page,setPage] = useState(1)
  // const [size,setSize] = useState(10)

  // 1,2,3,4,5,
  // UseEffect(()=>{
  //     const data = await
  //      axios.get(`/todos?page=${5}&size=${10}`)
  //      setData(data)
  //
  //
  // },[page,size])
  return res.json({
    pagination: {
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
      nextPage: parseInt(page + 1),
    },
    todos,
  });
});

app.listen(process.env.PORT || 8000, () => {
 // connectDB();
  console.log("Connected to DATABASE");
});
