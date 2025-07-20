const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const initDb = async () => {
  try {
    const sql = fs
      .readFileSync(path.join(__dirname, "server/init.sql"))
      .toString();
    await pool.query(sql);
    console.log("Database schema initialized.");
  } catch (err) {
    console.error("Error initializing database schema:", err);
  }
};

// Run migration on startup
initDb();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
