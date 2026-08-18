import multer from "multer";

import express from "express";
const app = express();
app.use(express.json());
import { Pool, Client } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const JWT_SECRET = "b4d9f3a8c1e74f0a9b6d2e8f7c5a1e3d9b0a4f6e2d8c7a5e1b9";

const upload = multer();

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
  const { id, email, password, name, surname, patronymic, date, phone } =
    req.body;

  if (!email || !password || !name || !surname) {
    return res.status(400).json({
      error: "Обязательные поля: email, password, name, surname",
    });
  }

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
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
      [id, email, hashedPassword, name, surname, patronymic, date, phone],
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
  const tokenId = uuidv4();

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
      { expiresIn: "1h" },
    );
    pool.query(
      `INSERT INTO tokens 
     (id,user_id,token, created_at)
     VALUES ($1, $2, $3, $4)
     RETURNING id,user_id,token, created_at`,

      [tokenId, user.id, token, creared_at],
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
    },
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
    },
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
    },
  );
});

app.get("/items", (req, res) => {
  pool.query("SELECT * FROM items", (err, dbRes) => {
    if (err) console.error(err);
    else res.json(dbRes.rows);
  });
});

app.get("/items/:id", (req, res) => {
  const { id } = req.params;

  pool.query("SELECT * FROM items WHERE id = $1", [id], (err, dbRes) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Ошибка сервера",
      });
    }

    if (dbRes.rows.length === 0) {
      return res.status(404).json({
        error: "Товар не найден",
      });
    }

    res.json(dbRes.rows[0]);
  });
});

app.post("/items", upload.array("images"), async (req, res) => {
  try {
    const {
      id,
      old_price,
      name,
      location,
      description,
      new_price,
      characteristic,
    } = req.body;

    if (!old_price || !location || !name || !description) {
      return res.status(400).json({
        error: "Обязательные поля: old_price , location ,name , description",
      });
    }

    await pool.query("BEGIN");

    pool.query(
      `INSERT INTO users 
     (id, old_price , name, location, description, new_price, characteristic )
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id,old_price , location ,name , description `,
      [id, old_price, location, name, description],
      (err, dbRes) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Ошибка сервера",
          });
        }

        res.status(201).json({
          message: "Товар успешно создан",
          user: dbRes.rows[0],
        });
      },
    );

    for (const file of req.files) {
      await pool.query(
        `INSERT INTO images
     (id, filename,mimetype,images_date )
     VALUES ($1, $2, $3, $4)
     RETURNING id,filename `,
      );
    }
    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Ошибка при создании товара" });
  }
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM items WHERE id = $1 RETURNING *",
    [id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      res.json({
        message: "Товар удалён",
        user: dbRes.rows[0],
      });
    },
  );
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { old_price, name, location, description, new_price, characteristic } =
    req.body;

  if (!old_price || !location || !name || !description) {
    return res.status(400).json({
      error: "Обязательные поля: old_price , location ,name , description  ",
    });
  }

  pool.query(
    `UPDATE users
     SET name = $1,
         old_price = $2,
         new_price = $3,
         location = $4,
         description = $5,
         characterictic = $6,
     WHERE id = $7
     RETURNING *`,
    [old_price, name, location, description, new_price, characteristic, id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (dbRes.rows.length === 0) {
        return res.status(404).json({ error: "Товар не найден" });
      }

      res.json({
        message: "Товар обновлён",
        user: dbRes.rows[0],
      });
    },
  );
});

app.delete("/images/:id", async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE items
      SET images =array_remove(images,$1)
      WHERE id = $2
      RETURNING *`,

      [url, id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка удаления" });
  }
});

app.post("/images", (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  pool.query(
    `UPDATE items
    SET images =array_append(images,$1)
    WHERE id = $2
      RETURNING *`,

    [url, id],
  );
  res.json(result.rows[0]);
});

app.get("/images", (req, res) => {
  pool.query("SELECT * FROM images", (err, dbRes) => {
    if (err) console.error(err);
    else res.json(dbRes.rows);
  });
});

app.get("/images/:id", (req, res) => {
  const { id } = req.params;

  pool.query("SELECT * FROM images WHERE id = $1", [id], (err, dbRes) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Ошибка сервера",
      });
    }

    if (dbRes.rows.length === 0) {
      return res.status(404).json({
        error: "Картинка не найдена",
      });
    }

    res.json(dbRes.rows[0]);
  });
});

app.get("/categories", (req, res) => {
  pool.query("SELECT * FROM categories", (err, dbRes) => {
    if (err) console.error(err);
    else res.json(dbRes.rows);
  });
});

app.put("/items/:id/toggleLike", (req, res) => {
  const { id } = req.params;

  pool.query(
    `UPDATE items
     SET is_liked = NOT is_liked
     WHERE id = $1
     RETURNING *`,
    [id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (dbRes.rows.length === 0) {
        return res.status(404).json({ error: "Товар не найден" });
      }

      res.json({
        message: "Товар обновлён",
        user: dbRes.rows[0],
      });
    },
  );
});

app.post("/business_profile", (req, res) => {
  const {
    company_name,
    inn,
    company_registrationn_date,
    full_name_of_the_head,
    product,
    product_categories,
    business_profile_id,
  } = req.body;

  pool.query(
    `INSERT INTO for_business_table
     ( company_name, inn, company_registrationn_date, full_name_of_the_head, product, product_categories, business_profile_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING  company_name, inn, company_registrationn_date, full_name_of_the_head, product, product_categories, business_profile_id`,
    [
      company_name,
      inn,
      company_registrationn_date,
      full_name_of_the_head,
      product,
      product_categories,
      business_profile_id,
    ],
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
    },
  );
});

app.put("/business_profile/:id", (req, res) => {
  const { id } = req.params;
  const {
    company_name,
    company_registrationn_date,
    full_name_of_the_head,
    product,
    product_categories,
  } = req.body;
const sql =`UPDATE for_business_table
        SET company_name = $1,
        company_registrationn_date = $2,
        full_name_of_the_head = $3,
        product = $4,
        product_categories = $5
     WHERE business_profile_id = $6
     RETURNING *`
     console.log(sql)
  pool.query(
   sql,
    [company_name, company_registrationn_date, full_name_of_the_head, product, product_categories,id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (dbRes.rows.length === 0) {
        return res.status(404).json({ error: "Товар не найден" });
      }

      res.json({
        message: "Бизнес профиль обновлён",
        user: dbRes.rows[0],
      });
    },
  );
});
   
app.delete("/business_profile/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM for_business_table WHERE business_profile_id = $1 RETURNING *",
    [id],
    (err, dbRes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      res.json({
        message: "Бизнес профиль удалён",
        user: dbRes.rows[0],
      });
    },
  );
});


app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));
