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
app.listen(process.env.REACT_APP_SERVERPORT || 5000, () => {
  console.log(`server started on ${process.env.REACT_APP_SERVERPORT}`);
});
//Routes//

//add a book to db
app.post("/api/books", async (req, res) => {
  try {
    console.log(req.body);
    const { volume_id, title, author, thumbnail, published_date } = req.body;
    const newBook = await pool.query(
      `INSERT INTO Books(volume_id, title, author, thumbnail, published_date) VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (volume_id)
      DO UPDATE SET
        title = $2,
        author = $3,
        thumbnail = $4,
        published_date= $5
      RETURNING *`,
      [volume_id, title, author, thumbnail, published_date]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json({ error: err });
  }
});

//add an existing book to a user's collection
app.post("/api/Collection", async (req, res) => {
  const { user_id, volume_id } = req.body;
  console.log(req.body);

  try {
    const newTodo = await pool.query(
      `INSERT INTO Owns(volume_id, user_id) 
      VALUES ($1, $2);`,
      [volume_id, user_id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err);
  }
});
//get all books
app.get("/api/books", async (req, res) => {
  console.log(req.body);
  try {
    const allBooks = await pool.query("SELECT * FROM Books");
    res.json(allBooks.rows);
  } catch (err) {
    console.log(err.message);
    res.json(err);
  }
});
//get all books that belong to a user
app.get("/api/Collection/:user_id", async (req, res) => {
  console.log(req.body);

  try {
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
app.delete("/api/Collection", async (req, res) => {
  console.log(req.body);

  try {
    console.log("delete");
    const { user_id, volume_id } = req.body;
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
