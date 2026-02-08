const express = require("express");
const app = express();
app.use(express.json());
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const JWT_SECRET = "b4d9f3a8c1e74f0a9b6d2e8f7c5a1e3d9b0a4f6e2d8c7a5e1b9";

const pool = new Pool({
  user: "grabit",
  host: "localhost",
  database: "gradit_db",
  password: "gradit",
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error(err);
  else console.log("База подключена! Время сервера:", res.rows[0].now);
});

app.post("/register", async (req, res) => {
  const { id, email, password, name, surname, patronymic, dob, phone } =
    req.body;

  if (!email || !password || !name || !surname) {
    return res.status(400).json({
      error: "Обязательные поля: email, password, name, surname",
    });
  }
 


  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Пользователь с таким email уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
       (id,email, password, name, surname, patronymic, dob, phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, email`,
      [id, email, hashedPassword, name, surname, patronymic, dob, phone]
    );

    res.status(201).json({
      message: "Пользователь зарегистрирован",
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email и пароль обязательны",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Неверный email или пароль",
      });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Неверный email или пароль",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Успешный вход",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});


app.post("/users", (req, res) => {
  const { id, email, password, name, surname, patronymic, dob, phone } =
    req.body;

  if (!email || !password || !name || !surname) {
    return res.status(400).json({
      error: "Обязательные поля: email, password, name, surname",
    });
  }

  pool.query(
    `INSERT INTO users 
     (id,email, password, name, surname, patronymic, dob, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, email, name, surname`,
    [id, email, password, name, surname, patronymic, dob, phone],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Ошибка сервера",
        });
      }

      res.status(201).json({
        message: "Пользователь успешно создан",
        user: dbRes.rows[0],
      });
    }
  );
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, dbRes) => {
    if (err) console.error(err);
    else res.json(dbRes.rows);
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  pool.query("SELECT * FROM users WHERE id = $1", [id], (err, dbRes) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Ошибка сервера",
      });
    }

    if (dbRes.rows.length === 0) {
      return res.status(404).json({
        error: "Пользователь не найден",
      });
    }

    res.json(dbRes.rows[0]);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { email, password, name, surname, patronymic, dob, phone } = req.body;

  if (!email || !password || !name || !surname) {
    return res.status(400).json({
      error: "Обязательные поля: email, password, name, surname",
    });
  }

  pool.query(
    `UPDATE users
     SET email = $1,
         password = $2,
         name = $3,
         surname = $4,
         patronymic = $5,
         dob = $6,
         phone = $7
     WHERE id = $8
     RETURNING *`,
    [email, password, name, surname, patronymic, dob, phone, id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (dbRes.rows.length === 0) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      res.json({
        message: "Пользователь обновлён",
        user: dbRes.rows[0],
      });
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      res.json({
        message: "Пользователь удалён",
        user: dbRes.rows[0],
      });
    }
  );
});

app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));
