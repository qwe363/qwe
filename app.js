const express = require("express");
const createTables = require("./db/setup");
const pool = require("./db/index");
const bodyParser = require("body-parser");

const bookRouter = require("./Routes/bookRouter");
const authorRouter = require("./Routes/authorRouter");
const genreRouter = require("./Routes/genreRouter");
const userRouter = require("./Routes/userRouter");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", bookRouter);
app.use("/api", authorRouter);
app.use("/api", genreRouter);
app.use("/api", userRouter);

async function initializeApp() {
  try {
    await createTables(pool);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing app:", error.message);
  }
}
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/greet/:name", (req, res) => {
  res.send(`Hello, ${req.params.name}`);
});

const users = [
  { name: "user_1", email: "user1@mail.ru" },
  { name: "user_2", email: "us2@gmail.com" },
  { name: "user_3", email: "useR3@yandex.ru" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users/add", (req, res) => {
  users.push(req.body);
  res.send(`Данные: ${JSON.stringify(req.body)}`);
});

initializeApp();
