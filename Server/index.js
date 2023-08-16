const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });
const express = require("express");
const app = express();
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool();
//middleware
app.use(cors());
app.use(express.json());
app.listen(5000, () => {
  console.log("server started");
  console.log(process.env.PGUSER);
  console.log(process.env.PGDATABASE);
});
//Routes//

//add a book to db
app.post("/books", async (req, res) => {
  try {
    const { volume_id, title, author, thumbnail } = req.body;
    const newBook = await pool.query(
      `INSERT INTO Books(volume_id, title, author, thumbnail) VALUES ($1, $2, $3, $4)
      ON CONFLICT (volume_id)
      DO UPDATE SET
        title = $2,
        author = $3,
        thumbnail = $4
      RETURNING *`,
      [volume_id, title, author, thumbnail]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json({ error: err });
  }
});

//add an existing book to a user's collection
app.post("/Collection", async (req, res) => {
  const { user_id, volume_id } = req.body;
  console.log(user_id);
  try {
    const newTodo = await pool.query(
      `INSERT INTO Owns(volume_id, user_id) 
      VALUES ($1, $2);`,
      [volume_id, user_id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log("ERROR");
    console.error(err.message);
    res.json(err);
  }
});
//get all books
app.get("/books", async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * FROM Books");
    res.json(allBooks.rows);
  } catch (err) {
    console.log(err.message);
    res.json(err);
  }
});
//get all books that belong to a user
app.get("/Collection/:user_id", async (req, res) => {
  try {
    console.log(req.params);
    const { user_id } = req.params;
    const books = await pool.query(
      `SELECT *
      FROM Books JOIN Owns ON Books.volume_id = Owns.volume_id
      WHERE Owns.user_id = $1;`,
      [user_id]
    );
    res.json(books.rows);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//remove book from user's collection
app.delete("/Collection", async (req, res) => {
  try {
    const { user_id, volume_id } = req.body;
    console.log(user_id + volume_id);
    const deleteTodo = await pool.query(
      `DELETE FROM Owns 
      WHERE user_id = $1 AND volume_id = $2
      RETURNING *`,
      [user_id, volume_id]
    );
    res.json(deleteTodo.rows);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
