const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());
app.listen(5000, () => {
  console.log("server started");
});
//Routes//

//add a book to db
app.post("/books", async (req, res) => {
  try {
    const { volume_id, title, author, thumbnail } = req.body;
    const newTodo = await pool.query(
      `INSERT INTO Books(volume_id, title, author, thumnail) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT (volume_id)
      UPDATE SET
        title = $2,
        author = $3,
        thumnail = $4`,
      [volume_id, title, author, thumbnail]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//add an existing book to a user's collection
app.post("/books", async (req, res) => {
  try {
    const { user_id, volume_id } = req.body;
    const newTodo = await pool.query(
      `INSERT INTO Owns(volume_id, user_id) 
      VALUES ($1, $2)`,
      [volume_id, user_id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all books
app.get("/books", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM Books");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});
//get all books that belong to a user
app.get("todos/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { user_id } = req.params;
    const todo = await pool.query(
      `SELECT *
      FROM Books JOIN Owns ON Books.volume_id = Owns.volume_id
      WHERE Owns.user_id = $1;`,
      [user_id]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//remove book from user's collection
app.delete("todos/:id", async (req, res) => {
  try {
    const { user_id, volume_id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE * FROM todo WHERE user_id = $1 AND volume_id = $2",
      [user_id, volume_id]
    );
    res.json("Deleted");
  } catch (err) {
    console.log(err);
  }
});
